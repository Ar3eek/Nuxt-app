```vue
<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>

  <footer class="bg-gray-900 text-gray-300 ">

    <div class="max-w-6xl mx-auto px-8 py-10 grid md:grid-cols-3 gap-8">

      <!-- system -->
      <div>
        <h2 class="text-lg font-semibold text-white mb-2">
          System Raportów
        </h2>

        <p class="text-sm text-gray-400">
          Platforma do zarządzania raportami i zadaniami zespołu.
          Ułatwia komunikację między zmianami i kontrolę wykonanej pracy.
        </p>
      </div>

      <!-- szybkie linki -->
      <div>
        <h3 class="text-white font-semibold mb-2">
          Nawigacja
        </h3>

        <ul class="space-y-1 text-sm">

          <li>
            <NuxtLink to="/" class="hover:text-white">
              Strona główna
            </NuxtLink>
          </li>

          <li>
            <NuxtLink to="/reports" class="hover:text-white">
              Raporty
            </NuxtLink>
          </li>

        </ul>

      </div>

      <!-- kontakt -->
      <div>
        <h3 class="text-white font-semibold mb-2">
          Informacje
        </h3>

        <p class="text-sm text-gray-400">
          System wspierający komunikację zespołu
          i zarządzanie zadaniami w organizacji.
        </p>
      </div>

    </div>


    <!-- dolny pasek -->

    <div class="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
      © {{ year }} System Raportów — Wszystkie prawa zastrzeżone
    </div>

  </footer>

</template>

<style scoped>

</style>
```
