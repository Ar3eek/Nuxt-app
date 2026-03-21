<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

type Task = {
  text: string
  done: boolean
}

type Report = {
  id: number
  date: string
  shift: string
  description: string
  department: string
  user: string
  status: string
  tasks: Task[]
}

const reports = ref<Report[]>([])
const department = ref('')
const search = ref('')

/* 🔥 LOAD */
const loadReports = async () => {
  try {
    const data = await $fetch<Report[]>('/api/getReports')

    // 🔴 domyślnie "new"
    reports.value = data.map(r => ({
      ...r,
      status: r.status || 'new'
    }))

  } catch (error) {
    console.error(error)
  }
}

/* 🔥 DELETE */
const deleteReport = async (report: Report) => {
  await $fetch('/api/deleteReport', {
    method: 'POST',
    body: { id: report.id }
  })

  reports.value = reports.value.filter(r => r.id !== report.id)
}

/* 🔥 UPDATE STATUS */
const updateStatus = async (report: Report) => {
  try {
    await $fetch('/api/updateStatus', {
      method: 'POST',
      body: {
        id: report.id,
        status: report.status
      }
    })
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  const dep = localStorage.getItem('department')

  if (!dep) {
    navigateTo('/reports')
    return
  }

  department.value = dep
  await loadReports()
})

/* 🔥 FILTER */
const departmentReports = computed(() => {
  let filtered = reports.value.filter(
      r => r.department === department.value
  )

  if (search.value.length >= 2) {
    const s = search.value.toLowerCase()

    filtered = filtered.filter(r =>
        r.user.toLowerCase().includes(s) ||
        r.description.toLowerCase().includes(s)
    )
  }

  return filtered
})

const logout = () => {
  localStorage.removeItem('department')
  navigateTo('/')
}

/* 🔥 NORMALIZACJA */
const normalizeStatus = (status: string) => {
  const s = status?.trim().toLowerCase()

  if (['new', 'nowy'].includes(s)) return 'new'
  if (['done', 'zrobiony'].includes(s)) return 'done'
  if (['failed', 'zakończony', 'zakonczony'].includes(s)) return 'failed'

  return 'new'
}

/* 🔥 META */
const getStatusMeta = (status: string) => {
  const s = normalizeStatus(status)

  switch (s) {
    case 'new':
      return {
        class: 'bg-red-100 text-red-700',
        icon: '🔴'
      }
    case 'done':
      return {
        class: 'bg-green-100 text-green-700',
        icon: '🟢'
      }
    default:
      return {
        class: 'bg-red-100 text-red-700',
        icon: '🔴'
      }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
    <div class="max-w-6xl mx-auto px-4 py-8">

      <!-- HEADER -->
      <div class="sticky top-0 z-10 backdrop-blur bg-white/70 rounded-xl px-6 py-4 mb-6 shadow-sm flex justify-between items-center">
        <h1 class="text-2xl font-bold tracking-tight">
          Raporty:
          <span class="text-red-600">{{ department }}</span>
        </h1>

        <button
            @click="logout"
            class="text-sm text-red-500 hover:text-red-700 transition"
        >
          Wyloguj
        </button>
      </div>

      <!-- SEARCH -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <input
            v-model="search"
            placeholder="🔍 Szukaj (min. 2 znaki)..."
            class="flex-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
        />

        <NuxtLink
            to="/reports/create"
            class="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl shadow transition font-medium text-center"
        >
          + Dodaj raport
        </NuxtLink>
      </div>

      <!-- LIST -->
      <div class="space-y-6">

        <div
            v-for="report in departmentReports"
            :key="report.id"
            class="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition p-6 border border-gray-100"
        >

          <!-- TOP -->
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="font-semibold text-lg">
                {{ report.date }} • {{ report.shift }}
              </h2>

              <p class="text-sm text-gray-500 mt-1">
                {{ report.user }}
              </p>
            </div>

            <!-- 🔥 STATUS SELECT -->
            <select
                v-model="report.status"
                @change="updateStatus(report)"
                class="  p-2 text-xs rounded-lg font-semibold shadow-sm cursor-pointer outline-none"
                :class="getStatusMeta(report.status).class"
            >
              <option value="new" disabled>🔴 Nowy</option>
              <option value="done">🟢 Zrobiony</option>
            </select>
          </div>

          <!-- DESC -->
          <div
              class="text-gray-700 mb-5 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg"
              v-html="report.description"
          ></div>

          <!-- TASKS -->
          <div class="text-sm text-gray-500 mb-2">
            Zostało do zrobienia
          </div>

          <div class="space-y-3">
            <div
                v-for="task in report.tasks"
                :key="task.text"
                class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition"
            >
              <input
                  type="checkbox"
                  v-model="task.done"
                  class="w-4 h-4 accent-red-600 cursor-pointer"
              />

              <span
                  :class="task.done
                  ? 'line-through text-gray-400'
                  : 'text-gray-800'"
                  class="text-sm"
              >
                {{ task.text }}
              </span>
            </div>
          </div>

          <!-- ACTION -->
          <div class="flex justify-between items-center mt-6">
            <span class="text-xs text-gray-400">
              ID: {{ report.id }}
            </span>

            <button
                @click="deleteReport(report)"
                class="text-sm text-red-500 hover:text-red-700 transition"
            >
              Usuń
            </button>
          </div>

        </div>

        <!-- EMPTY -->
        <div
            v-if="departmentReports.length === 0"
            class="text-center py-16 text-gray-400"
        >
          Brak raportów 😴
        </div>

      </div>
    </div>
  </div>
</template>