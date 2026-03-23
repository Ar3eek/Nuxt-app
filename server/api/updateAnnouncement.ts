import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {

    const { id, text, author, department } = await readBody(event)

    try {

        await db.execute(
            "UPDATE announcements SET text = ?, author = ?, department = ? WHERE id = ?",
            [text, author, department, id]
        )

        return { success: true }

    } catch (err) {
        console.error(err)
        return { success: false }
    }
})