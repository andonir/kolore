import { data } from "react-router-dom"
import { supabase } from "./client"
export const logIn = async (email, password
) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw (error)

        console.log(data)

    }
    catch (e) {
        console.log(e)
    }
}

export const logOut = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw (error)
    } catch (e) {
        console.log(e)
    }
}

export const addDataToDB = async ({ productType, colors, ages, sizes, sexes }) => {
    try {
        let productId;
        // Check if product-type is registered, if not, register it
        if (Boolean(productType)) {
            const { data: data, error: errorPType } = await supabase.from('product_types').upsert({ name: productType }, { onConflict: 'name', ignoreDuplicates: true }).select().single()
            if (errorPType) throw errorPType;
            productId = data.id
        }
        // Check if color is registered, if not, register it
        if (colors.length !== 0) {
            const { error: errorColor } = await supabase.from('colors').upsert(colors.map((color) => ({ name: color.name, hex: color.hex })), { onConflict: 'name', ignoreDuplicates: true })
            if (errorColor) throw errorColor;
        }
        // Check if age is registered, if not, register it
        if (ages.length !== 0) {
            const { error: errorAge } = await supabase.from('ages').upsert(ages.map((age) => ({ name: age })), { onConflict: 'name', ignoreDuplicates: true })
            if (errorAge) throw errorAge;
        }
        // Check if size is registered, if not, register it
        if (sizes.length !== 0) {
            const { error: errorSize } = await supabase.from('sizes').upsert(sizes.map((size) => ({ name: size })), { onConflict: 'name', ignoreDuplicates: true })
            if (errorSize) throw errorSize;
        }
        // Check if sexe is registered, if not, register it

        let sexId;
        if (false)
            if (sexes.length !== 0) {
                const { data, error } = await supabase.from('sexes').upsert(sexes.map((sex) => ({ name: sex })), { onConflict: 'name', ignoreDuplicates: true }).select();
                if (error) throw error;
                sexId = data.id
                console.log(data)
            }
        console.log(sexId)
    } catch (e) {
        console.log(e)
    }
}

export const addImg = async (file, name, products, colors, ages, sizes, sexes) => {
    // Add img to storage
    if (!file) return;
    const filePath = `${crypto.randomUUID()}-${file.name}`;
    const { data: dataS, error: errorS } = await supabase.storage.from('drawings-img').upload(filePath, file, {
        contentType: file.type,
        upsert: false
    });
    if (errorS) throw (errorS)
    console.log(dataS)
    // Add name & path to drawings
    const { data: dataT, error: errorT } = await supabase.from('drawings').insert({ name: name, image_path: filePath }).select()
    if (errorT) throw (errorT)
    const drawingId = dataT[0].id

    // Upsert data PENDIENTE --> Input con cosas nuevas, eso se añade 

    // Add relations
    const { data: dataDP, error: errorDP } = await supabase.from('drawings_product_types').insert((products.map((product) => ({ drawing_id: drawingId, product_type_id: product.id })))).select()
    if (errorDP) throw (errorDP)

    // DPC
    const rowsDPC = dataDP.flatMap((dp) =>
        colors.map(color => ({
            drawing_product_type_id: dp.id,
            color_id: color.id
        }))
    )
    const { data: dataDPC, error: errorDPC } = await supabase.from('drawings_product_types_colors').insert(rowsDPC).select()
    if (errorDPC) throw (errorDPC)
    console.log(dataDPC)

    // PA
    const rowsPA = products.flatMap((p) =>
        ages.map(age => ({ product_type_id: p.id, age_id: age.id })))
    const { data: dataPA, error: errorPA } = await supabase.from('product_types_ages').insert(rowsPA).select()
    if (errorPA) throw (errorPA)
    console.log(dataPA)

    // PAS
    const rowsPAS = dataPA.flatMap((pa) =>
        sizes.map(size => ({ product_type_age_id: pa.id, size_id: size.id })))
    const { data: dataPAS, error: errorPAS } = await supabase.from('product_types_ages_sizes').insert(rowsPAS).select()
    if (errorPA) throw (errorPA)
    console.log(dataPAS)
    // PS
    const rowsPS = products.flatMap((ps) =>
        sexes.map(sex => ({ product_type_id: ps.id, sex_id: sex.id }))
    )
    const { data: dataPS, error: errorPS } = await supabase.from('product_types_sexes').insert(rowsPS).select()
    if (errorPS) throw (errorPS)
    console.log(dataPS)

}

export const readDB = async (setDBData) => {

    // Select table drawings
    const { data: dataT, error: errorT } = await supabase.from('drawings').select('*');
    if (errorT) throw (errorT)
    // Read drawings_product_types
    const { data: dataDP, error: errorDP } = await supabase.from('drawings_product_types').select('*')
    if (errorDP) throw (errorDP)

    // Read products
    const { data: dataP, error: errorP } = await supabase.from('product_types').select('*');
    if (errorP) throw (errorP)

    // Read DPS --> Falta hacer una correcta asignacion de colores en el admin
    const { data: dataDPC, error: errorDPC } = await supabase.from('drawings_product_types_colors').select('*')
    if (errorDPC) throw (errorDPC)
    // Read colors
    const { data: dataC, error: errorC } = await supabase.from('colors').select('*')
    // Get images-(build arr)

    const arr = dataT.map((row) => ({
        ...row,
        url: supabase.storage.from('drawings-img').getPublicUrl(row.image_path).data.publicUrl,
        products: dataP.filter(product => dataDP.some(item => 
            item.drawing_id === row.id && item.product_type_id == product.id
        )).map((product) => ({...product, colors: dataC.filter(color=> dataDPC.some((dpcItem)=> dpcItem.color_id == color.id && dataDP.some((dpItem)=> dpItem.id == dpcItem.drawing_product_type_id)))}))

    }))
    console.log(arr)
    setDBData(arr)
}


export const readProducts = async (setProducts) => {
    const { data, error } = await supabase.from('product_types').select('*');
    if (error) throw error
    setProducts(data)
}
export const readColors = async (setColors) => {
    const { data, error } = await supabase.from('colors').select('*');
    if (error) throw error
    setColors(data)
}

export const readAges = async (setAges) => {
    const { data, error } = await supabase.from('ages').select('*');
    if (error) throw error
    setAges(data)
}

export const readSizes = async (setSizes) => {
    const { data, error } = await supabase.from('sizes').select('*');
    if (error) throw error
    setSizes(data)
}
export const readSexes = async (setSexes) => {
    const { data, error } = await supabase.from('sexes').select('*');
    if (error) throw error
    setSexes(data)

}