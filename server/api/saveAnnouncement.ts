import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {

    try {

        const body = await readBody(event)

        console.log("BODY:", body)

        const text = body.text || ""
        const author = body.author || "Kierownik"
        const timestamp = body.timestamp || Date.now()
        const department = body.department || "all" // 🔥 ZABEZPIECZENIE

        if (!text) {
            return { success: false, message: "Brak treści" }
        }

        const [result] = await db.execute(
            "INSERT INTO announcements (text, author, timestamp, department) VALUES (?, ?, ?, ?)",
            [text, author, timestamp, department]
        )

        console.log("ZAPISANO:", result)

        return { success: true }

    } catch (err) {

        console.error("SAVE ERROR:", err)

        return { success: false, error: err }
    }

})