import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { d as db } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'mysql2/promise';

const getAnnouncements = defineEventHandler(async () => {
  try {
    const [rows] = await db.execute(
      "SELECT id, text, author, timestamp, department FROM announcements ORDER BY timestamp DESC"
    );
    return rows;
  } catch (err) {
    console.error(err);
    return [];
  }
});

export { getAnnouncements as default };
//# sourceMappingURL=getAnnouncements.mjs.map
