<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from "vue"
import { useAuth } from '~/composables/useAuth'

const { user, login, logout } = useAuth()
const route = useRoute()

const selectedDepartment = ref("")
const passwordInput = ref("")
const errorMsg = ref("")
const mobileOpen = ref(false)

// MENU (ROLE BASED)
const menu = computed(() => {

  if (user.value?.role === 'manager') {
    return [
      { name: "Manager", path: "/manager" }
    ]
  }

  if (user.value) {
    return [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Raporty", path: "/reports" }
    ]
  }

  return [
    { name: "Strona główna", path: "/" }
  ]
})

// LOGIN
const handleLogin = async () => {

  errorMsg.value = ""

  if (!selectedDepartment.value || !passwordInput.value) {
    errorMsg.value = "Uzupełnij dane"
    return
  }

  const ok = await login(selectedDepartment.value, passwordInput.value)

  if (!ok) {
    errorMsg.value = "Złe hasło"
    return
  }

  passwordInput.value = ""

  if (user.value?.role === 'manager') {
    await navigateTo('/manager')
  } else {
    await navigateTo('/dashboard')
  }
}

// LOGOUT
const handleLogout = async () => {
  await logout()
  await navigateTo('/', { replace: true })
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b shadow-sm">

    <nav class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

      <!-- LEFT MENU -->
      <div class="hidden md:flex gap-6">
      </div>

      <!-- MOBILE BUTTON -->
      <button @click="mobileOpen = !mobileOpen" class="md:hidden text-2xl">
        ☰
      </button>

      <!-- LOGO -->
      <NuxtLink to="/" class="md:absolute ">
        <img src="/logo23.png" class="h-10 hover:scale-105 transition" />
      </NuxtLink>

      <!-- RIGHT -->
      <div class="hidden md:flex items-center gap-4">

        <!-- LOGIN -->
        <div v-if="!user" class="flex flex-col gap-1">

          <div class="flex items-center gap-2">

            <select v-model="selectedDepartment" class="border px-2 py-1 rounded text-sm">
              <option disabled value="">Dział</option>
              <option value="Magazyn">Magazyn</option>
              <option value="Dostawy">Dostawy</option>
              <option value="Spedycja">Spedycja</option>
              <option value="Kierownik">Kierownik</option>
            </select>

            <input
                v-model="passwordInput"
                type="password"
                placeholder="hasło"
                class="border px-2 py-1 rounded w-24 text-sm"
                @keyup.enter="handleLogin"
            />

            <button
                @click="handleLogin"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
            >
              Wejdź
            </button>

          </div>

          <!-- ERROR -->
          <div v-if="errorMsg" class="text-xs text-red-500 ml-1">
            {{ errorMsg }}
          </div>

        </div>

        <!-- USER -->
        <div v-else class="flex items-center gap-3">

          <div class="text-sm text-right">
            <p class="font-medium text-gray-700">
              {{ user.department }}
            </p>
            <p class="text-xs text-gray-400">
              {{ user.role }}
            </p>
          </div>

          <div class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
            👤
          </div>

          <button
              @click="handleLogout"
              class="text-red-500 hover:underline text-sm"
          >
            Wyloguj
          </button>

        </div>

      </div>

    </nav>

    <!-- MOBILE MENU -->
    <div v-if="mobileOpen" class="md:hidden px-4 pb-4">

      <NuxtLink
          v-for="item in menu"
          :key="item.path"
          :to="item.path"
          class="block py-2 border-b"
          @click="mobileOpen = false"
      >
        {{ item.name }}
      </NuxtLink>

      <!-- 👇 LOGIN MOBILE -->
      <div v-if="!user" class="mt-4 flex flex-col gap-2">

        <select v-model="selectedDepartment" class="border px-2 py-1 rounded text-sm">
          <option disabled value="">Dział</option>
          <option value="Magazyn">Magazyn</option>
          <option value="Dostawy">Dostawy</option>
          <option value="Spedycja">Spedycja</option>
          <option value="Kierownik">Kierownik</option>
        </select>

        <input
            v-model="passwordInput"
            type="password"
            placeholder="hasło"
            class="border px-2 py-1 rounded text-sm"
        />

        <button
            @click="handleLogin"
            class="bg-red-500 text-white px-3 py-2 rounded"
        >
          Wejdź
        </button>

        <div v-if="errorMsg" class="text-xs text-red-500">
          {{ errorMsg }}
        </div>

      </div>

      <!-- 👇 USER MOBILE -->
      <div v-else class="mt-4 flex flex-col gap-2">

        <div class="text-sm">
          {{ user.department }} ({{ user.role }})
        </div>

        <button
            @click="handleLogout"
            class="text-red-500 text-sm"
        >
          Wyloguj
        </button>

      </div>

    </div>

  </header>
</template>