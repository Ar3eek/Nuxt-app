import { db } from '../utils/db'

export default defineEventHandler(async () => {

    try {

        const [rows]: any = await db.execute(
            'SELECT * FROM reports ORDER BY id DESC'
        )

        return rows.map((r: any) => ({
            id: r.id,
            date: r.data,
            shift: r.zmiana,
            user: r.pracownik,
            description: r.opis,
            department: r.dzial,

            // 🔥 POPRAWIONE TASKI
            tasks: (() => {
                try {
                    return typeof r.tasks === 'string'
                        ? JSON.parse(r.tasks)
                        : r.tasks || []
                } catch {
                    return []
                }
            })(),

            // 🔥 status (żeby nie znikał)
            status: r.status || 'new'
        }))

    } catch (err) {

        console.error("GET REPORTS ERROR:", err)
        return []

    }

})