import { d as defineEventHandler, r as readBody, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const adminLogin_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  if (body.password === config.kierownikPassword) {
    return { success: true };
  }
  return { success: false };
});

export { adminLogin_post as default };
//# sourceMappingURL=adminLogin.post.mjs.map
