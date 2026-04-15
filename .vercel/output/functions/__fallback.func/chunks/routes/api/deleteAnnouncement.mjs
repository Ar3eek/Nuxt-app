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

const deleteAnnouncement = defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  try {
    await db.execute(
      "DELETE FROM announcements WHERE id = ?",
      [id]
    );
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
});

export { deleteAnnouncement as default };
//# sourceMappingURL=deleteAnnouncement.mjs.map
