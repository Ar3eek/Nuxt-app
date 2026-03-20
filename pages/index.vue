<script setup lang="ts">
import { ref, onMounted, computed } from "vue"

type Task = {
  text: string
  done: boolean
  comment: string
}

type Report = {
  date: string
  shift: string
  description: string
  department: string
  user: string
  tasks: Task[]
}

// 🔥 DODAJ ID
type Announcement = {
  id: number
  text: string
  timestamp: number
  author: string
}

const reports = useState<Report[]>('reports', () => [])

const announcements = ref<Announcement[]>([])

// 🔥 LOAD
const loadAnnouncements = async () => {
  try {
    announcements.value = await $fetch("/api/getAnnouncements")
  } catch (err) {
    console.error("Błąd pobierania ogłoszeń:", err)
  }
}

onMounted(() => {
  loadAnnouncements()

  // 🔥 AUTO REFRESH co 5 sekund
  setInterval(loadAnnouncements, 5000)
})

const goToMenu = () => navigateTo('/reports')

// 📅 FORMAT
const formatDate = (timestamp:number) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('pl-PL') + " • " +
      date.toLocaleTimeString('pl-PL',{
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
      })
}

// 📋 TASKI
const todoTasks = computed(() => {

  const tasks: { text: string; department: string; date: string }[] = []

  reports.value.forEach(report => {
    report.tasks.forEach(task => {
      if (!task.done) {
        tasks.push({
          text: task.text,
          department: report.department,
          date: report.date
        })
      }
    })
  })

  return tasks
})
</script>


<template>

  <main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">

    <!-- HERO -->

    <section class="max-w-6xl mx-auto px-8 py-20 text-center">

      <h1 class="text-5xl font-bold mb-6 text-gray-800">
        System Raportów
      </h1>

      <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        Platforma do raportowania pracy zespołu. Sprawdzaj zadania,
        komunikuj się z kolegami i monitoruj postęp pracy.
      </p>

      <button
          @click="goToMenu"
          class="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-lg"
      >
        Przejdź do raportów
      </button>

    </section>


    <!-- WAŻNE INFORMACJE -->

    <section class="max-w-6xl mx-auto px-8 mb-16">

      <h2 class="text-2xl font-sans mb-6 text-red-700">
        ⚠ Ważne informacje
      </h2>

      <div class="space-y-4">

        <div
            v-for="(item,index) in announcements"
            :key="index"
            class="bg-red-50 border-l-4 border-red-600 p-5 rounded shadow"
        >

          <p class="text-gray-800 font-medium mb-2">
            {{ item.text }}
          </p>

          <div class="text-sm text-gray-500">
            {{ formatDate(item.timestamp) }} • {{ item.author }}
          </div>

        </div>

      </div>

    </section>


    <!-- OGŁOSZENIA ZESPOŁU -->

    <section class="max-w-6xl mx-auto px-8 mb-16">

      <h2 class="text-2xl font-sans mb-6">
        Ogłoszenia zespołu
      </h2>

      <div class="bg-white p-6 rounded-xl shadow">

        <p class="text-gray-700">
          Pamiętajcie o uzupełnianiu raportów po każdej zmianie.
          Jeśli pojawią się problemy lub opóźnienia – wpisujcie je w komentarzach.
        </p>

      </div>

    </section>


    <!-- FUNKCJE -->

    <section class="max-w-6xl mx-auto px-8 pb-20">

      <h2 class="text-2xl font-bold mb-6 text-center">
        Funkcje systemu
      </h2>

      <div class="grid md:grid-cols-3 gap-8">

        <div class="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
          <h2 class="text-xl font-semibold mb-3 text-gray-800">
            Tworzenie raportów
          </h2>
          <p class="text-gray-600">
            Szybko twórz raporty z wykonanych zadań
            i przekazuj informacje kolegom z zespołu.
          </p>
        </div>

        <div class="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
          <h2 class="text-xl font-semibold mb-3 text-gray-800">
            Lista zadań
          </h2>
          <p class="text-gray-600">
            Każdy raport zawiera checklistę zadań,
            które można oznaczyć jako wykonane.
          </p>
        </div>

        <div class="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
          <h2 class="text-xl font-semibold mb-3 text-gray-800">
            Komunikacja zespołu
          </h2>
          <p class="text-gray-600">
            Dodawaj komentarze i informacje,
            aby inni pracownicy wiedzieli co zostało wykonane.
          </p>
        </div>

      </div>

    </section>

  </main>

</template>