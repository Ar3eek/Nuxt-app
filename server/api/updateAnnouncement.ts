import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {

    const { id, text, author } = await readBody(event)

    try {

        await db.execute(
            "UPDATE announcements SET text = ?, author = ? WHERE id = ?",
            [text, author, id]
        )

        return { success: true }

    } catch (err) {
        console.error(err)
        return { success: false }
    }
})