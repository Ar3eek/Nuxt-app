<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'

const { user, logout } = useAuth()

const reports = ref<any[]>([])
const search = ref("")
const openStatusId = ref<number | null>(null)

// 🔥 LOAD REPORTS
const loadReports = async () => {
  try {
    const data = await $fetch('/api/getReports', {
      cache: 'no-store'
    })

    reports.value = data.map((r:any) => ({
      ...r,
      status: r.status || 'new',
      tasks: typeof r.tasks === 'string'
          ? JSON.parse(r.tasks)
          : r.tasks || []
    }))

  } catch (e) {
    console.error('LOAD ERROR:', e)
  }
}

// 🔐 INIT
const handleClickOutside = () => {
  openStatusId.value = null
}

onMounted(async () => {

  if (!user.value) {
    return navigateTo('/')
  }

  if (user.value.role === 'manager') {
    return navigateTo('/manager')
  }

  await loadReports()
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

// 🔍 FILTER
const departmentReports = computed(() => {

  if (!user.value) return []

  let data = reports.value

  data = data.filter(r =>
      r.department?.toLowerCase() === user.value.department?.toLowerCase()
  )

  if (search.value.length >= 2) {
    const s = search.value.toLowerCase()

    data = data.filter(r =>
        r.user?.toLowerCase().includes(s) ||
        r.description?.toLowerCase().includes(s)
    )
  }

  return data
})

// ❌ DELETE
const deleteReport = async (report:any) => {
  try {
    await $fetch('/api/deleteReport', {
      method: 'POST',
      body: { id: report.id }
    })

    await loadReports()
  } catch (e) {
    console.error('DELETE ERROR:', e)
  }
}

// 🔄 STATUS
const updateStatus = async (report:any) => {
  try {
    await $fetch('/api/updateStatus', {
      method: 'POST',
      body: {
        id: report.id,
        status: report.status
      }
    })

    await loadReports()
  } catch (e) {
    console.error('STATUS ERROR:', e)
  }
}

// ✅ TASK TOGGLE
const toggleTask = async (report:any, index:number) => {

  if (!report.tasks || !report.tasks[index]) {
    console.error('TASK ERROR:', report)
    return
  }

  const task = report.tasks[index]

  try {
    await $fetch('/api/updateTask', {
      method: 'POST',
      body: {
        reportId: report.id,
        taskIndex: index,
        done: task.done
      }
    })

    await loadReports()

  } catch (e) {
    console.error('TASK UPDATE ERROR:', e)
  }
}

// 🔥 LOGOUT
const handleLogout = async () => {
  await logout()
  await navigateTo('/')
}

// 🎨 STATUS STYLE
const getStatusMeta = (status:string) => {
  return status === 'done'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

    <div class="max-w-6xl mx-auto px-4 py-8">

      <!-- HEADER -->
      <div class="sticky top-0 z-10 backdrop-blur bg-white/70 rounded-xl px-6 py-4 mb-6 shadow-sm flex justify-between items-center">

        <h1 class="text-2xl font-bold">
          Raporty:
          <span class="text-red-600">
            {{ user?.department }}
          </span>
        </h1>

        <button
            @click="handleLogout"
            class="text-sm text-red-500 hover:text-red-700"
        >
          Wyloguj
        </button>

      </div>

      <!-- SEARCH -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">

        <input
            v-model="search"
            placeholder="🔍 Szukaj (min. 2 znaki)..."
            class="flex-1 p-3 rounded-xl border focus:ring-2 focus:ring-red-500"
        />

        <NuxtLink
            to="/reports/create"
            class="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl text-center"
        >
          + Dodaj raport
        </NuxtLink>

      </div>

      <!-- LIST -->
      <div class="space-y-6">

        <div
            v-for="report in departmentReports"
            :key="report.id"
            class="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
        >

          <!-- TOP -->
          <div class="flex justify-between items-start mb-4">

            <div>
              <h2 class="font-semibold text-lg">
                {{ report.date }} • Zmiana {{ report.shift }}
              </h2>

              <p class="text-sm text-gray-500">
                {{ report.user }}
              </p>
            </div>

            <!-- STATUS -->
            <div class="relative">

              <div
                  @click.stop="openStatusId = openStatusId === report.id ? null : report.id"
                  class="cursor-pointer px-3 py-1 rounded-lg text-xs font-semibold"
                  :class="getStatusMeta(report.status)"
              >
                {{ report.status === 'done' ? '🟢 Zrobiony' : '🔴 Nowy' }}
              </div>

              <div
                  v-if="openStatusId === report.id"
                  class="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-20"
              >

                <div
                    @click="() => {
                    report.status = 'new'
                    updateStatus(report)
                    openStatusId = null
                  }"
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  🔴 Nowy
                </div>

                <div
                    @click="() => {
                    report.status = 'done'
                    updateStatus(report)
                    openStatusId = null
                  }"
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  🟢 Zrobiony
                </div>

              </div>

            </div>

          </div>

          <!-- OPIS -->
          <div
              class="text-gray-700 mb-5 text-sm bg-gray-50 p-4 rounded"
              v-html="report.description"
          ></div>

          <!-- TASKI -->
          <div class="text-sm text-gray-500 mb-2">
            Zadania:
          </div>

          <div class="space-y-2">

            <div
                v-for="(task, index) in report.tasks || []"
                :key="task.text"
                class="flex items-center gap-3"
            >

              <input
                  type="checkbox"
                  v-model="task.done"
                  @change="toggleTask(report, index)"
                  class="accent-red-600"
              />

              <span :class="task.done ? 'line-through text-gray-400' : ''">
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
                class="text-sm text-red-500 hover:text-red-700"
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