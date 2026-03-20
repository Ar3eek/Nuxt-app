export default defineEventHandler(async (event) => {

    console.log("🔥 API saveReport wywołane")

    const body = await readBody(event)
    console.log("BODY:", body)

    try {

        await db.execute(
            `INSERT INTO reports
                 (data, zmiana, pracownik, opis, dzial, tasks)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                body.date,
                body.shift,
                body.user,
                body.description,
                body.department,
                JSON.stringify(body.tasks)
            ]
        )

        console.log("✅ ZAPISANO DO BAZY")

        return { success: true }

    } catch (err) {

        console.error("❌ DB ERROR:", err)
        return { success: false }

    }
})