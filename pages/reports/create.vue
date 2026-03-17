```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

const reports = useState<Report[]>('reports', () => [])

const goBack = () => navigateTo('/reports/list')

/* pola raportu */

const date = ref(new Date().toISOString().split('T')[0])
const shift = ref('1')
const description = ref('')
const department = ref('')

/* użytkownicy */

const users = ref([
  'Paweł Kozak',
  'Arkadiusz Korzeniowski',
  'Łukasz Stasak'
])

const selectedUser = ref('')
const newUser = ref('')

const shifts = ['1','2','3']

/* zadania */

const tasks = ref<Task[]>([])
const newTask = ref('')

onMounted(() => {

  const dep = localStorage.getItem('department')

  if(!dep){
    navigateTo('/reports')
    return
  }

  department.value = dep

})

const addTask = () => {

  const text = newTask.value.trim()
  if (!text) return

  tasks.value.push({
    text,
    done: false
  })

  newTask.value = ''

}

const removeTask = (index:number) => {
  tasks.value.splice(index,1)
}

const addUser = () => {

  const name = newUser.value.trim()
  if (!name) return

  users.value.push(name)
  selectedUser.value = name
  newUser.value = ''

}

const resetForm = () => {

  date.value = new Date().toISOString().split('T')[0]
  shift.value = '1'
  description.value = ''
  selectedUser.value = ''
  tasks.value = []

}

const addReport = () => {

  if (!selectedUser.value) {
    alert('Wybierz autora raportu')
    return
  }

  if (tasks.value.length === 0) {
    alert('Dodaj przynajmniej jedno zadanie')
    return
  }

  const newReport: Report = {
    date: date.value,
    shift: shift.value,
    description: description.value.trim(),
    department: department.value,
    user: selectedUser.value,
    tasks: tasks.value.map(t => ({ ...t }))
  }

  reports.value.push(newReport)

  resetForm()

  navigateTo('/reports/list')

}
</script>

<template>

  <div class="min-h-screen bg-gray-100 flex justify-center items-center p-4">

    <div class="bg-white p-10 rounded-xl shadow w-full max-w-3xl">

      <button
          @click="goBack"
          class="text-gray-500 hover:text-red-600 mb-4"
      >
        ← Wróć
      </button>

      <h1 class="text-3xl font-bold mb-2">
        Dodaj raport
      </h1>

      <p class="text-sm text-gray-500 mb-6">
        Dział: <b>{{ department }}</b>
      </p>


      <!-- data -->

      <input
          type="date"
          v-model="date"
          class="border p-3 rounded w-full mb-4"
      />


      <!-- zmiana -->

      <select v-model="shift" class="border p-3 rounded w-full mb-4">

        <option v-for="s in shifts" :key="s">
          Zmiana {{ s }}
        </option>

      </select>


      <!-- autor -->

      <select v-model="selectedUser" class="border p-3 rounded w-full mb-4">

        <option disabled value="">
          Wybierz autora
        </option>

        <option v-for="u in users" :key="u">
          {{ u }}
        </option>

        <option value="new">
          + Dodaj nowego użytkownika
        </option>

      </select>


      <div v-if="selectedUser === 'new'" class="mb-4">

        <input
            v-model="newUser"
            placeholder="Nowy użytkownik"
            class="border p-3 rounded w-full mb-2"
        />

        <button
            @click="addUser"
            class="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Dodaj użytkownika
        </button>

      </div>


      <!-- zadania -->

      <h2 class="font-semibold mb-2">
        Lista zadań
      </h2>

      <div
          v-for="(task,index) in tasks"
          :key="task.text + index"
          class="border rounded p-3 mb-2"
      >

        <div class="flex items-center gap-3">

          <input type="checkbox" v-model="task.done" />

          <span class="flex-1">
{{ task.text }}
</span>

          <button
              @click="removeTask(index)"
              class="text-red-500 text-sm"
          >
            Usuń
          </button>

        </div>

      </div>


      <div class="flex gap-2 mb-6">

        <input
            v-model="newTask"
            placeholder="Dodaj nowe zadanie"
            class="border p-2 rounded w-full"
        />

        <button
            @click="addTask"
            class="bg-blue-600 text-white px-4 rounded"
        >
          Dodaj
        </button>

      </div>


      <!-- opis -->

      <textarea
          v-model="description"
          placeholder="Opis raportu"
          class="border p-3 rounded w-full mb-6 min-h-[120px]"
      ></textarea>


      <button
          @click="addReport"
          class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
      >
        Zapisz raport
      </button>

    </div>

  </div>

</template>
```
