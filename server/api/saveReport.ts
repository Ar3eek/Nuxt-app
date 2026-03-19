import { db } from '../utils/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        await db.execute(
            `INSERT INTO reports (data, zmiana, pracownik, opis)
       VALUES (?, ?, ?, ?)`,
            [
                body.date,
                body.shift,
                body.user,
                body.description
            ]
        )

        return { success: true }

    } catch (err) {
        console.error(err)
        return { success: false }
    }
})