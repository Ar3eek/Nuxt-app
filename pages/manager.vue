<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useAuth } from '~/composables/useAuth'

// 🔐 AUTH
const { user } = useAuth()

type Announcement = {
  id: number
  text: string
  timestamp: number
  author: string
  department: string // 👈 NOWE
}

const announcements = ref<Announcement[]>([])

const author = ref("Kierownik")
const text = ref("")
const department = ref("all") // 👈 NOWE

const successMessage = ref("")

// 🔥 POWITANIE
const welcomeMessage = ref("")

const editingId = ref<number | null>(null)
const editText = ref("")
const editAuthor = ref("")
const editDepartment = ref("all") // 👈 NOWE

// 🔥 LOAD
const loadAnnouncements = async () => {
  try {
    announcements.value = await $fetch("/api/getAnnouncements")
  } catch (err) {
    console.error("Błąd pobierania ogłoszeń", err)
  }
}

// 🔒 BLOKADA + INIT
onMounted(() => {

  if (!user.value) {
    navigateTo('/')
    return
  }

  if (user.value.role !== 'manager') {
    navigateTo('/')
    return
  }

  loadAnnouncements()

  // 🔥 POWITANIE
  const hour = new Date().getHours()

  if(hour < 12) welcomeMessage.value = "☀️ Dzień dobry!"
  else if(hour < 18) welcomeMessage.value = "👋 Witamy ponownie!"
  else welcomeMessage.value = "🌙 Dobry wieczór!"

  setTimeout(() => {
    welcomeMessage.value = ""
  }, 3000)
})

// ➕ ADD
const addAnnouncement = async () => {

  if(!text.value.trim()) return

  try {

    await $fetch("/api/saveAnnouncement",{
      method:"POST",
      body:{
        text: text.value,
        author: author.value,
        timestamp: Date.now(),
        department: department.value // 👈 NOWE
      }
    })

    text.value = ""
    department.value = "all"

    await loadAnnouncements()

    successMessage.value = "✅ Dodano ogłoszenie"

  } catch(err){
    console.error(err)
  }

  setTimeout(()=> successMessage.value="",3000)
}

// ❌ DELETE
const deleteAnnouncement = async (item: Announcement) => {

  try {

    await $fetch("/api/deleteAnnouncement",{
      method:"POST",
      body:{ id: item.id }
    })

    await loadAnnouncements()
    successMessage.value = "🗑 Usunięto ogłoszenie"

  } catch(err){
    console.error(err)
  }

  setTimeout(()=> successMessage.value="",3000)
}

// ✏️ EDIT
const startEdit = (item: Announcement) => {
  editingId.value = item.id
  editText.value = item.text
  editAuthor.value = item.author
  editDepartment.value = item.department || "all"
}

const saveEdit = async (item: Announcement) => {

  try {

    await $fetch("/api/updateAnnouncement",{
      method:"POST",
      body:{
        id: item.id,
        text: editText.value,
        author: editAuthor.value,
        department: editDepartment.value // 👈 NOWE
      }
    })

    editingId.value = null
    await loadAnnouncements()

    successMessage.value = "✏️ Zaktualizowano ogłoszenie"

  } catch(err){
    console.error(err)
  }

  setTimeout(()=> successMessage.value="",3000)
}

// 📅 FORMAT
const formatDate = (timestamp:number) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('pl-PL') + " • " +
      date.toLocaleTimeString('pl-PL',{
        hour:'2-digit',
        minute:'2-digit'
      })
}
</script>

<template>

  <main class="min-h-screen bg-gray-100 px-4 py-10">

    <!-- 🔥 POWITANIE -->
    <div
        v-if="welcomeMessage"
        class="fixed top-6 left-1/2 -translate-x-1/2 bg-white shadow px-6 py-3 rounded-xl z-50"
    >
      {{ welcomeMessage }}
    </div>

    <div class="max-w-3xl mx-auto">

      <!-- HEADER -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold">
          🧑‍💼 Panel kierownika
        </h1>
      </div>

      <!-- ADD -->
      <div class="bg-white p-6 rounded-xl shadow mb-6">

        <div v-if="successMessage" class="mb-3 text-green-600">
          {{ successMessage }}
        </div>

        <input
            v-model="author"
            class="border p-2 w-full mb-2 rounded"
        />

        <!-- 👇 WYBÓR DZIAŁU -->
        <select
            v-model="department"
            class="border p-2 w-full mb-2 rounded"
        >
          <option value="all">Wszyscy</option>
          <option value="dostawy">Dostawy</option>
          <option value="magazyn">Magazyn</option>
          <option value="spedycja">Spedycja</option>
        </select>

        <textarea
            v-model="text"
            placeholder="Treść ogłoszenia..."
            class="border p-2 w-full mb-3 rounded"
        />

        <button
            @click="addAnnouncement"
            class="bg-red-600 text-white px-4 py-2 rounded"
        >
          Dodaj ogłoszenie
        </button>

      </div>

      <!-- LISTA -->
      <div class="space-y-4">

        <div
            v-for="item in announcements"
            :key="item.id"
            class="bg-white p-4 rounded-xl shadow"
        >

          <!-- VIEW -->
          <div v-if="editingId !== item.id">

            <p class="mb-2">{{ item.text }}</p>

            <div class="text-sm text-gray-500 mb-3">
              {{ formatDate(item.timestamp) }} • {{ item.author }}

              <!-- 👇 BADGE -->
              <span class="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                {{ item.department }}
              </span>
            </div>

            <div class="flex gap-4 text-sm">

              <button @click="startEdit(item)" class="text-blue-600">
                Edytuj
              </button>

              <button @click="deleteAnnouncement(item)" class="text-red-600">
                Usuń
              </button>

            </div>

          </div>

          <!-- EDIT -->
          <div v-else>

            <input v-model="editAuthor" class="border p-2 w-full mb-2 rounded" />

            <!-- 👇 EDYCJA DZIAŁU -->
            <select v-model="editDepartment" class="border p-2 w-full mb-2 rounded">
              <option value="all">Wszyscy</option>
              <option value="dostawy">Dostawy</option>
              <option value="magazyn">Magazyn</option>
              <option value="spedycja">Spedycja</option>
            </select>

            <textarea v-model="editText" class="border p-2 w-full mb-3 rounded" />

            <div class="flex gap-4 text-sm">

              <button @click="saveEdit(item)" class="text-green-600">
                Zapisz
              </button>

              <button @click="editingId=null" class="text-gray-600">
                Anuluj
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  </main>
</template>