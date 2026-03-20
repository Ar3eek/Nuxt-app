<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

type Task = {
  text: string
  done: boolean
}

type Report = {
  id: number // 🔥 DODAJ
  date: string
  shift: string
  description: string
  department: string
  user: string
  tasks: Task[]
}

const reports = ref<Report[]>([])
const department = ref('')

const loadReports = async () => {

  try {

    const data = await $fetch<Report[]>('/api/getReports')

    reports.value = data

  } catch (error) {

    console.error('Błąd pobierania raportów', error)

  }

}

const deleteReport = async (report: Report) => {
  try {
    await $fetch('/api/deleteReport', {
      method: 'POST',
      body: { id: report.id }
    })

    reports.value = reports.value.filter(r => r.id !== report.id)

  } catch (error) {
    console.error('Błąd usuwania raportu', error)
  }
}

onMounted(async () => {

  const dep = localStorage.getItem('department')

  if(!dep){
    navigateTo('/reports')
    return
  }

  department.value = dep

  await loadReports()

})

const departmentReports = computed(() => {

  return reports.value.filter(
      r => r.department === department.value
  )

})

const logout = () => {

  localStorage.removeItem('department')

  navigateTo('/')

}
</script>
<template>
  <div class="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

    <div class="max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

        <h1 class="text-2xl sm:text-3xl font-bold">
          Raporty działu:
          <span class="text-red-600">{{ department }}</span>
        </h1>

        <button
            @click="logout"
            class="text-red-600 hover:text-red-700 text-sm sm:text-base"
        >
          Wyloguj
        </button>

      </div>

      <!-- ADD BUTTON -->
      <div class="mb-6">
        <NuxtLink
            to="/reports/create"
            class="inline-block bg-red-600 hover:bg-red-700 transition text-white px-5 py-2.5 rounded-lg text-sm sm:text-base font-medium"
        >
          + Dodaj raport
        </NuxtLink>
      </div>

      <!-- REPORTS -->
      <div class="space-y-6">

        <div
            v-for="report in departmentReports"
            :key="report.id"
            class="bg-white p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition"
        >

          <!-- TOP -->
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">

            <h2 class="font-semibold text-base sm:text-lg">
              {{ report.date }} • Zmiana {{ report.shift }}
            </h2>

            <span class="text-xs sm:text-sm text-gray-500">
              {{ report.user }}
            </span>

          </div>

          <!-- DESCRIPTION -->
          <div
              class="report-content mb-5 text-sm sm:text-base text-gray-700"
              v-html="report.description"
          ></div>

          <!-- TASKS -->
          <h3 class="font-semibold mb-2 text-sm sm:text-base">
            Zadania
          </h3>

          <div class="divide-y">

            <div
                v-for="task in report.tasks"
                :key="task.text"
                class="py-3"
            >

              <div class="flex items-start gap-3">

                <input
                    type="checkbox"
                    v-model="task.done"
                    class="mt-1 accent-red-600"
                />

                <ul class="list-disc pl-5 flex-1 text-sm sm:text-base">

                  <li
                      v-for="line in task.text.split('\n')"
                      :key="line"
                      :class="task.done ? 'line-through text-gray-400' : ''"
                  >
                    {{ line }}
                  </li>

                </ul>

              </div>

            </div>

          </div>

          <!-- ACTIONS -->
          <div class="flex justify-end mt-4">

            <button
                @click="deleteReport(report)"
                class="text-red-600 hover:text-red-700 text-sm"
            >
              Usuń raport
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>