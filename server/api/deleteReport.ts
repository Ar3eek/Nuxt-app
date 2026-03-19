import { readFile, writeFile } from 'fs/promises'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { id } = body

    const file = await readFile('reports.json', 'utf-8')
    let reports = JSON.parse(file)

    reports = reports.filter((r: any) => r.id !== id)

    await writeFile('reports.json', JSON.stringify(reports, null, 2))

    return { success: true }
})