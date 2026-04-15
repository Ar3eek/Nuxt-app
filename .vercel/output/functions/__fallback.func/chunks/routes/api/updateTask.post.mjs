import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { d as db } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'mysql2/promise';

const updateTask_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { reportId, taskIndex, done } = body;
  const [rows] = await db.execute(
    "SELECT tasks FROM reports WHERE id = ?",
    [reportId]
  );
  if (!rows.length) {
    throw createError({ statusCode: 404, statusMessage: "Report not found" });
  }
  let tasks = rows[0].tasks;
  if (typeof tasks === "string") {
    tasks = JSON.parse(tasks);
  }
  if (!tasks[taskIndex]) {
    throw createError({ statusCode: 400, statusMessage: "Task not found" });
  }
  tasks[taskIndex].done = done;
  await db.execute(
    "UPDATE reports SET tasks = ? WHERE id = ?",
    [JSON.stringify(tasks), reportId]
  );
  return { success: true };
});

export { updateTask_post as default };
//# sourceMappingURL=updateTask.post.mjs.map
