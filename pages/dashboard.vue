<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import {
  ClipboardList,
  BarChart3,
  Megaphone
} from "lucide-vue-next"

const { user } = useAuth()

// 🔹 TYPES
type Task = {
  text: string
  done: boolean
}

type Report = {
  department: string
  tasks: Task[]
}

type Announcement = {
  id: number
  text: string
  department: string
  author: string
  timestamp: number
}

// 🔹 STATE
const reports = ref<Report[]>([])
const announcements = ref<Announcement[]>([])
const loading = ref(true)

// 🔥 LOAD DATA
const loadData = async () => {
  try {
    const [reportsRes, announcementsRes] = await Promise.all([
      $fetch<Report[]>('/api/getReports'),
      $fetch<Announcement[]>('/api/getAnnouncements')
    ])
    reports.value = reportsRes || []
    announcements.value = announcementsRes

  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})

// 🔥 FILTR RAPORTÓW (DZIAŁ)
const departmentReports = computed(() => {

  if (!user.value) return []

  return reports.value.filter(r =>
      r.department.toLowerCase() === user.value.department.toLowerCase()
  )
})

// 📊 STATY
const totalReports = computed(() => departmentReports.value.length)

const taskStats = computed(() => {

  let all = 0
  let done = 0

  departmentReports.value.forEach(report => {
    report.tasks.forEach(task => {
      all++
      if (task.done) done++
    })
  })

  return {
    all,
    done,
    left: all - done
  }
})

// 🔥 FILTR OGŁOSZEŃ
const departmentAnnouncements = computed(() => {

  if (!user.value) return []

  return announcements.value.filter(a =>
      a.department === "all" ||
      a.department.toLowerCase() === user.value.department.toLowerCase()
  )
})

// 📅 FORMAT
const formatDate = (ts:number) => {
  const d = new Date(ts)
  return d.toLocaleDateString('pl-PL') + " • " +
      d.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit'
      })
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <!-- LOADING -->
    <div v-if="loading" class="text-center text-gray-400 py-20">
      Ładowanie...
    </div>

    <div v-else>

      <!-- HEADER -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p class="text-sm text-gray-500">
          👋 Witaj {{ user?.department }}
        </p>
      </div>

      <!-- 📊 STATY -->
      <div class="grid md:grid-cols-3 gap-6 mb-10">

        <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <ClipboardList class="w-6 h-6 text-red-500 mb-2" />
          <p class="text-sm text-gray-500">Raporty</p>
          <p class="text-2xl font-bold">{{ totalReports }}</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <BarChart3 class="w-6 h-6 text-green-500 mb-2" />
          <p class="text-sm text-gray-500">Zadania</p>
          <div>
            <p class="text-2xl font-bold">
              {{ taskStats.left }}
            </p>

            <p class="text-xs text-gray-400 mt-1">
              {{ taskStats.done }}/{{ taskStats.all }} wykonanych
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <Megaphone class="w-6 h-6 text-blue-500 mb-2" />
          <p class="text-sm text-gray-500">Ogłoszenia</p>
          <p class="text-2xl font-bold">
            {{ departmentAnnouncements.length }}
          </p>
        </div>

      </div>

      <!-- 📢 OGŁOSZENIA -->
      <div class="bg-white p-6 rounded-xl shadow">

        <h2 class="text-lg font-semibold text-red-600 mb-4">
          📢 Informacje od kierownika
        </h2>

        <div v-if="departmentAnnouncements.length === 0" class="text-gray-400 text-sm">
          Brak informacji
        </div>

        <div class="space-y-3 max-h-64 overflow-y-auto">

          <div
              v-for="a in departmentAnnouncements"
              :key="a.id"
              class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 hover:bg-red-100 transition"
          >

            <!-- 🔥 HEADER -->
            <div class="flex justify-between items-start mb-2">

              <!-- TEKST -->
              <p class="text-sm text-gray-800">
                {{ a.text }}
              </p>

              <!-- 🔥 BADGE -->
              <span
                  class="text-[10px] px-2 py-1 rounded-full ml-3 whitespace-nowrap"
                            :class="a.department === 'all'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-200 text-gray-600'"
                        >
                {{ a.department === 'all' ? 'Wszyscy' : a.department }}
              </span>

            </div>

            <!-- META -->
            <div class="text-xs text-gray-500 flex justify-between">
              <span>{{ a.author }}</span>
              <span>{{ formatDate(a.timestamp) }}</span>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>