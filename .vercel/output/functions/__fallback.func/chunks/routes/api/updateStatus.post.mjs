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

const updateStatus_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.execute(
    "UPDATE reports SET status = ? WHERE id = ?",
    [body.status, body.id]
  );
  return { success: true };
});

export { updateStatus_post as default };
//# sourceMappingURL=updateStatus.post.mjs.map
