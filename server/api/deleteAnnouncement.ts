import fs from "fs"
import path from "path"

export default defineEventHandler(async (event) => {

    const { index } = await readBody(event)

    const filePath = path.resolve("announcements.json")

    if (!fs.existsSync(filePath)) {
        return { success:false }
    }

    const data = JSON.parse(fs.readFileSync(filePath,"utf-8"))

    data.splice(index,1)

    fs.writeFileSync(filePath, JSON.stringify(data,null,2))

    return { success:true }

})