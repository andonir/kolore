import { data } from "react-router-dom"
import { supabase } from "./client"
import { MdInvertColors } from "react-icons/md"
import { FaKickstarter } from "react-icons/fa"
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
export const addProduct = async (productType, ages) => {
    // Insert product_types
    if (!productType  || !ages) return
    const { data: dataP, error: errorP } = await supabase.from('product_types').insert({ name: productType}).select('')
    if (errorP) throw errorP
    // Upsert colors

    const rowsC = ages.flatMap(age=>age.colors.map((color) =>
    ({
        name: color.name,
        hex: color.hex
    })
    ))
    const {error: errorC } = await supabase.from('colors').upsert(rowsC, { onConflict: 'name', ignoreDuplicates: true })
    if (errorC) throw errorC;
    

    // Select colors 
    const colorNames = ages.flatMap(age=>age.colors.map(color=>color.name))
    const { data: dataC, error: errorCS } = await supabase.from('colors').select('id, name, hex').in('name', colorNames)
    if (errorCS) throw errorCS
    // // Insert product_types_ages_colors
    // const rowsPC = dataC.map((row) => ({
    //     product_type_id: dataP[0].id,
    //     color_id: row.id
    // }))
    // const { data: dataPC, error: errorPC } = await supabase.from('product_types_colors').insert(rowsPC)
    // if (errorC) throw errorC

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
    const rowsPA = dataA.map((row) => {
       const originalAge = ages.find(a=>a.name==row.name)
        return {
            product_type_id: dataP[0].id,
            age_id: row.id,
            price: originalAge?.price
       }
    })
    const { data: dataPA, error: errorPA } = await supabase.from('product_types_ages').insert(rowsPA).select()
    if (errorPA) throw errorPA
    // Insert product_types_ages_sizes && product_types_ages_colors

    const newAges = ages.map(age => {
        const ageDb = dataA.find((ageDb) => ageDb.name == age.name)

        return {
            PAId: dataPA.find(row => row.age_id == ageDb.id)?.id,
            name: ageDb.name,
            id: ageDb.id,
            sizes: age.sizes.map((size) => {
                return dataS.find(sizeDb => sizeDb.name == size)
            }),
            colors: age.colors.map((color)=>{
                return dataC.find(colorDb=>{
                    return colorDb.name == color.name
                })
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

    const rowsPAC = newAges.flatMap((age)=>{
        return age.colors.map(color=>({
            product_type_age_id: age.PAId,
            color_id: color.id
        }))
    })
    const {data: dataPAC, error:errorPAC} = await supabase.from('product_types_ages_colors').insert(rowsPAC).select()
    if(errorPAC) throw errorPAC     
    console.log('Producto añadido correctamente')
}

export const addImg = async (file, name, products, agesColors) => {
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

    // DPA
    const rowsDPA = dataDP.flatMap((dp)=>{
        const productSelection = agesColors.find((item)=>item.productId == dp.product_type_id);
        if(!productSelection ||!productSelection.selectedAgesColors) return [];
        console.log(productSelection)
        return productSelection.selectedAgesColors.map((ageObj)=>({
            drawing_product_type_id: dp.id,
            age_id: ageObj.ageId
        }))
    })
    if (rowsDPA.length === 0) return;
    const {data: dataDPA, error: errorDPA} = await supabase.from('drawings_product_types_ages').insert(rowsDPA).select()
    if(errorDPA) throw errorDPA
    // DPAC
    const rowsDPAC = dataDPA.flatMap((dpa)=>{
        const parentDP = dataDP.find((dp)=>dp.id==dpa.drawing_product_type_id)
        const productSelection = agesColors.find((item)=>item.productId == parentDP.product_type_id)
        const ageSelection = productSelection?.selectedAgesColors.find((ageObj)=>ageObj.ageId == dpa.age_id)
        if(!ageSelection) return[];

        return ageSelection.colors.map((color)=>({
            drawing_product_type_age_id: dpa.id,
            color_id: color.id
        }))
    })
    if (rowsDPAC.length === 0) return
    const {data:dataDPAC, error: errorDPAC} = await supabase.from('drawings_product_types_ages_colors').insert(rowsDPAC).select();
    if (errorDPAC) throw errorDPAC



    // // DPC
    // const rowsDPC = dataDP.flatMap((dp) => {
    //     const product = products.filter(product => product.id == dp.product_type_id)
    //     return colors.flatMap(obj =>
    //         obj.selectedColors.flatMap((color) => {
    //             if (obj.productId == product[0].id) {
    //                 return {
    //                     drawing_product_type_id: dp.id,
    //                     color_id: color.id
    //                 }
    //             } else {
    //                 return []
    //             }
    //         }

    //         )

    //     )

    // // }


    // )
    // const { data: dataDPC, error: errorDPC } = await supabase.from('drawings_product_types_colors').insert(rowsDPC).select()
    // if (errorDPC) throw (errorDPC)
    // console.log(dataDPC)

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


    // DPA, DPAC,

    const {data: dataDPA, error: errorDPA} = await supabase.from('drawings_product_types_ages').select('*')
    if(errorDPA) throw errorDPA

    const {data: dataDPAC, error: errorDPAC} = await supabase.from('drawings_product_types_ages_colors').select('*')
    if(errorDPAC) throw errorDPAC
    // // Read DPS --> Falta hacer una correcta asignacion de colores en el admin
    // const { data: dataDPC, error: errorDPC } = await supabase.from('drawings_product_types_colors').select('*')
    // if (errorDPC) throw (errorDPC)
    // // Read colors
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
            item.drawing_id == row.id && item.product_type_id == product.id
        )).map((product) => {
            const dpItem = dataDP.find((dp)=>dp.drawing_id === row.id && dp.product_type_id == product.id)
            return{...product, 
                ages: dataA.map((age)=>{
                    const paItem = dataPA.find((pa)=>pa.age_id == age.id && pa.product_type_id == product.id);
                    const validPAS = dataPAS.filter((pas)=>pas.product_type_age_id == paItem?.id)
                    const sizes = validPAS.map((pas)=>dataS.find((s)=>s.id ==pas.size_id)).filter(Boolean);
                                        const dpaItem = dataDPA.find((dpa)=>dpa.drawing_product_type_id == dpItem?.id && dpa.age_id == age.id)
                    const colors = dpaItem? dataC.filter((color)=>dataDPAC.some((dpac)=>dpac.drawing_product_type_age_id == dpaItem.id && dpac.color_id ==color.id)):[];
                    const price = paItem?.price
                    return {...age,sizes,colors,price}
                }).filter((age)=>age.sizes.length>0 || age.colors.length>0),
                
                
            //     colors:

            //     dataC.filter(color => {
            //         const dpItem = dataDP.filter(dpItem => dpItem.product_type_id == product.id && dpItem.drawing_id == row.id)
            //         const ans = dataDPC.some((dpcItem) => {
            //             return dpcItem.color_id == color.id && dpcItem.drawing_product_type_id == dpItem[0].id
            //         })
            //         return ans
            //     }),
            // ages: dataA.map((age => {

            //     const validPA = dataPA.filter(itemPA => itemPA.age_id == age.id)
            //     const validPAS = dataPAS.filter(itemPAS => validPA.some(itemPA =>
            //         itemPA.id == itemPAS.product_type_age_id && product.id == itemPA.product_type_id))
            //     const sizes = validPAS.map(itemPAS => {
            //         return dataS.find(size => size.id == itemPAS.size_id)
            //     })
            //     return { age, sizes }
            // })).filter(age => age.sizes.length > 0)
    }})

    }))
    console.log(arr)
    setDBData(arr)

}


