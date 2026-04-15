import { resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _imports_0 = publicAssetsURL("/screenshot.png");
const _imports_1 = publicAssetsURL("/screenshot2.png");
const _imports_2 = publicAssetsURL("/screenshot3.png");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ClipboardList = resolveComponent("ClipboardList");
  const _component_CheckCircle = resolveComponent("CheckCircle");
  const _component_Megaphone = resolveComponent("Megaphone");
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-20 px-6" }, _attrs))}><div class="max-w-6xl mx-auto space-y-20"><section class="text-center"><h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"> Zarządzanie raportami i zadaniami bez chaosu </h1><p class="text-lg text-gray-600 max-w-2xl mx-auto mb-4"> Centralne miejsce do raportowania pracy, kontroli zadań i komunikacji zespołowej. </p><p class="text-sm text-gray-500 max-w-xl mx-auto mb-10"> Uporządkuj procesy, zwiększ przejrzystość i miej pełną kontrolę nad pracą zespołu. </p><a href="/kontakt"><button class="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition hover:scale-[1.02]"> Skontaktuj się z nami </button></a><div class="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-500"><div>✔ Przejrzysta organizacja pracy</div><div>✔ Szybki dostęp do danych</div><div>✔ Lepsza komunikacja w zespole</div></div></section><section class="max-w-4xl mx-auto text-center"><h2 class="text-2xl font-semibold text-gray-900 mb-4"> Jedno narzędzie do zarządzania pracą zespołu </h2><p class="text-gray-600 text-sm leading-relaxed"> System eliminuje rozproszone informacje i ręczne raportowanie. Wszystkie działania zespołu są widoczne w jednym miejscu — co pozwala szybciej podejmować decyzje, kontrolować postępy i ograniczyć błędy komunikacyjne. </p></section><section class="grid md:grid-cols-3 gap-6"><div class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">`);
  _push(ssrRenderComponent(_component_ClipboardList, { class: "w-10 h-10 text-red-500 mb-4" }, null, _parent));
  _push(`<h3 class="font-semibold text-gray-900 mb-2"> Centralizacja raportów </h3><p class="text-sm text-gray-600"> Wszystkie raporty w jednym systemie — uporządkowane i dostępne w każdej chwili. </p></div><div class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">`);
  _push(ssrRenderComponent(_component_CheckCircle, { class: "w-10 h-10 text-green-500 mb-4" }, null, _parent));
  _push(`<h3 class="font-semibold text-gray-900 mb-2"> Kontrola realizacji zadań </h3><p class="text-sm text-gray-600"> Monitoruj postęp pracy zespołu i reaguj na bieżąco. </p></div><div class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">`);
  _push(ssrRenderComponent(_component_Megaphone, { class: "w-10 h-10 text-blue-500 mb-4" }, null, _parent));
  _push(`<h3 class="font-semibold text-gray-900 mb-2"> Spójna komunikacja </h3><p class="text-sm text-gray-600"> Informacje trafiają dokładnie tam, gdzie są potrzebne. </p></div></section><section class="bg-white rounded-2xl shadow p-8 text-center"><h2 class="text-xl font-semibold text-gray-800 mb-4"> Prosty i czytelny system </h2><p class="text-sm text-gray-600 mb-6"> Zaprojektowany tak, żeby każdy mógł zacząć korzystać od razu — bez szkolenia. </p><div class="rounded-lg p-6 space-y-12"><div class="text-center"><img${ssrRenderAttr("src", _imports_0)} alt="dashboard" class="border rounded-lg mb-4 shadow"><h3 class="font-semibold text-gray-800 text-lg mb-1"> Dashboard – wszystko w jednym miejscu </h3><p class="text-sm text-gray-600 max-w-xl mx-auto"> Najważniejsze informacje od kierownika, liczba raportów, zadań i ogłoszeń — pełen podgląd sytuacji w zespole od razu po zalogowaniu. </p></div><div class="text-center"><img${ssrRenderAttr("src", _imports_1)} alt="raporty" class="border rounded-lg mb-4 shadow"><h3 class="font-semibold text-gray-800 text-lg mb-1"> Raporty – przejrzyste i uporządkowane </h3><p class="text-sm text-gray-600 max-w-xl mx-auto"> Wszystkie raporty w jednym miejscu — czytelne, łatwe do przeglądania i dostępne dla odpowiednich działów bez chaosu i szukania informacji. </p></div><div class="text-center"><img${ssrRenderAttr("src", _imports_2)} alt="dodawanie raportu" class="border rounded-lg mb-4 shadow"><h3 class="font-semibold text-gray-800 text-lg mb-1"> Dodawanie raportów – szybkie i proste </h3><p class="text-sm text-gray-600 max-w-xl mx-auto"> Intuicyjny panel dodawania raportów pozwala w kilka sekund zapisać wykonaną pracę bez zbędnych kroków i komplikacji. </p></div></div></section></div></main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-BxLNxDEC.mjs.map
