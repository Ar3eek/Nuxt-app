import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import { d as db } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'mysql2/promise';

const saveReport = defineEventHandler(async (event) => {
  console.log("\u{1F525} API saveReport wywo\u0142ane");
  const body = await readBody(event);
  console.log("BODY:", body);
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
    );
    console.log("\u2705 ZAPISANO DO BAZY");
    return { success: true };
  } catch (err) {
    console.error("\u274C DB ERROR:", err);
    return { success: false };
  }
});

export { saveReport as default };
//# sourceMappingURL=saveReport.mjs.map
