import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { ClipboardList, BarChart3, Megaphone } from 'lucide-vue-next';
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
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const reports = ref([]);
    const announcements = ref([]);
    const loading = ref(true);
    const departmentReports = computed(() => {
      if (!user.value) return [];
      return reports.value.filter(
        (r) => r.department.toLowerCase() === user.value.department.toLowerCase()
      );
    });
    const totalReports = computed(() => departmentReports.value.length);
    const taskStats = computed(() => {
      let all = 0;
      let done = 0;
      departmentReports.value.forEach((report) => {
        report.tasks.forEach((task) => {
          all++;
          if (task.done) done++;
        });
      });
      return {
        all,
        done,
        left: all - done
      };
    });
    const departmentAnnouncements = computed(() => {
      if (!user.value) return [];
      return announcements.value.filter(
        (a) => a.department === "all" || a.department.toLowerCase() === user.value.department.toLowerCase()
      );
    });
    const formatDate = (ts) => {
      const d = new Date(ts);
      return d.toLocaleDateString("pl-PL") + " • " + d.toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100 p-6" }, _attrs))}>`);
      if (loading.value) {
        _push(`<div class="text-center text-gray-400 py-20"> Ładowanie... </div>`);
      } else {
        _push(`<div><div class="mb-6"><h1 class="text-2xl font-bold text-gray-800"> Dashboard </h1><p class="text-sm text-gray-500"> 👋 Witaj ${ssrInterpolate(unref(user)?.department)}</p></div><div class="grid md:grid-cols-3 gap-6 mb-10"><div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">`);
        _push(ssrRenderComponent(unref(ClipboardList), { class: "w-6 h-6 text-red-500 mb-2" }, null, _parent));
        _push(`<p class="text-sm text-gray-500">Raporty</p><p class="text-2xl font-bold">${ssrInterpolate(totalReports.value)}</p></div><div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">`);
        _push(ssrRenderComponent(unref(BarChart3), { class: "w-6 h-6 text-green-500 mb-2" }, null, _parent));
        _push(`<p class="text-sm text-gray-500">Zadania</p><div><p class="text-2xl font-bold">${ssrInterpolate(taskStats.value.left)}</p><p class="text-xs text-gray-400 mt-1">${ssrInterpolate(taskStats.value.done)}/${ssrInterpolate(taskStats.value.all)} wykonanych </p></div></div><div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">`);
        _push(ssrRenderComponent(unref(Megaphone), { class: "w-6 h-6 text-blue-500 mb-2" }, null, _parent));
        _push(`<p class="text-sm text-gray-500">Ogłoszenia</p><p class="text-2xl font-bold">${ssrInterpolate(departmentAnnouncements.value.length)}</p></div></div><div class="bg-white p-6 rounded-xl shadow"><h2 class="text-lg font-semibold text-red-600 mb-4"> 📢 Informacje od kierownika </h2>`);
        if (departmentAnnouncements.value.length === 0) {
          _push(`<div class="text-gray-400 text-sm"> Brak informacji </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-3 max-h-64 overflow-y-auto"><!--[-->`);
        ssrRenderList(departmentAnnouncements.value, (a) => {
          _push(`<div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 hover:bg-red-100 transition"><div class="flex justify-between items-start mb-2"><p class="text-sm text-gray-800">${ssrInterpolate(a.text)}</p><span class="${ssrRenderClass([a.department === "all" ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600", "text-[10px] px-2 py-1 rounded-full ml-3 whitespace-nowrap"])}">${ssrInterpolate(a.department === "all" ? "Wszyscy" : a.department)}</span></div><div class="text-xs text-gray-500 flex justify-between"><span>${ssrInterpolate(a.author)}</span><span>${ssrInterpolate(formatDate(a.timestamp))}</span></div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-Bkkn1yFQ.mjs.map
