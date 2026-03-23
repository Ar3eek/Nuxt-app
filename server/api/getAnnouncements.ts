import { db } from '~/server/utils/db'

export default defineEventHandler(async () => {
    try {

        const [rows] = await db.execute(
            "SELECT id, text, author, timestamp, department FROM announcements ORDER BY timestamp DESC"
        )

        return rows

    } catch (err) {
        console.error(err)
        return []
    }
})