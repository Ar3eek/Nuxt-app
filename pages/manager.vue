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

  <main class="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-10">

    <div class="max-w-3xl mx-auto">

      <!-- HEADER -->
      <div class="text-center mb-8 sm:mb-10">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Panel kierownika
        </h1>
      </div>

      <!-- LOGIN -->
      <div v-if="!logged" class="bg-white p-6 sm:p-8 rounded-2xl shadow-md">

        <input
            v-model="password"
            type="password"
            placeholder="Hasło"
            @keydown.enter="login"
            class="border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 p-3 w-full mb-4 rounded-lg text-sm sm:text-base"
        />

        <button
            @click="login"
            class="w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-lg text-sm sm:text-base font-medium"
        >
          Zaloguj
        </button>

      </div>

      <!-- PANEL -->
      <div v-else class="space-y-6">

        <!-- ADD -->
        <div class="bg-white p-5 sm:p-6 rounded-2xl shadow-md">

          <div v-if="successMessage" class="mb-3 text-green-600 text-sm sm:text-base">
            {{ successMessage }}
          </div>

          <input
              v-model="author"
              placeholder="Autor"
              class="border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 p-2.5 w-full mb-2 rounded-lg text-sm sm:text-base"
          />

          <textarea
              v-model="text"
              placeholder="Treść ogłoszenia..."
              rows="4"
              class="border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 p-2.5 w-full mb-3 rounded-lg text-sm sm:text-base"
          />

          <button
              @click="addAnnouncement"
              class="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg text-sm sm:text-base"
          >
            Dodaj
          </button>

        </div>

        <!-- LISTA -->
        <div class="space-y-4">

          <div
              v-for="item in announcements"
              :key="item.id"
              class="bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg transition"
          >

            <!-- VIEW -->
            <div v-if="editingId !== item.id">

              <p class="text-sm sm:text-base text-gray-800 mb-2 whitespace-pre-line">
                {{ item.text }}
              </p>

              <div class="text-xs sm:text-sm text-gray-500 mb-3">
                {{ formatDate(item.timestamp) }} • {{ item.author }}
              </div>

              <div class="flex gap-4 text-sm">

                <button
                    @click="startEdit(item)"
                    class="text-blue-600 hover:underline"
                >
                  Edytuj
                </button>

                <button
                    @click="deleteAnnouncement(item)"
                    class="text-red-600 hover:underline"
                >
                  Usuń
                </button>

              </div>

            </div>

            <!-- EDIT -->
            <div v-else>

              <input
                  v-model="editAuthor"
                  class="border border-gray-300 p-2.5 w-full mb-2 rounded-lg text-sm sm:text-base"
              />

              <textarea
                  v-model="editText"
                  rows="4"
                  class="border border-gray-300 p-2.5 w-full mb-3 rounded-lg text-sm sm:text-base"
              />

              <div class="flex gap-4 text-sm">

                <button
                    @click="saveEdit(item)"
                    class="text-green-600 hover:underline"
                >
                  Zapisz
                </button>

                <button
                    @click="editingId=null"
                    class="text-gray-600 hover:underline"
                >
                  Anuluj
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </main>

</template>