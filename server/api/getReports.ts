import { db } from '../utils/db'

export default defineEventHandler(async () => {

    try {

        const [rows]: any = await db.execute(
            'SELECT * FROM reports ORDER BY id DESC'
        )

        return rows.map((r: any) => {

            let tasks = []

            try {
                tasks = JSON.parse(r.tasks || '[]')
            } catch (e) {
                console.error("❌ Błąd parsowania tasks:", e)
            }

            return {
                id: r.id,
                date: r.data,
                shift: r.zmiana,
                user: r.pracownik,
                description: r.opis,
                department: r.dzial,
                tasks
            }
        })

    } catch (err) {

        console.error("❌ GET REPORTS ERROR:", err)
        return []

    }

})