import { defineComponent, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { Mail, Phone, Send } from 'lucide-vue-next';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "kontakt",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="p-4 border border-gray-100" data-v-774510bd><div class="flex justify-center md:w-[200px] border bg-gray-200 rounded-lg" data-v-774510bd> Wróć do <a href="/" class="text-red-600 hover:underline font-bold px-1" data-v-774510bd>strony głównej</a></div></div><main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-20 px-6" data-v-774510bd><div class="max-w-5xl mx-auto space-y-16" data-v-774510bd><section class="text-center" data-v-774510bd><h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-v-774510bd> Kontakt &amp; Raport Systemu </h1><p class="text-lg text-gray-600 max-w-2xl mx-auto mb-4" data-v-774510bd> Masz pytania, chcesz wdrożyć system lub zgłosić problem? </p><p class="text-sm text-gray-500 max-w-xl mx-auto" data-v-774510bd> Skontaktuj się z nami lub prześlij raport — odpowiadamy szybko i konkretnie. </p></section><section class="grid md:grid-cols-2 gap-10" data-v-774510bd><div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6" data-v-774510bd><h2 class="text-xl font-semibold text-gray-900" data-v-774510bd>Dane kontaktowe</h2><div class="flex items-center gap-4" data-v-774510bd>`);
      _push(ssrRenderComponent(unref(Mail), { class: "w-6 h-6 text-red-500" }, null, _parent));
      _push(`<div data-v-774510bd><p class="text-sm text-gray-500" data-v-774510bd>Email</p><p class="text-gray-800 font-medium" data-v-774510bd>kontakt@arkadiuszkorzeniowski.pl</p></div></div><div class="flex items-center gap-4" data-v-774510bd>`);
      _push(ssrRenderComponent(unref(Phone), { class: "w-6 h-6 text-green-500" }, null, _parent));
      _push(`<div data-v-774510bd><p class="text-sm text-gray-500" data-v-774510bd>Telefon</p><p class="text-gray-800 font-medium" data-v-774510bd>+48 792 276 388</p></div></div><div class="text-sm text-gray-500 pt-4" data-v-774510bd> Odpowiadamy zazwyczaj w ciągu 24h. </div></div><div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100" data-v-774510bd><h2 class="text-xl font-semibold text-gray-900 mb-6" data-v-774510bd>Wyślij wiadomość / raport</h2><form class="space-y-5" data-v-774510bd><div data-v-774510bd><label for="name" class="text-sm text-gray-600" data-v-774510bd>Imię</label><input id="name" type="text" class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Jan Kowalski" required data-v-774510bd></div><div data-v-774510bd><label for="email" class="text-sm text-gray-600" data-v-774510bd>Email</label><input id="email" type="email" class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="email@firma.pl" required data-v-774510bd></div><div data-v-774510bd><label for="subject" class="text-sm text-gray-600" data-v-774510bd>Temat</label><select id="subject" class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" required data-v-774510bd><option value="" disabled selected data-v-774510bd>Wybierz temat</option><option data-v-774510bd>Zapytanie</option><option data-v-774510bd>Wdrożenie systemu</option><option data-v-774510bd>Problem / błąd</option><option data-v-774510bd>Inne</option></select></div><div data-v-774510bd><label for="message" class="text-sm text-gray-600" data-v-774510bd>Wiadomość</label><textarea id="message" rows="4" class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Opisz szczegóły..." required data-v-774510bd></textarea></div><button type="submit" class="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition hover:scale-[1.02]" data-v-774510bd>`);
      _push(ssrRenderComponent(unref(Send), { class: "w-5 h-5" }, null, _parent));
      _push(` Wyślij wiadomość </button></form></div></section><section class="text-center max-w-3xl mx-auto" data-v-774510bd><h2 class="text-xl font-semibold text-gray-900 mb-3" data-v-774510bd>Szybka pomoc techniczna</h2><p class="text-sm text-gray-600" data-v-774510bd> Jeśli zgłaszasz problem, podaj jak najwięcej szczegółów — przyspieszy to diagnozę i rozwiązanie. </p></section></div></main><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/kontakt.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const kontakt = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-774510bd"]]);

export { kontakt as default };
//# sourceMappingURL=kontakt-DVPagrKz.mjs.map
