export default defineEventHandler(async (event)=>{

    const body = await readBody(event)

    const config = useRuntimeConfig()

    if(body.password === config.kierownikPassword){

        return { success:true }

    }

    return { success:false }

})