export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const config = useRuntimeConfig()

    const passwords:any = {
        Dostawy: config.dostawyPassword,
        Magazyn: config.magazynPassword,
        Spedycja: config.spedycjaPassword
    }

    if(passwords[body.department] === body.password){

        return { success:true }

    }

    return { success:false }

})