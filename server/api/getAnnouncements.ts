import { db } from '~/server/utils/db'

export default defineEventHandler(async () => {
    try {
        const [rows]: any = await db.execute(
            "SELECT * FROM announcements ORDER BY timestamp DESC"
        )

        return rows

    } catch (err) {
        console.error(err)
        return []
    }
})