export const readProducts = async (setProducts) => {
    const { data, error } = await supabase.from('product_types').select('*');
    if (error) throw error
    setProducts(data)
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


// Read colors for DProductColorsSelector

export const readAgesColors = async(setAgesColors, productId)=>{
   
    const { data, error } = await supabase
    .from('product_types_ages')
    .select(`
      id,
      product_type_id,
      age_id,
      ages(id, name),
      product_types_ages_colors (
        id,
        colors (
          id,
          name,
          hex
        )
      )
    `)
    .eq('product_type_id', productId);

  if (error) throw error;
    const processedData = data.map(age=>{
        return {
            name: age.ages.name,
            id: age.ages.id,
            colors: age.product_types_ages_colors.map(color=>({PACId: color.id, name: color.colors.name, id: color.colors.id, hex: color.colors.hex}))
        }
    })
    setAgesColors(processedData)
   
   
   
   
   
   
    // // Get PAId
    // const {data: dataPA, error: errorPA} = await supabase.from('product_types_ages').select('id').eq('product_type_id', productId)
    // if(errorPA) throw(errorPA)
    // // Get PAC
    // const PAIds = dataPA.map(paItem => paItem.id)
    // const {data: dataPAC, error: errorPAC} = await supabase.from('product_types_ages_colors').select('*').in('product_type_age_id', PAIds)
    // if(errorPAC) throw(errorPAC)

    // // Get colors
    // const colorIds = dataPAC.map(pacItem => pacItem.color_id)
    // const {data: dataC, error: errorC} = await supabase.from('colors').select('*').in('id',colorIds)
    // if(errorC) throw errorC
    // console.log(dataC)
    // const agesColors = dataPA.map(paItem=>{

    // })
}


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

// Insert order

export const insertOrder = async (name, firstSurname, secondSurname, phone, address, price, cartList, setOrderId, setOrderPrice) => {
    const processedList = cartList.map(item => {
        return { cartItemId: item.cartItemId, colorId: item.color.id, drawingId: item.drawingId, price: item.price, productId: item.productId, ageId: item.age?.id, sizeId: item.size?.id }

    })

    const {data, error} = await supabase.from('orders').insert({name, first_surname: firstSurname, second_surname: secondSurname, phone, total_price:price, address, items: processedList}).select()
    if(error) throw error 
    setOrderId(data[0].id)
    setOrderPrice(data[0].total_price)
}


// Get orders
export const selectOrders = async(setOrders)=>{
    const {data, error} = await supabase.from('orders').select()
    if(error) throw error
    
    // Process items
    const drawingIds = data.flatMap(order=>order.items.flatMap((item)=>item.drawingId))
    const productIds = data.flatMap(order=>order.items.flatMap((item)=>item.productId))
    const colorIds = data.flatMap(order=>order.items.flatMap((item)=>item.colorId))
    const ageIds = data.flatMap(order=>order.items.flatMap((item)=>item.ageId))
    const sizeIds = data.flatMap(order=>order.items.flatMap((item)=>item.sizeId))
    
    const {data:dataD, error: errorD} = await supabase.from('drawings').select().in('id', drawingIds)
    if(errorD) throw errorD
    const drawingsMap = new Map(dataD.map(d=>[d.id, d]))
    
    const {data:dataP, error: errorP} = await supabase.from('product_types').select().in('id', productIds)
    if(errorP) throw errorP
    const productsMap = new Map(dataP.map(p=>[p.id, p]))

    const {data: dataC, error: errorC} = await supabase.from('colors').select().in('id', colorIds)
    if(errorC) throw errorC
    const colorsMap = new Map(dataC.map(c=>[c.id, c]))
    
    const {data:dataA, error: errorA} = await supabase.from('ages').select().in('id',ageIds)
    if(errorA) throw errorA
    const agesMap = new Map(dataA.map(a=>[a.id, a]))

    const {data: dataS, error: errorS} = await supabase.from('sizes').select().in('id',sizeIds)
    const sizesMap = new Map(dataS.map(s=>[s.id, s]))
    
    // Process created_at
    
    
    const newOrders = data.map(order=>{    
        const date = new Date(order.created_at)
        const fechaEspañola = new Intl.DateTimeFormat('es-ES', {
            timeZone: 'Europe/Madrid',
            dateStyle: 'short',
            timeStyle: 'short'
          }).format(date)
                
        return ({
        ...order,
        created_at: fechaEspañola,
        items: order.items.map(item=>{
            const {drawingId, productId,colorId,ageId,sizeId, ...newItem} = item
           return{ ...newItem,
            drawing: drawingsMap.get(item.drawingId),
            product: productsMap.get(item.productId),
            color: colorsMap.get(item.colorId),
            age: agesMap.get(item.ageId),
            size: sizesMap.get(item.sizeId)
        }

        })
    })})
    setOrders(newOrders)
    console.log(newOrders)
}

export const changeOrderPS = async(id, newStatus, setCurrentStatus)=>{
    const {data, error} = await supabase.from('orders').update({payment_status: newStatus}).eq('id', id).select('*')
    if(error) throw error
    setCurrentStatus(data[0].payment_status)
}