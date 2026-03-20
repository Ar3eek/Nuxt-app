<script setup lang="ts">

import { useRoute } from 'vue-router'
import { ref } from "vue"

const mobileOpen = ref(false)

const route = useRoute()

const menu = [
  { name: "Home", path: "/" },
  { name: "Reports", path: "/reports" },
]

const managerMenu = {
  name: "Manager Panel",
  path: "/manager"
}

</script>

<template>
  <header class="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-sm">

    <nav class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">

      <!-- LEFT (desktop menu) -->
      <div class="hidden md:flex items-center gap-6 lg:gap-8 text-gray-700 font-medium text-base lg:text-lg">

        <NuxtLink
            v-for="item in menu"
            :key="item.path"
            :to="item.path"
            class="relative group transition"
        >
          <span
              :class="[
              route.path === item.path ? 'text-red-600' : 'hover:text-red-600'
            ]"
          >
            {{ item.name }}
          </span>

          <span
              class="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full"
              :class="{ 'w-full': route.path === item.path }"
          />
        </NuxtLink>

      </div>

      <!-- MOBILE hamburger -->
      <button
          @click="mobileOpen = !mobileOpen"
          class="md:hidden text-2xl"
      >
        ☰
      </button>

      <!-- LOGO -->
      <NuxtLink
          to="/"
          class="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center"
      >
        <img
            src="/logo23.png"
            alt="Raport System"
            class="h-10 sm:h-12 object-contain transition duration-300 hover:scale-110 hover:drop-shadow-lg"
        />
      </NuxtLink>

      <!-- RIGHT -->
      <div class="hidden md:flex items-center">

        <NuxtLink
            :to="managerMenu.path"
            class="relative px-3 sm:px-4 py-2 rounded-lg border border-gray-200
          hover:border-red-500 hover:text-red-600
          transition duration-300 overflow-hidden group text-sm sm:text-base"
        >
          <span class="relative z-10">
            {{ managerMenu.name }}
          </span>

          <span
              class="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition duration-300"
          />
        </NuxtLink>

      </div>

    </nav>

    <!-- MOBILE MENU OVERLAY -->
    <div
        v-if="mobileOpen"
        class="fixed inset-0 z-40 md:hidden"
    >

      <!-- backdrop -->
      <div
          class="absolute inset-0 bg-black/30"
          @click="mobileOpen = false"
      />

      <!-- menu panel -->
      <div
          class="absolute top-0 left-0 w-full bg-white shadow-lg p-4 animate-slide-down"
      >

        <!-- TOP BAR -->
        <div class="flex items-center justify-between mb-4">

          <span class="font-semibold text-black underline ">
            Menu
          </span>

          <button
              @click="mobileOpen = false"
              class="text-2xl leading-none text-gray-500 hover:text-black transition"
          >
            ✕
          </button>

        </div>

        <!-- MENU -->
        <div class="flex flex-col gap-3 text-gray-700 font-medium">

          <NuxtLink
              v-for="item in menu"
              :key="item.path"
              :to="item.path"
              @click="mobileOpen = false"
              class="py-3 border-b border-gray-100"
              :class="route.path === item.path ? 'text-red-600' : ''"
          >
            {{ item.name }}
          </NuxtLink>

          <NuxtLink
              :to="managerMenu.path"
              @click="mobileOpen = false"
              class="mt-2 py-3 text-center rounded-lg border border-gray-200 hover:border-red-500 hover:text-red-600"
          >
            {{ managerMenu.name }}
          </NuxtLink>

        </div>

      </div>

    </div>

  </header>
</template>