import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const date = ref((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    const shift = ref("1");
    const description = ref("");
    const selectedUser = ref("");
    const newUser = ref("");
    const users = ref([
      "Paweł Kozak",
      "Arkadiusz Korzeniowski",
      "Łukasz Stasak",
      "Marcin Bernat"
    ]);
    const tasks = ref([]);
    const newTask = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100 flex justify-center items-start p-4" }, _attrs))}><div class="bg-white p-6 sm:p-8 rounded-xl shadow w-full max-w-3xl"><h1 class="text-2xl sm:text-3xl font-bold mb-6"> Dodaj raport (${ssrInterpolate(unref(user)?.department)}) </h1><input type="date"${ssrRenderAttr("value", date.value)} class="border p-3 rounded w-full mb-4"><select class="border p-3 rounded w-full mb-4"><option value="1"${ssrIncludeBooleanAttr(Array.isArray(shift.value) ? ssrLooseContain(shift.value, "1") : ssrLooseEqual(shift.value, "1")) ? " selected" : ""}>Zmiana 1</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(shift.value) ? ssrLooseContain(shift.value, "2") : ssrLooseEqual(shift.value, "2")) ? " selected" : ""}>Zmiana 2</option><option value="3"${ssrIncludeBooleanAttr(Array.isArray(shift.value) ? ssrLooseContain(shift.value, "3") : ssrLooseEqual(shift.value, "3")) ? " selected" : ""}>Zmiana 3</option></select><div class="mb-4"><label class="block text-sm font-medium mb-1"> Autor raportu </label><select class="border p-3 w-full rounded"><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(selectedUser.value) ? ssrLooseContain(selectedUser.value, "") : ssrLooseEqual(selectedUser.value, "")) ? " selected" : ""}> Wybierz autora </option><!--[-->`);
      ssrRenderList(users.value, (u) => {
        _push(`<option${ssrIncludeBooleanAttr(Array.isArray(selectedUser.value) ? ssrLooseContain(selectedUser.value, null) : ssrLooseEqual(selectedUser.value, null)) ? " selected" : ""}>${ssrInterpolate(u)}</option>`);
      });
      _push(`<!--]--><option value="new"${ssrIncludeBooleanAttr(Array.isArray(selectedUser.value) ? ssrLooseContain(selectedUser.value, "new") : ssrLooseEqual(selectedUser.value, "new")) ? " selected" : ""}> ➕ Dodaj nowego </option></select></div>`);
      if (selectedUser.value === "new") {
        _push(`<div class="mb-4"><input${ssrRenderAttr("value", newUser.value)} placeholder="Nowy użytkownik" class="border p-3 w-full mb-2 rounded"><button class="bg-gray-700 text-white px-4 py-2 rounded"> Dodaj użytkownika </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h2 class="font-semibold mb-2"> Lista zadań </h2><!--[-->`);
      ssrRenderList(tasks.value, (task, index) => {
        _push(`<div class="border rounded p-3 mb-2 flex items-center gap-3"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(task.done) ? ssrLooseContain(task.done, null) : task.done) ? " checked" : ""}><span class="${ssrRenderClass([task.done ? "line-through text-gray-400" : "", "flex-1"])}">${ssrInterpolate(task.text)}</span><button class="text-red-500 text-sm"> Usuń </button></div>`);
      });
      _push(`<!--]--><div class="flex gap-2 mb-6"><input${ssrRenderAttr("value", newTask.value)} placeholder="np. Sprawdzić dostawy, zgłosić brak towaru..." class="border p-2 rounded w-full"><button class="bg-blue-600 text-white px-4 rounded"> Dodaj </button></div><h2 class="font-semibold mb-2"> Opis raportu </h2><textarea placeholder="Opisz przebieg zmiany..." class="border p-3 w-full mb-6 rounded h-40">${ssrInterpolate(description.value)}</textarea><button class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"> Zapisz raport </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-BtEd7jLD.mjs.map
