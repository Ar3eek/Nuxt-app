<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"
import {
  ClipboardList,
  Settings,
  Megaphone,
  CheckCircle,
  Users
} from "lucide-vue-next"

const { user } = useAuth()

type Announcement = {
  id: number
  text: string
  timestamp: number
  author: string
  department: string
}

const announcements = ref<Announcement[]>([])

const loadAnnouncements = async () => {
  try {
    announcements.value = await $fetch("/api/getAnnouncements")
  } catch (err) {
    console.error("Błąd ogłoszeń:", err)
  }
}

// 🔥 LEPSZY REDIRECT (bez flickera)
watch(user, (val) => {
  if (val) navigateTo('/dashboard')
}, { immediate: true })

onMounted(() => {
  loadAnnouncements()
})

const filteredAnnouncements = computed(() => {
  if (!user.value?.department) return []

  return announcements.value.filter(a =>
      a.department === "all" ||
      a.department.toLowerCase() === user.value.department.toLowerCase()
  )
})

const goToReports = () => navigateTo('/reports')
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-20 px-6">

    <div class="max-w-6xl mx-auto space-y-16">

      <!-- 🔴 HERO -->
      <section class="text-center">

        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          System Raportów
        </h1>

        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Platforma do zarządzania raportami, zadaniami i komunikacją w zespole.
        </p>

        <p class="text-sm text-gray-500 max-w-xl mx-auto mb-10">
          Proste raportowanie pracy, kontrola zadań i szybki dostęp do informacji
          dla całego zespołu.
        </p>

        <button
            @click="goToReports"
            class="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition hover:scale-[1.02]"
        >
          Rozpocznij pracę
        </button>

      </section>

      <!-- 🧩 FUNKCJE -->
      <section class="grid md:grid-cols-3 gap-6">

        <div class="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <ClipboardList class="w-10 h-10 text-red-500 mb-3" />
          <h3 class="font-semibold text-gray-800 mb-2">Raporty</h3>
          <p class="text-sm text-gray-600">
            Dodawaj i przeglądaj raporty z wykonanej pracy w uporządkowany sposób.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <CheckCircle class="w-10 h-10 text-green-500 mb-3" />
          <h3 class="font-semibold text-gray-800 mb-2">Zadania</h3>
          <p class="text-sm text-gray-600">
            Monitoruj postęp i kontroluj realizację zadań w czasie rzeczywistym.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <Megaphone class="w-10 h-10 text-blue-500 mb-3" />
          <h3 class="font-semibold text-gray-800 mb-2">Ogłoszenia</h3>
          <p class="text-sm text-gray-600">
            Otrzymuj ważne komunikaty dopasowane do Twojego działu.
          </p>
        </div>

      </section>

      <!-- ⚙️ JAK TO DZIAŁA -->
      <section class="bg-white rounded-2xl shadow p-8">

        <div class="flex items-center gap-3 mb-6">
          <Settings class="w-6 h-6 text-gray-600" />
          <h2 class="text-xl font-semibold text-gray-800">
            Jak działa system?
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6 text-sm text-gray-600">

          <div>
            <span class="font-semibold text-gray-800">1. Dodaj raport</span><br />
            Po zakończeniu pracy uzupełnij raport z wykonanych zadań.
          </div>

          <div>
            <span class="font-semibold text-gray-800">2. Zarządzaj zadaniami</span><br />
            Śledź postęp i oznaczaj zadania jako wykonane.
          </div>

          <div>
            <span class="font-semibold text-gray-800">3. Bądź na bieżąco</span><br />
            Sprawdzaj ogłoszenia i komunikaty zespołu.
          </div>

        </div>

      </section>

      <!-- 👥 O SYSTEMIE -->
      <section class="bg-white rounded-2xl shadow p-8">

        <div class="flex items-center gap-3 mb-4">
          <Users class="w-6 h-6 text-gray-600" />
          <h2 class="text-xl font-semibold text-gray-800">
            O systemie
          </h2>
        </div>

        <p class="text-sm text-gray-600 leading-relaxed">
          System Raportów został zaprojektowany, aby uprościć codzienną pracę zespołu.
          Pozwala na szybkie raportowanie działań, lepszą organizację zadań oraz
          skuteczną komunikację między pracownikami i kierownictwem.
        </p>

      </section>

    </div>

  </main>
</template>