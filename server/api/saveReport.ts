import fs from "fs"
import path from "path"

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const filePath = path.resolve("reports.json")

    let reports = []

    if (fs.existsSync(filePath)) {
        reports = JSON.parse(fs.readFileSync(filePath, "utf-8"))
    }

    reports.push(body)

    fs.writeFileSync(filePath, JSON.stringify(reports, null, 2))

    return { success: true }

})