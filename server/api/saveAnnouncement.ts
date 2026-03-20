import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {

    const { text, author, timestamp } = await readBody(event)

    try {

        await db.execute(
            "INSERT INTO announcements (text, author, timestamp) VALUES (?, ?, ?)",
            [text, author, timestamp]
        )

        return { success: true }

    } catch (err) {
        console.error(err)
        return { success: false }
    }
})