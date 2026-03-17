```vue
<script setup lang="ts">
onMounted(() => {

  const dep = localStorage.getItem('department')

  if(dep){
    navigateTo('/reports/list')
  }

})
const departments = [
  'Dostawy',
  'Magazyn',
  'Spedycja'
]

const passwords:any = {
  Dostawy: "dostawy123",
  Magazyn: "magazyn123",
  Spedycja: "spedycja123"
}

const selectedDepartment = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')

const login = () => {

  if(password.value === passwords[selectedDepartment.value]){

    localStorage.setItem('department', selectedDepartment.value)

    navigateTo('/reports/list')

  }else{
    error.value = "Niepoprawne hasło"
  }

}

</script>

<template>

  <div class="min-h-screen flex items-center justify-center bg-gray-100">

    <div class="bg-white p-10 rounded-xl shadow w-96">

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
            @keyup.enter="login"
            placeholder="Hasło"
            class="border p-3 rounded w-full"
        />

        <button
            @click="showPassword = !showPassword"
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
          class="w-full bg-red-600 text-white py-3 rounded-lg"
      >
        Zaloguj
      </button>

    </div>

  </div>

</template>
```
