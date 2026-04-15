import { _ as __nuxt_component_0 } from './nuxt-link-D2Myxn09.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-CZQN7vMv.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const reports = ref([]);
    const search = ref("");
    const openStatusId = ref(null);
    const departmentReports = computed(() => {
      if (!user.value) return [];
      let data = reports.value;
      data = data.filter(
        (r) => r.department?.toLowerCase() === user.value.department?.toLowerCase()
      );
      if (search.value.length >= 2) {
        const s = search.value.toLowerCase();
        data = data.filter(
          (r) => r.user?.toLowerCase().includes(s) || r.description?.toLowerCase().includes(s)
        );
      }
      return data;
    });
    const getStatusMeta = (status) => {
      return status === "done" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-100 to-gray-200" }, _attrs))}><div class="max-w-6xl mx-auto px-4 py-8"><div class="sticky top-0 z-10 backdrop-blur bg-white/70 rounded-xl px-6 py-4 mb-6 shadow-sm flex justify-between items-center"><h1 class="text-2xl font-bold"> Raporty: <span class="text-red-600">${ssrInterpolate(unref(user)?.department)}</span></h1><button class="text-sm text-red-500 hover:text-red-700"> Wyloguj </button></div><div class="flex flex-col md:flex-row gap-4 mb-6"><input${ssrRenderAttr("value", search.value)} placeholder="🔍 Szukaj (min. 2 znaki)..." class="flex-1 p-3 rounded-xl border focus:ring-2 focus:ring-red-500">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/reports/create",
        class: "bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` + Dodaj raport `);
          } else {
            return [
              createTextVNode(" + Dodaj raport ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-6"><!--[-->`);
      ssrRenderList(departmentReports.value, (report) => {
        _push(`<div class="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"><div class="flex justify-between items-start mb-4"><div><h2 class="font-semibold text-lg">${ssrInterpolate(report.date)} • Zmiana ${ssrInterpolate(report.shift)}</h2><p class="text-sm text-gray-500">${ssrInterpolate(report.user)}</p></div><div class="relative"><div class="${ssrRenderClass([getStatusMeta(report.status), "cursor-pointer px-3 py-1 rounded-lg text-xs font-semibold"])}">${ssrInterpolate(report.status === "done" ? "🟢 Zrobiony" : "🔴 Nowy")}</div>`);
        if (openStatusId.value === report.id) {
          _push(`<div class="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-20"><div class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"> 🔴 Nowy </div><div class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"> 🟢 Zrobiony </div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="text-gray-700 mb-5 text-sm bg-gray-50 p-4 rounded">${report.description ?? ""}</div><div class="text-sm text-gray-500 mb-2"> Zadania: </div><div class="space-y-2"><!--[-->`);
        ssrRenderList(report.tasks || [], (task, index) => {
          _push(`<div class="flex items-center gap-3"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(task.done) ? ssrLooseContain(task.done, null) : task.done) ? " checked" : ""} class="accent-red-600"><span class="${ssrRenderClass(task.done ? "line-through text-gray-400" : "")}">${ssrInterpolate(task.text)}</span></div>`);
        });
        _push(`<!--]--></div><div class="flex justify-between items-center mt-6"><span class="text-xs text-gray-400"> ID: ${ssrInterpolate(report.id)}</span><button class="text-sm text-red-500 hover:text-red-700"> Usuń </button></div></div>`);
      });
      _push(`<!--]-->`);
      if (departmentReports.value.length === 0) {
        _push(`<div class="text-center py-16 text-gray-400"> Brak raportów 😴 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports/list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=list-D2U8h6hD.mjs.map
