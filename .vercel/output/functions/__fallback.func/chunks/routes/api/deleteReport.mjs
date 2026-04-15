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

const deleteReport = defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const [result] = await db.execute(
      "DELETE FROM reports WHERE id = ?",
      [body.id]
    );
    return { success: true };
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return { success: false };
  }
});

export { deleteReport as default };
//# sourceMappingURL=deleteReport.mjs.map
