import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-CZQN7vMv.mjs';
import './server.mjs';
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
  __name: "manager",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const announcements = ref([]);
    const author = ref("Kierownik");
    const text = ref("");
    const department = ref("all");
    const successMessage = ref("");
    const welcomeMessage = ref("");
    const editingId = ref(null);
    const editText = ref("");
    const editAuthor = ref("");
    const editDepartment = ref("all");
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString("pl-PL") + " • " + date.toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100 px-4 py-10" }, _attrs))}>`);
      if (welcomeMessage.value) {
        _push(`<div class="fixed top-6 left-1/2 -translate-x-1/2 bg-white shadow px-6 py-3 rounded-xl z-50">${ssrInterpolate(welcomeMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max-w-3xl mx-auto"><div class="text-center mb-8"><h1 class="text-3xl font-bold"> 🧑‍💼 Panel kierownika </h1></div><div class="bg-white p-6 rounded-xl shadow mb-6">`);
      if (successMessage.value) {
        _push(`<div class="mb-3 text-green-600">${ssrInterpolate(successMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("value", author.value)} class="border p-2 w-full mb-2 rounded"><select class="border p-2 w-full mb-2 rounded"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(department.value) ? ssrLooseContain(department.value, "all") : ssrLooseEqual(department.value, "all")) ? " selected" : ""}>Wszyscy</option><option value="dostawy"${ssrIncludeBooleanAttr(Array.isArray(department.value) ? ssrLooseContain(department.value, "dostawy") : ssrLooseEqual(department.value, "dostawy")) ? " selected" : ""}>Dostawy</option><option value="magazyn"${ssrIncludeBooleanAttr(Array.isArray(department.value) ? ssrLooseContain(department.value, "magazyn") : ssrLooseEqual(department.value, "magazyn")) ? " selected" : ""}>Magazyn</option><option value="spedycja"${ssrIncludeBooleanAttr(Array.isArray(department.value) ? ssrLooseContain(department.value, "spedycja") : ssrLooseEqual(department.value, "spedycja")) ? " selected" : ""}>Spedycja</option></select><textarea placeholder="Treść ogłoszenia..." class="border p-2 w-full mb-3 rounded">${ssrInterpolate(text.value)}</textarea><button class="bg-red-600 text-white px-4 py-2 rounded"> Dodaj ogłoszenie </button></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(announcements.value, (item) => {
        _push(`<div class="bg-white p-4 rounded-xl shadow">`);
        if (editingId.value !== item.id) {
          _push(`<div><p class="mb-2">${ssrInterpolate(item.text)}</p><div class="text-sm text-gray-500 mb-3">${ssrInterpolate(formatDate(item.timestamp))} • ${ssrInterpolate(item.author)} <span class="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">${ssrInterpolate(item.department)}</span></div><div class="flex gap-4 text-sm"><button class="text-blue-600"> Edytuj </button><button class="text-red-600"> Usuń </button></div></div>`);
        } else {
          _push(`<div><input${ssrRenderAttr("value", editAuthor.value)} class="border p-2 w-full mb-2 rounded"><select class="border p-2 w-full mb-2 rounded"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(editDepartment.value) ? ssrLooseContain(editDepartment.value, "all") : ssrLooseEqual(editDepartment.value, "all")) ? " selected" : ""}>Wszyscy</option><option value="dostawy"${ssrIncludeBooleanAttr(Array.isArray(editDepartment.value) ? ssrLooseContain(editDepartment.value, "dostawy") : ssrLooseEqual(editDepartment.value, "dostawy")) ? " selected" : ""}>Dostawy</option><option value="magazyn"${ssrIncludeBooleanAttr(Array.isArray(editDepartment.value) ? ssrLooseContain(editDepartment.value, "magazyn") : ssrLooseEqual(editDepartment.value, "magazyn")) ? " selected" : ""}>Magazyn</option><option value="spedycja"${ssrIncludeBooleanAttr(Array.isArray(editDepartment.value) ? ssrLooseContain(editDepartment.value, "spedycja") : ssrLooseEqual(editDepartment.value, "spedycja")) ? " selected" : ""}>Spedycja</option></select><textarea class="border p-2 w-full mb-3 rounded">${ssrInterpolate(editText.value)}</textarea><div class="flex gap-4 text-sm"><button class="text-green-600"> Zapisz </button><button class="text-gray-600"> Anuluj </button></div></div>`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=manager-1-2Z24ik.mjs.map
