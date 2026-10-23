import { data } from "react-router-dom"
import { supabase } from "./client"
import { MdInvertColors } from "react-icons/md"
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
        // Check if sex is registered, if not, register it

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
export const addProduct = async (productType, colors, ages, price) => {
    // Insert product_types
    if(!productType || !colors ||!ages ||!price) return 
    const { data: dataP, error: errorP } = await supabase.from('product_types').insert({ name: productType, price: price}).select('')
    if (errorP) throw errorP
    // Upsert colors

    const rowsC = colors.map((color) =>
    ({
        name: color.name,
        hex: color.hex
    })
    )
    const { data: dataC, error: errorC } = await supabase.from('colors').upsert(rowsC, { onConflict: 'name', ignoreDuplicates: true }).select('')
    if (errorC) throw errorC;

    // Insert product_types_colors
    const rowsPC = dataC.map((row) => ({
        product_type_id: dataP[0].id,
        color_id: row.id
    }))
    const { data: dataPC, error: errorPC } = await supabase.from('product_types_colors').insert(rowsPC)
    if (errorC) throw errorC

    // Upsert ages

    const rowsA = ages.map((row) =>
        ({ name: row.name })
    )
    const { error: errorA } = await supabase.from('ages').upsert(rowsA, { onConflict: 'name', ignoreDuplicates: true })
    if (errorA) throw errorA;

    const agesNames = ages.map((age) => age.name)
    const { data: dataA, error: errorAS } = await supabase.from('ages').select('id, name').in('name', agesNames)
    if (errorAS) throw errorAS
    // Upsert sizes
    const rowsS = ages.flatMap((age) =>
        age.sizes.map((size) => (({ name: size })
        ))
    )
    const sizesNames = ages.flatMap((age) =>
        age.sizes.map(size => size)
    )
    const { error: errorS } = await supabase.from('sizes').upsert(rowsS, { onConflict: 'name', ignoreDuplicates: true }).select()
    if (errorS) throw errorS;

    const { data: dataS, error: errorSS } = await supabase.from('sizes').select('id, name').in('name', sizesNames)
    // Insert product_types_ages
    const rowsPA = dataA.map((row) => ({
        product_type_id: dataP[0].id,
        age_id: row.id
    }))
    const { data: dataPA, error: errorPA } = await supabase.from('product_types_ages').insert(rowsPA).select()
    if (errorPA) throw errorPA
    // Insert product_types_ages_sizes

    const newAges = ages.map(age => {
        const ageDb = dataA.find((ageDb) => ageDb.name == age.name)

        return {
            PAId: dataPA.find(row => row.age_id == ageDb.id)?.id,
            name: ageDb.name,
            id: ageDb.id,
            sizes: age.sizes.map((size) => {
                return dataS.find(sizeDb => sizeDb.name == size)
            })
        }

    })
    const rowsPAS = newAges.flatMap((age) => {
        return age.sizes.map(size => ({
            product_type_age_id: age.PAId,
            size_id: size.id
        }))
    }
    )

    const { data: dataPAS, error: errorPAS } = await supabase.from('product_types_ages_sizes').insert(rowsPAS).select()
    if (errorPAS) throw errorPAS

    // // Upsert sexes
    // const rowsSexes = sexes.map(sex => ({ name: sex.name }))
    // const { error: errorSexes } = await supabase.from('sexes').upsert(rowsSexes, { onConflict: 'name', ignoreDuplicates: true })
    // if (errorSexes) throw errorSexes

    // const sexesNames = sexes.map(sex => sex.name)
    // const { data: dataSexes, error: errorSexesS } = await supabase.from('sexes').select('*').in('name', sexesNames)
    // if (errorSexesS) throw errorSexesS
    // // Insert product_types_sexes
    // const rowsPS = dataSexes.map(row => ({ product_type_id: dataP[0].id, sex_id: row.id }))
    // const { data: dataPS, error: errorPS } = await supabase.from('product_types_sexes').insert(rowsPS).select()
    // if (errorPS) throw errorPS
    // console.log('Producto añadido correctamente')
}

