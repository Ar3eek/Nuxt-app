import fs from "fs"
import path from "path"

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const filePath = path.resolve("announcements.json")

    let announcements = []

    if (fs.existsSync(filePath)) {
        announcements = JSON.parse(fs.readFileSync(filePath, "utf-8"))
    }

    announcements.unshift(body)

    fs.writeFileSync(filePath, JSON.stringify(announcements, null, 2))

    return { success: true }

})