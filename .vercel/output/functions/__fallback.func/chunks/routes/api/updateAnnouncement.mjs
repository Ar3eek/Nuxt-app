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

const updateAnnouncement = defineEventHandler(async (event) => {
  const { id, text, author, department } = await readBody(event);
  try {
    await db.execute(
      "UPDATE announcements SET text = ?, author = ?, department = ? WHERE id = ?",
      [text, author, department, id]
    );
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
});

export { updateAnnouncement as default };
//# sourceMappingURL=updateAnnouncement.mjs.map