export const addImg = async (file, name, products, colors) => {
    // Add img to storage
    if (!file) return;
    const filePath = `${crypto.randomUUID()}-${file.name}`;
    const { data: dataS, error: errorS } = await supabase.storage.from('drawings-img').upload(filePath, file, {
        contentType: file.type,
        upsert: false
    });
    if (errorS) throw (errorS)
    // Add name & path to drawings
    const { data: dataT, error: errorT } = await supabase.from('drawings').insert({ name: name, image_path: filePath }).select()
    if (errorT) throw (errorT)
    const drawingId = dataT[0].id

    // Add relations
    const { data: dataDP, error: errorDP } = await supabase.from('drawings_product_types').insert((products.map((product) => ({ drawing_id: drawingId, product_type_id: product.id })))).select()
    if (errorDP) throw (errorDP)

    // DPC
    const rowsDPC = dataDP.flatMap((dp) => {
        const product = products.filter(product => product.id == dp.product_type_id)
        return colors.flatMap(obj =>
            obj.selectedColors.flatMap((color) => {
                if (obj.productId == product[0].id) {
                    return {
                        drawing_product_type_id: dp.id,
                        color_id: color.id
                    }
                } else {
                    return []
                }
            }

            )

        )

    }


    )
    const { data: dataDPC, error: errorDPC } = await supabase.from('drawings_product_types_colors').insert(rowsDPC).select()
    if (errorDPC) throw (errorDPC)
    console.log(dataDPC)

    // PA
    // const rowsPA = products.flatMap((p) =>
    //     ages.map(age => ({ product_type_id: p.id, age_id: age.id })))
    // const { data: dataPA, error: errorPA } = await supabase.from('product_types_ages').insert(rowsPA).select()
    // if (errorPA) throw (errorPA)
    // console.log(dataPA)

    // // PAS
    // const rowsPAS = dataPA.flatMap((pa) =>
    //     sizes.map(size => ({ product_type_age_id: pa.id, size_id: size.id })))
    // const { data: dataPAS, error: errorPAS } = await supabase.from('product_types_ages_sizes').insert(rowsPAS).select()
    // if (errorPA) throw (errorPA)
    // console.log(dataPAS)
    // // PS
    // const rowsPS = products.flatMap((ps) =>
    //     sexes.map(sex => ({ product_type_id: ps.id, sex_id: sex.id }))
    // )
    // const { data: dataPS, error: errorPS } = await supabase.from('product_types_sexes').insert(rowsPS).select()
    // if (errorPS) throw (errorPS)
    // console.log(dataPS)


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
    if (errorC) throw (errorC)
    // const colors = dataC.filter(color => dataDPC.some((dpcItem) => dpcItem.color_id == color.id && dataDP.some((dpItem) => dpItem.id == dpcItem.drawing_product_type_id)))
    // Read ages
    const { data: dataA, error: errorA } = await supabase.from('ages').select('*')
    if (errorA) throw errorA
    // Read sizes
    const { data: dataS, error: errorS } = await supabase.from('sizes').select('*')
    if (errorS) throw errorS
    // Read PA
    const { data: dataPA, error: errorPA } = await supabase.from('product_types_ages').select('*')
    if (errorPA) throw errorPA
    // Read PAS
    const { data: dataPAS, error: errorPAS } = await supabase.from('product_types_ages_sizes').select('*')
    if (errorPAS) throw errorPAS


    const arr = dataT.map((row) => ({
        ...row,
        url: supabase.storage.from('drawings-img').getPublicUrl(row.image_path).data.publicUrl,
        products: dataP.filter(product => dataDP.some(item =>
            item.drawing_id === row.id && item.product_type_id == product.id
        )).map((product) => ({
            ...product, colors:

                dataC.filter(color => {
                    const dpItem = dataDP.filter(dpItem => dpItem.product_type_id == product.id && dpItem.drawing_id == row.id)
                    const ans = dataDPC.some((dpcItem) => {
                        return dpcItem.color_id == color.id && dpcItem.drawing_product_type_id == dpItem[0].id
                    })
                    return ans
                }),
            ages: dataA.map((age => {

                const validPA = dataPA.filter(itemPA => itemPA.age_id == age.id)
                const validPAS = dataPAS.filter(itemPAS => validPA.some(itemPA =>
                    itemPA.id == itemPAS.product_type_age_id && product.id == itemPA.product_type_id))
                const sizes = validPAS.map(itemPAS => {
                    return dataS.find(size => size.id == itemPAS.size_id)
                })
                return { age, sizes }
            })).filter(age => age.sizes.length > 0)
        }))

    }))
    console.log(arr)
    setDBData(arr)

}


export const readProducts = async (setProducts) => {
    const { data, error } = await supabase.from('product_types').select('*');
    if (error) throw error
    setProducts(data)
}
// export const readProductColors = async (setProductColors) => {
//     const { data, error } = await supabase.from('colors').select('*');
//     if (error) throw error
//     setProductColors(data)
// }

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


// Read colors for DProductColorsSelector

export const readColors = async (setColors, productId) => {
    // Get colors Ids
    const { data: dataCId, error: errorCId } = await supabase.from('product_types_colors').select('color_id').eq('product_type_id', productId)
    if (errorCId) throw errorCId
    const rowsColorIds = dataCId.map(color => color.color_id)
    // Get colors data
    const { data: dataC, error: errorC } = await supabase.from('colors').select('*').in('id', rowsColorIds)
    if (errorC) throw errorC
    setColors(dataC)
}