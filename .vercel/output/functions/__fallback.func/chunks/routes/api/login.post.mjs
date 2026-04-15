import { d as defineEventHandler, r as readBody, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const passwords = {
    Dostawy: config.dostawyPassword,
    Magazyn: config.magazynPassword,
    Spedycja: config.spedycjaPassword,
    Kierownik: config.kierownikPassword
  };
  if (passwords[body.department] === body.password) {
    return { success: true };
  }
  return { success: false };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
