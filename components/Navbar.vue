<script setup lang="ts">

import { useRoute } from 'vue-router'

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

    <nav class="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

      <!-- LEFT (menu) -->
      <div class="flex items-center gap-8 text-gray-700 font-medium text-lg">

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

          <!-- underline animation -->
          <span
              class="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full"
              :class="{ 'w-full': route.path === item.path }"
          />
        </NuxtLink>

      </div>


      <!-- CENTER (logo - większe i ważniejsze) -->
      <NuxtLink
          to="/"
          class="absolute left-1/2 -translate-x-1/2 flex items-center"
      >
        <img
            src="/logo23.png"
            alt="Raport System"
            class="h-12 object-contain
          transition duration-300
          hover:scale-110 hover:drop-shadow-lg"
        />
      </NuxtLink>


      <!-- RIGHT -->
      <div class="flex items-center">

        <NuxtLink
            :to="managerMenu.path"
            class="relative px-4 py-2 rounded-lg border border-gray-200
          hover:border-red-500 hover:text-red-600
          transition duration-300 overflow-hidden group"
        >
          <span class="relative z-10">
            {{ managerMenu.name }}
          </span>

          <!-- subtle hover background -->
          <span
              class="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition duration-300"
          />
        </NuxtLink>

      </div>

    </nav>

  </header>

</template>