import { db } from '../utils/db'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    await db.execute(
        'UPDATE reports SET status = ? WHERE id = ?',
        [body.status, body.id]
    )

    return { success: true }
})