import { db } from '../utils/db'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const { reportId, taskIndex, done } = body

    // 🔥 pobierz raport z DB
    const [rows]: any = await db.execute(
        'SELECT tasks FROM reports WHERE id = ?',
        [reportId]
    )

    if (!rows.length) {
        throw createError({ statusCode: 404, statusMessage: 'Report not found' })
    }

    // 🔥 parsuj tasks
    let tasks = rows[0].tasks

    if (typeof tasks === 'string') {
        tasks = JSON.parse(tasks)
    }

    if (!tasks[taskIndex]) {
        throw createError({ statusCode: 400, statusMessage: 'Task not found' })
    }

    // 🔥 update
    tasks[taskIndex].done = done

    // 🔥 zapisz z powrotem do DB
    await db.execute(
        'UPDATE reports SET tasks = ? WHERE id = ?',
        [JSON.stringify(tasks), reportId]
    )

    return { success: true }
})