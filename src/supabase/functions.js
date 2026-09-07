import {supabase} from "./client"
export const logIn = async(email, password
)=>{
    try {
    const {data, error} = await supabase.auth.signInWithPassword({email,password})   
    if(error) return console.log(error)

    console.log(data)

}
    catch(e){
        alert(e)
    }
}