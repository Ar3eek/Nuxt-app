import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {

    const { id } = await readBody(event)

    try {

        await db.execute(
            "DELETE FROM announcements WHERE id = ?",
            [id]
        )

        return { success: true }

    } catch (err) {
        console.error(err)
        return { success: false }
    }
})