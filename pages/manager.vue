<script setup lang="ts">
import { ref, onMounted } from "vue"

type Announcement = {
  id: number
  text: string
  timestamp: number
  author: string
}

const announcements = ref<Announcement[]>([])

const password = ref("")
const logged = ref(false)

const author = ref("Kierownik")
const text = ref("")

const successMessage = ref("")

const editingId = ref<number | null>(null)
const editText = ref("")
const editAuthor = ref("")

// 🔥 LOAD
const loadAnnouncements = async () => {
  try {
    announcements.value = await $fetch("/api/getAnnouncements")
  } catch (err) {
    console.error("Błąd pobierania ogłoszeń", err)
  }
}

onMounted(loadAnnouncements)

// 🔐 LOGIN
const login = async () => {
  const res:any = await $fetch("/api/adminLogin",{
    method:"POST",
    body:{ password:password.value }
  })

  if(res.success){
    logged.value = true
  }else{
    alert("Błędne hasło")
  }
}

// ➕ ADD
const addAnnouncement = async () => {

  if(!text.value.trim()) return

  try {

    await $fetch("/api/saveAnnouncement",{
      method:"POST",
      body:{
        text: text.value,
        author: author.value,
        timestamp: Date.now()
      }
    })

    text.value = ""

    await loadAnnouncements() // 🔥 ważne

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

    await loadAnnouncements() // 🔥 ważne

    successMessage.value = "🗑 Usunięto ogłoszenie"

  } catch(err){
    console.error(err)
  }

  setTimeout(()=> successMessage.value="",3000)
}

// ✏️ START EDIT
const startEdit = (item: Announcement) => {
  editingId.value = item.id
  editText.value = item.text
  editAuthor.value = item.author
}

// 💾 SAVE EDIT
const saveEdit = async (item: Announcement) => {

  try {

    await $fetch("/api/updateAnnouncement",{
      method:"POST",
      body:{
        id: item.id,
        text: editText.value,
        author: editAuthor.value
      }
    })

    editingId.value = null

    await loadAnnouncements() // 🔥 ważne

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

  <main class="min-h-screen bg-gray-100 py-20 px-6">

    <div class="max-w-3xl mx-auto">

      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold mb-2">Panel kierownika</h1>
      </div>

      <!-- LOGIN -->
      <div v-if="!logged" class="bg-white p-8 rounded-xl shadow">

        <input
            v-model="password"
            type="password"
            placeholder="Hasło"
            @keydown.enter="login"
            class="border p-3 w-full mb-4 rounded"
        />

        <button
            @click="login"
            class="w-full bg-red-600 text-white py-3 rounded"
        >
          Zaloguj
        </button>

      </div>

      <!-- PANEL -->
      <div v-else class="space-y-6">

        <!-- ADD -->
        <div class="bg-white p-6 rounded-xl shadow">

          <div v-if="successMessage" class="mb-3 text-green-600">
            {{ successMessage }}
          </div>

          <input v-model="author" class="border p-2 w-full mb-2 rounded" />
          <textarea v-model="text" class="border p-2 w-full mb-2 rounded"/>

          <button @click="addAnnouncement" class="bg-red-600 text-white px-4 py-2 rounded">
            Dodaj
          </button>

        </div>

        <!-- LISTA -->
        <div
            v-for="item in announcements"
            :key="item.id"
            class="bg-white p-5 rounded-xl shadow"
        >

          <!-- VIEW -->
          <div v-if="editingId !== item.id">

            <p>{{ item.text }}</p>

            <div class="text-sm text-gray-500">
              {{ formatDate(item.timestamp) }} • {{ item.author }}
            </div>

            <div class="flex gap-3 mt-2">
              <button @click="startEdit(item)">Edytuj</button>
              <button @click="deleteAnnouncement(item)">Usuń</button>
            </div>

          </div>

          <!-- EDIT -->
          <div v-else>

            <input v-model="editAuthor" class="border p-2 w-full mb-2"/>
            <textarea v-model="editText" class="border p-2 w-full mb-2"/>

            <button @click="saveEdit(item)">Zapisz</button>
            <button @click="editingId=null">Anuluj</button>

          </div>

        </div>

      </div>

    </div>

  </main>

</template>