<script setup lang="ts">
import { ref, onMounted } from "vue"

type Announcement = {
  text:string
  timestamp:number
  author:string
}

const announcements = ref<Announcement[]>([])

const departments = [
  "Dostawy",
  "Magazyn",
  "Spedycja"
]

const passwords:any = {
  Dostawy: "dostawy123",
  Magazyn: "magazyn123",
  Spedycja: "spedycja123"
}

const selectedDepartment = ref("")
const password = ref("")
const showPassword = ref(false)
const error = ref("")

onMounted(async () => {

  try {

    const data = await $fetch<Announcement[]>("/api/getAnnouncements")

    announcements.value = data

  } catch (err) {

    console.error("Błąd pobierania ogłoszeń", err)

  }

})

const login = () => {

  if(!selectedDepartment.value){
    error.value = "Wybierz dział"
    return
  }

  if(password.value === passwords[selectedDepartment.value]){

    localStorage.setItem("department", selectedDepartment.value)

    navigateTo("/reports/list")

  }else{

    error.value = "Niepoprawne hasło"

  }

}

const formatDate = (timestamp:number) => {

  const date = new Date(timestamp)

  return date.toLocaleDateString("pl-PL") + " • " +
      date.toLocaleTimeString("pl-PL",{
        hour:"2-digit",
        minute:"2-digit"
      })

}
</script>

<template>

  <div class="min-h-screen bg-gray-100 p-10">

    <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

      <!-- LOGOWANIE -->

      <div class="bg-white p-10 rounded-xl shadow">

        <h1 class="text-2xl font-bold mb-6">
          Logowanie do działu
        </h1>

        <select
            v-model="selectedDepartment"
            class="border p-3 rounded w-full mb-4"
        >
          <option disabled value="">
            Wybierz dział
          </option>

          <option v-for="dep in departments" :key="dep">
            {{ dep }}
          </option>

        </select>

        <div class="relative mb-4">

          <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Hasło"
              class="border p-3 rounded w-full"
          />

          <button
              type="button"
              @click="showPassword=!showPassword"
              class="absolute right-3 top-3"
          >
            👁
          </button>

        </div>

        <p v-if="error" class="text-red-500 text-sm mb-4">
          {{ error }}
        </p>

        <button
            @click="login"
            class="w-full bg-red-600 text-white py-3 rounded"
        >
          Zaloguj
        </button>

      </div>

    </div>

  </div>

</template>