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

const saveAnnouncement = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log("BODY:", body);
    const text = body.text || "";
    const author = body.author || "Kierownik";
    const timestamp = body.timestamp || Date.now();
    const department = body.department || "all";
    if (!text) {
      return { success: false, message: "Brak tre\u015Bci" };
    }
    const [result] = await db.execute(
      "INSERT INTO announcements (text, author, timestamp, department) VALUES (?, ?, ?, ?)",
      [text, author, timestamp, department]
    );
    console.log("ZAPISANO:", result);
    return { success: true };
  } catch (err) {
    console.error("SAVE ERROR:", err);
    return { success: false, error: err };
  }
});

export { saveAnnouncement as default };
//# sourceMappingURL=saveAnnouncement.mjs.map
