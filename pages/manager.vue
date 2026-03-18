<script setup lang="ts">
import { ref, onMounted } from "vue"

type Announcement = {
  text: string
  timestamp: number
  author: string
}

/* dane */

const announcements = ref<Announcement[]>([])

const password = ref("")
const logged = ref(false)

const author = ref("Kierownik")
const text = ref("")

const successMessage = ref("")

const editingIndex = ref<number | null>(null)
const editText = ref("")
const editAuthor = ref("")

/* pobieranie ogłoszeń */

onMounted(async () => {

  try {

    const data = await $fetch<Announcement[]>("/api/getAnnouncements")

    announcements.value = data

  } catch (err) {

    console.error("Błąd pobierania ogłoszeń", err)

  }

})

/* logowanie */

const login = async () => {

  const res:any = await $fetch("/api/adminLogin",{
    method:"POST",
    body:{
      password:password.value
    }
  })

  if(res.success){

    logged.value = true

  }else{

    alert("Błędne hasło")

  }

}
/* dodanie ogłoszenia */

const addAnnouncement = async () => {

  if(!text.value.trim()) return

  const newAnnouncement: Announcement = {
    text: text.value,
    timestamp: Date.now(),
    author: author.value
  }

  try {

    await $fetch("/api/saveAnnouncement",{
      method:"POST",
      body:newAnnouncement
    })

    announcements.value.unshift(newAnnouncement)

    text.value=""

    successMessage.value = "✅ Ogłoszenie zostało dodane"

  } catch(err){

    console.error(err)

  }

  setTimeout(()=>{
    successMessage.value=""
  },3000)

}

/* usuwanie */

const deleteAnnouncement = async (index:number) => {

  try {

    await $fetch("/api/deleteAnnouncement",{
      method:"POST",
      body:{ index }
    })

    announcements.value.splice(index,1)

    successMessage.value = "🗑 Ogłoszenie usunięte"

  } catch(err){

    console.error(err)

  }

  setTimeout(()=>{
    successMessage.value=""
  },3000)

}

/* rozpoczęcie edycji */

const startEdit = (index:number) => {

  const item = announcements.value[index]
  if(!item) return

  editingIndex.value = index
  editText.value = item.text
  editAuthor.value = item.author

}

/* zapis edycji */

const saveEdit = async (index:number) => {

  try {

    await $fetch("/api/updateAnnouncement",{
      method:"POST",
      body:{
        index,
        text: editText.value,
        author: editAuthor.value
      }
    })

    const item = announcements.value[index]
    if(!item) return

    item.text = editText.value
    item.author = editAuthor.value

    editingIndex.value = null

    successMessage.value = "✏️ Ogłoszenie zaktualizowane"

  } catch(err){

    console.error(err)

  }

  setTimeout(()=>{
    successMessage.value=""
  },3000)

}

/* format daty */

const formatDate = (timestamp:number) => {

  const date = new Date(timestamp)

  return date.toLocaleDateString('pl-PL') + " • " +
      date.toLocaleTimeString('pl-PL',{
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
      })

}
</script>

<template>

  <main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-20 px-6">

    <div class="max-w-3xl mx-auto">

      <!-- HEADER -->

      <div class="text-center mb-10">

        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          Panel kierownika
        </h1>

        <p class="text-gray-600">
          Dodawaj i zarządzaj ogłoszeniami dla pracowników
        </p>

      </div>

      <!-- LOGOWANIE -->

      <div v-if="!logged" class="bg-white rounded-2xl shadow-lg p-10 space-y-6">

        <h2 class="text-xl font-semibold text-gray-700">
          Logowanie kierownika
        </h2>

        <input
            v-model="password"
            type="password"
            placeholder="Hasło kierownika"
            class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
            @click="login"
            class="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Zaloguj
        </button>

      </div>

      <div v-if="logged" class="space-y-8">

        <!-- DODAWANIE -->

        <div class="bg-white rounded-2xl shadow-lg p-10 space-y-6">

          <h2 class="text-xl font-semibold text-gray-700">
            Dodaj nowe ogłoszenie
          </h2>

          <div
              v-if="successMessage"
              class="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm"
          >
            {{ successMessage }}
          </div>

          <input
              v-model="author"
              placeholder="Autor"
              class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <textarea
              v-model="text"
              rows="4"
              placeholder="Treść ogłoszenia..."
              class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
              @click="addAnnouncement"
              :disabled="!text.trim()"
              class="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            Dodaj ogłoszenie
          </button>

        </div>

        <!-- LISTA OGŁOSZEŃ -->

        <div class="bg-white rounded-2xl shadow-lg p-10 space-y-6">

          <h2 class="text-xl font-semibold text-gray-700">
            Istniejące ogłoszenia
          </h2>

          <div
              v-for="(item,index) in announcements"
              :key="index"
              class="border border-gray-200 rounded-lg p-5 space-y-3"
          >

            <!-- widok -->

            <div v-if="editingIndex !== index">

              <p class="text-gray-800 font-medium">
                {{ item.text }}
              </p>

              <div class="text-sm text-gray-500">
                {{ formatDate(item.timestamp) }} • {{ item.author }}
              </div>

              <div class="flex gap-3 pt-2">

                <button
                    @click="startEdit(index)"
                    class="text-blue-600 hover:underline text-sm"
                >
                  Edytuj
                </button>

                <button
                    @click="deleteAnnouncement(index)"
                    class="text-red-600 hover:underline text-sm"
                >
                  Usuń
                </button>

              </div>

            </div>

            <!-- edycja -->

            <div v-if="editingIndex === index" class="space-y-3">

              <input
                  v-model="editAuthor"
                  class="w-full border p-2 rounded"
              />

              <textarea
                  v-model="editText"
                  class="w-full border p-2 rounded"
              />

              <div class="flex gap-3">

                <button
                    @click="saveEdit(index)"
                    class="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Zapisz
                </button>

                <button
                    @click="editingIndex=null"
                    class="bg-gray-300 px-4 py-2 rounded"
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