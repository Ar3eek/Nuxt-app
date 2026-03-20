import { db } from '../utils/db'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    try {

        const [result]: any = await db.execute(
            'DELETE FROM reports WHERE id = ?',
            [body.id]
        )

        return { success: true }

    } catch (err) {

        console.error("DELETE ERROR:", err)
        return { success: false }

    }

})