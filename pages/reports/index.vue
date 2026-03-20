<script setup lang="ts">
import { ref, onMounted } from "vue"
onMounted(async () => {

  const savedDep = localStorage.getItem("department")

  // AUTO LOGIN
  if (savedDep) {
    navigateTo("/reports/list")
    return
  }

  try {

    const data = await $fetch<Announcement[]>("/api/getAnnouncements")
    announcements.value = data

  } catch (err) {

    console.error("Błąd pobierania ogłoszeń", err)

  }

})

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

const login = async () => {

  if(!selectedDepartment.value){
    error.value = "Wybierz dział"
    return
  }

  const res:any = await $fetch("/api/login",{
    method:"POST",
    body:{
      department:selectedDepartment.value,
      password:password.value
    }
  })

  if(res.success){

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
  <div class="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">

    <div class="w-full max-w-md sm:max-w-lg lg:max-w-xl">

      <!-- LOGOWANIE -->
      <div class="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg w-full">

        <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center">
          Logowanie do działu
        </h1>

        <select
            v-model="selectedDepartment"
            class="border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 p-3 rounded-lg w-full mb-4 text-sm sm:text-base"
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
              @keydown.enter="login"
              placeholder="Hasło"
              class="border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 p-3 rounded-lg w-full pr-12 text-sm sm:text-base"
          />

          <button
              type="button"
              @click="showPassword=!showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            👁
          </button>

        </div>

        <p v-if="error" class="text-red-500 text-sm mb-4 text-center">
          {{ error }}
        </p>

        <button
            @click="login"
            class="w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-lg text-sm sm:text-base font-medium"
        >
          Zaloguj
        </button>

      </div>

    </div>

  </div>
</template>