<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { user } = useAuth()

// 📅 podstawowe dane
const date = ref(new Date().toISOString().split('T')[0])
const shift = ref('1')
const description = ref('')

// 👤 autor
const selectedUser = ref('')
const newUser = ref('')

const users = ref([
  'Paweł Kozak',
  'Arkadiusz Korzeniowski',
  'Łukasz Stasak',
  'Marcin Bernat',
])

// 📋 zadania
const tasks = ref<{ text: string, done: boolean }[]>([])
const newTask = ref('')

// 🔐 zabezpieczenie
onMounted(() => {
  if (!user.value) {
    navigateTo('/reports')
  }
})

// ➕ dodaj task
const addTask = () => {
  const text = newTask.value.trim()
  if (!text) return

  tasks.value.push({
    text,
    done: false
  })

  newTask.value = ''
}

// ❌ usuń task
const removeTask = (index: number) => {
  tasks.value.splice(index, 1)
}

// ➕ dodaj usera
const addUser = () => {
  const name = newUser.value.trim()
  if (!name) return

  users.value.push(name)
  selectedUser.value = name
  newUser.value = ''
}

// 💾 zapis
const save = async () => {

  if (!selectedUser.value || selectedUser.value === 'new') {
    alert('Wybierz autora raportu')
    return
  }

  if (tasks.value.length === 0) {
    alert('Dodaj przynajmniej jedno zadanie')
    return
  }

  await $fetch('/api/saveReport', {
    method: 'POST',
    body: {
      date: date.value,
      shift: shift.value,
      description: description.value,
      department: user.value.department,
      user: selectedUser.value,
      tasks: tasks.value
    }
  })

  navigateTo('/reports/list')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start p-4">

    <div class="bg-white p-6 sm:p-8 rounded-xl shadow w-full max-w-3xl">

      <h1 class="text-2xl sm:text-3xl font-bold mb-6">
        Dodaj raport ({{ user?.department }})
      </h1>

      <!-- 📅 DATA -->
      <input
          type="date"
          v-model="date"
          class="border p-3 rounded w-full mb-4"
      />

      <!-- 🔄 ZMIANA -->
      <select v-model="shift" class="border p-3 rounded w-full mb-4">
        <option value="1">Zmiana 1</option>
        <option value="2">Zmiana 2</option>
        <option value="3">Zmiana 3</option>
      </select>

      <!-- 👤 AUTOR -->
      <div class="mb-4">

        <label class="block text-sm font-medium mb-1">
          Autor raportu
        </label>

        <select
            v-model="selectedUser"
            class="border p-3 w-full rounded"
        >
          <option disabled value="">
            Wybierz autora
          </option>

          <option v-for="u in users" :key="u">
            {{ u }}
          </option>

          <option value="new">
            ➕ Dodaj nowego
          </option>
        </select>

      </div>

      <!-- ➕ NOWY USER -->
      <div v-if="selectedUser === 'new'" class="mb-4">

        <input
            v-model="newUser"
            placeholder="Nowy użytkownik"
            class="border p-3 w-full mb-2 rounded"
        />

        <button
            @click="addUser"
            class="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Dodaj użytkownika
        </button>

      </div>

      <!-- 📋 TASKI -->
      <h2 class="font-semibold mb-2">
        Lista zadań
      </h2>

      <div
          v-for="(task,index) in tasks"
          :key="task.text + index"
          class="border rounded p-3 mb-2 flex items-center gap-3"
      >

        <input type="checkbox" v-model="task.done" />

        <span
            class="flex-1"
            :class="task.done ? 'line-through text-gray-400' : ''"
        >
          {{ task.text }}
        </span>

        <button
            @click="removeTask(index)"
            class="text-red-500 text-sm"
        >
          Usuń
        </button>

      </div>

      <div class="flex gap-2 mb-6">

        <input
            v-model="newTask"
            placeholder="np. Sprawdzić dostawy, zgłosić brak towaru..."
            @keydown.enter="addTask"
            class="border p-2 rounded w-full"
        />

        <button
            @click="addTask"
            class="bg-blue-600 text-white px-4 rounded"
        >
          Dodaj
        </button>

      </div>

      <!-- 📝 OPIS -->
      <h2 class="font-semibold mb-2">
        Opis raportu
      </h2>

      <textarea
          v-model="description"
          placeholder="Opisz przebieg zmiany..."
          class="border p-3 w-full mb-6 rounded h-40"
      />

      <!-- 💾 SAVE -->
      <button
          @click="save"
          class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
      >
        Zapisz raport
      </button>

    </div>

  </div>
</template>