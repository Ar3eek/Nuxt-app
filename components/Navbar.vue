<script setup lang="ts">

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

  <header class="sticky top-0 z-50">

    <nav
        class="flex items-center justify-between px-12 py-4
    bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >

      <!-- Logo -->

      <NuxtLink to="/" class="flex items-center gap-4">

        <img
            src="/logo.png"
            alt="logo"
            class="w-[180px] object-contain"
        />

      </NuxtLink>


      <!-- Menu -->

      <div class="flex items-center gap-10 text-gray-700 font-medium text-lg">

        <NuxtLink
            v-for="item in menu"
            :key="item.path"
            :to="item.path"
            class="hover:text-red-600 transition"
        >
          {{ item.name }}
        </NuxtLink>

        <!-- Panel kierownika -->

        <NuxtLink
            :to="managerMenu.path"
            class="text-gray-600 hover:text-red-600 transition flex items-center gap-2"
        >
          {{ managerMenu.name }}
        </NuxtLink>

      </div>
    </nav>

  </header>

</template>