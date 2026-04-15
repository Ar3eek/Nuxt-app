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

const getReports = defineEventHandler(async () => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM reports ORDER BY id DESC"
    );
    return rows.map((r) => ({
      id: r.id,
      date: r.data,
      shift: r.zmiana,
      user: r.pracownik,
      description: r.opis,
      department: r.dzial,
      // 🔥 POPRAWIONE TASKI
      tasks: (() => {
        try {
          return typeof r.tasks === "string" ? JSON.parse(r.tasks) : r.tasks || [];
        } catch {
          return [];
        }
      })(),
      // 🔥 status (żeby nie znikał)
      status: r.status || "new"
    }));
  } catch (err) {
    console.error("GET REPORTS ERROR:", err);
    return [];
  }
});

export { getReports as default };
//# sourceMappingURL=getReports.mjs.map
