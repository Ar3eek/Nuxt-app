import fs from "fs"
import path from "path"

export default defineEventHandler(() => {

    const filePath = path.resolve("announcements.json")

    if (!fs.existsSync(filePath)) {
        return []
    }

    const data = fs.readFileSync(filePath, "utf-8")

    return JSON.parse(data)

})