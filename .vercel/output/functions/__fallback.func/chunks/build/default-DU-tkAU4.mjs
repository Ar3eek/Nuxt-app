import { _ as __nuxt_component_0$1 } from './nuxt-link-D2Myxn09.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, toDisplayString, createTextVNode, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { useRoute } from 'vue-router';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _imports_0 = publicAssetsURL("/logo23.png");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    useRoute();
    const selectedDepartment = ref("");
    const passwordInput = ref("");
    const errorMsg = ref("");
    const mobileOpen = ref(false);
    const menu = computed(() => {
      if (user.value?.role === "manager") {
        return [
          { name: "Manager", path: "/manager" }
        ];
      }
      if (user.value) {
        return [
          { name: "Dashboard", path: "/dashboard" },
          { name: "Raporty", path: "/reports" }
        ];
      }
      return [
        { name: "Strona główna", path: "/" }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-50 bg-white/80 backdrop-blur border-b shadow-sm" }, _attrs))}><nav class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3"><div class="hidden md:flex gap-6"></div><button class="md:hidden text-2xl"> ☰ </button>`);
      _push(ssrRenderComponent(_component_NuxtLink, { class: "md:absolute" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} class="h-10 hover:scale-105 transition"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                class: "h-10 hover:scale-105 transition"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex items-center gap-4">`);
      if (!unref(user)) {
        _push(`<div class="flex flex-col gap-1"><div class="flex items-center gap-2"><select class="border px-2 py-1 rounded text-sm"><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(selectedDepartment.value) ? ssrLooseContain(selectedDepartment.value, "") : ssrLooseEqual(selectedDepartment.value, "")) ? " selected" : ""}>Dział</option><option value="Magazyn"${ssrIncludeBooleanAttr(Array.isArray(selectedDepartment.value) ? ssrLooseContain(selectedDepartment.value, "Magazyn") : ssrLooseEqual(selectedDepartment.value, "Magazyn")) ? " selected" : ""}>Magazyn</option><option value="Dostawy"${ssrIncludeBooleanAttr(Array.isArray(selectedDepartment.value) ? ssrLooseContain(selectedDepartment.value, "Dostawy") : ssrLooseEqual(selectedDepartment.value, "Dostawy")) ? " selected" : ""}>Dostawy</option><option value="Spedycja"${ssrIncludeBooleanAttr(Array.isArray(selectedDepartment.value) ? ssrLooseContain(selectedDepartment.value, "Spedycja") : ssrLooseEqual(selectedDepartment.value, "Spedycja")) ? " selected" : ""}>Spedycja</option><option value="Kierownik"${ssrIncludeBooleanAttr(Array.isArray(selectedDepartment.value) ? ssrLooseContain(selectedDepartment.value, "Kierownik") : ssrLooseEqual(selectedDepartment.value, "Kierownik")) ? " selected" : ""}>Kierownik</option></select><input${ssrRenderAttr("value", passwordInput.value)} type="password" placeholder="hasło" class="border px-2 py-1 rounded w-24 text-sm"><button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"> Wejdź </button></div>`);
        if (errorMsg.value) {
          _push(`<div class="text-xs text-red-500 ml-1">${ssrInterpolate(errorMsg.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="flex items-center gap-3"><div class="text-sm text-right"><p class="font-medium text-gray-700">${ssrInterpolate(unref(user).department)}</p><p class="text-xs text-gray-400">${ssrInterpolate(unref(user).role)}</p></div><div class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center"> 👤 </div><button class="text-red-500 hover:underline text-sm"> Wyloguj </button></div>`);
      }
      _push(`</div></nav>`);
      if (mobileOpen.value) {
        _push(`<div class="md:hidden px-4 pb-4"><!--[-->`);
        ssrRenderList(menu.value, (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.path,
            to: item.path,
            class: "block py-2 border-b",
            onClick: ($event) => mobileOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        if (!unref(user)) {
          _push(`<div class="mt-4 flex flex-col gap-2"><select class="border px-2 py-1 rounded text-sm"><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(selectedDepartment.value) ? ssrLooseContain(selectedDepartment.value, "") : ssrLooseEqual(selectedDepartment.value, "")) ? " selected" : ""}>Dział</option><option value="Magazyn"${ssrIncludeBooleanAttr(Array.isArray(selectedDepartment.value) ? ssrLooseContain(selectedDepartment.value, "Magazyn") : ssrLooseEqual(selectedDepartment.value, "Magazyn")) ? " selected" : ""}>Magazyn</option><option value="Dostawy"${ssrIncludeBooleanAttr(Array.isArray(selectedDepartment.value) ? ssrLooseContain(selectedDepartment.value, "Dostawy") : ssrLooseEqual(selectedDepartment.value, "Dostawy")) ? " selected" : ""}>Dostawy</option><option value="Spedycja"${ssrIncludeBooleanAttr(Array.isArray(selectedDepartment.value) ? ssrLooseContain(selectedDepartment.value, "Spedycja") : ssrLooseEqual(selectedDepartment.value, "Spedycja")) ? " selected" : ""}>Spedycja</option><option value="Kierownik"${ssrIncludeBooleanAttr(Array.isArray(selectedDepartment.value) ? ssrLooseContain(selectedDepartment.value, "Kierownik") : ssrLooseEqual(selectedDepartment.value, "Kierownik")) ? " selected" : ""}>Kierownik</option></select><input${ssrRenderAttr("value", passwordInput.value)} type="password" placeholder="hasło" class="border px-2 py-1 rounded text-sm"><button class="bg-red-500 text-white px-3 py-2 rounded"> Wejdź </button>`);
          if (errorMsg.value) {
            _push(`<div class="text-xs text-red-500">${ssrInterpolate(errorMsg.value)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="mt-4 flex flex-col gap-2"><div class="text-sm">${ssrInterpolate(unref(user).department)} (${ssrInterpolate(unref(user).role)}) </div><button class="text-red-500 text-sm"> Wyloguj </button></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "Navbar" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gray-950 text-gray-300" }, _attrs))}><div class="max-w-7xl mx-auto px-8 py-14 grid gap-10 md:grid-cols-4"><div><h2 class="text-xl font-bold text-white mb-3"> System Raportów </h2><p class="text-sm text-gray-400 leading-relaxed"> Nowoczesna platforma do zarządzania raportami i zadaniami zespołu. Umożliwia płynną komunikację między zmianami oraz pełną kontrolę nad realizacją pracy. </p></div><div><h3 class="text-white font-semibold mb-3"> Nawigacja </h3><ul class="space-y-2 text-sm"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-white transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Strona główna `);
          } else {
            return [
              createTextVNode(" Strona główna ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/reports",
        class: "hover:text-white transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Raporty `);
          } else {
            return [
              createTextVNode(" Raporty ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/manager",
        class: "hover:text-white transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Panel kierownika `);
          } else {
            return [
              createTextVNode(" Panel kierownika ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h3 class="text-white font-semibold mb-3"> Informacje </h3><ul class="space-y-2 text-sm text-gray-400"><li>Wsparcie zespołu</li><li>Kontrola pracy</li><li>Historia raportów</li><li>Bezpieczeństwo danych</li></ul></div><div><h3 class="text-white font-semibold mb-3"> Kontakt </h3><p class="text-sm text-gray-400 mb-4"> Masz pytania lub chcesz wdrożyć system w swojej firmie? </p><a href="https://arkadiuszkorzeniowski.pl/Kontakt" class="inline-block bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"> Skontaktuj się </a></div></div><div class="border-t border-gray-800"><div class="max-w-7xl mx-auto px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500"><p> © ${ssrInterpolate(unref(year))} System Raportów — Wszelkie prawa zastrzeżone </p><p> Projekt i realizacja <a href="https://arkadiuszkorzeniowski.pl/" target="_blank" class="text-red-500 hover:text-red-400 transition"> Arkadiusz Korzeniowski </a></p></div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "AppFooter" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const currentTime = ref("");
    const currentDate = ref("");
    const { user } = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Navbar = __nuxt_component_0;
      const _component_AppFooter = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (!unref(user)) {
        _push(`<div class="flex flex-col min-h-screen">`);
        _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
        _push(`<main class="flex-1">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</main>`);
        _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="min-h-screen flex bg-gray-100"><aside class="w-64 bg-white border-r shadow-sm hidden md:flex flex-col">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard",
          class: "border-b flex flex-col items-center p-2 bg-gray-100"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-lg font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(currentTime.value)}</span><span class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(currentDate.value)}</span>`);
            } else {
              return [
                createVNode("span", { class: "text-lg font-semibold text-gray-800" }, toDisplayString(currentTime.value), 1),
                createVNode("span", { class: "text-xs text-gray-500" }, toDisplayString(currentDate.value), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<nav class="flex-1 p-4 space-y-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard",
          class: [_ctx.$route.path === "/dashboard" ? "bg-gray-100 font-medium" : "hover:bg-gray-100", "block p-3 rounded-lg"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 📊 Dashboard `);
            } else {
              return [
                createTextVNode(" 📊 Dashboard ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(user)?.role !== "manager") {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/reports",
            class: [_ctx.$route.path === "/reports" ? "bg-gray-100 font-medium" : "hover:bg-gray-100", "block p-3 rounded-lg"]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` 📋 Raporty `);
              } else {
                return [
                  createTextVNode(" 📋 Raporty ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(user)?.role === "manager") {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/manager",
            class: "block p-3 rounded-lg text-red-600 hover:bg-red-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` 👑 Manager `);
              } else {
                return [
                  createTextVNode(" 👑 Manager ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</nav><div class="p-4 border-t text-sm"><p class="font-medium">${ssrInterpolate(unref(user)?.department)}</p><p class="text-xs text-gray-400">${ssrInterpolate(unref(user)?.role)}</p></div></aside><div class="flex-1 flex flex-col">`);
        _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
        _push(`<main class="flex-1 p-6">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</main></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-DU-tkAU4.mjs.map
