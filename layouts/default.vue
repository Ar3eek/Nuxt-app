<template>
  <div>

    <!-- 🔴 JEŚLI NIE ZALOGOWANY → NORMALNA STRONA -->
    <div v-if="!user" class="flex flex-col min-h-screen">

      <Navbar />

      <main class="flex-1">
        <slot />
      </main>

      <AppFooter />

    </div>

    <!-- 🔵 JEŚLI ZALOGOWANY → APP LAYOUT -->
    <div v-else class="min-h-screen flex bg-gray-100">

      <!-- SIDEBAR -->
      <aside class="w-64 bg-white border-r shadow-sm hidden md:flex flex-col">

        <NuxtLink to="/dashboard" class=" border-b flex flex-col items-center p-2 bg-gray-100">

          <span class="text-lg font-semibold text-gray-800">
            {{ currentTime }}
          </span>

                  <span class="text-xs text-gray-500">
            {{ currentDate }}
          </span>

        </NuxtLink>

        <nav class="flex-1 p-4 space-y-2">

          <NuxtLink
              to="/dashboard"
              :class="$route.path === '/dashboard'
              ? 'bg-gray-100 font-medium'
              : 'hover:bg-gray-100'"
              class="block p-3 rounded-lg"
          >
            📊 Dashboard
          </NuxtLink>

          <NuxtLink
              v-if="user?.role !== 'manager'"
              to="/reports"
              :class="$route.path === '/reports'
              ? 'bg-gray-100 font-medium'
              : 'hover:bg-gray-100'"
              class="block p-3 rounded-lg"
          >
            📋 Raporty
          </NuxtLink>

          <NuxtLink
              v-if="user?.role === 'manager'"
              to="/manager"
              class="block p-3 rounded-lg text-red-600 hover:bg-red-50"
          >
            👑 Manager
          </NuxtLink>

        </nav>

        <!-- USER -->
        <div class="p-4 border-t text-sm">
          <p class="font-medium">{{ user?.department }}</p>
          <p class="text-xs text-gray-400">{{ user?.role }}</p>
        </div>

      </aside>

      <!-- MAIN -->
      <div class="flex-1 flex flex-col">

        <Navbar />

        <main class="flex-1 p-6">
          <slot />
        </main>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

const currentTime = ref("")
const currentDate = ref("")

let interval: any

const updateTime = () => {
  const now = new Date()

  currentTime.value = now.toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  currentDate.value = now.toLocaleDateString('pl-PL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })
}

onMounted(() => {
  updateTime()
  interval = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
const { user } = useAuth()
</script>