<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

type Task = {
  text: string
  done: boolean
}

type Report = {
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

const deleteReport = (report: Report) => {

  reports.value = reports.value.filter(r => r !== report)

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

  <div class="min-h-screen bg-gray-100 p-10">

    <div class="max-w-5xl mx-auto">

      <div class="flex justify-between items-center mb-8">

        <h1 class="text-3xl font-bold">
          Raporty działu: {{ department }}
        </h1>

        <button
            @click="logout"
            class="text-red-600"
        >
          Wyloguj
        </button>

      </div>

      <NuxtLink
          to="/reports/create"
          class="bg-red-600 text-white px-4 py-2 rounded"
      >
        + Dodaj raport
      </NuxtLink>

      <div
          v-for="report in departmentReports"
          :key="report.date + report.user + report.shift"
          class="bg-white p-6 rounded-xl shadow mt-6"
      >

        <h2 class="font-semibold text-lg mb-2">
          {{ report.date }} • Zmiana {{ report.shift }}
        </h2>

        <p class="text-sm text-gray-500 mb-4">
          Autor: {{ report.user }}
        </p>

        <!-- OPIS RAPORTU -->

        <div
            class="report-content mb-4"
            v-html="report.description"
        ></div>

        <h3 class="font-semibold mb-2">
          Zadania
        </h3>

        <div
            v-for="task in report.tasks"
            :key="task.text"
            class="border-b py-3"
        >

          <div class="flex items-start gap-3">

            <input
                type="checkbox"
                v-model="task.done"
                class="mt-1"
            />

            <ul class="list-disc pl-5 flex-1">

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

        <button
            @click="deleteReport(report)"
            class="text-red-600 text-sm mt-4"
        >
          Usuń raport
        </button>

      </div>

    </div>

  </div>

</template>