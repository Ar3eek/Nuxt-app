<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-10">
    <h1 class="text-4xl font-bold mb-8">Nasze Menu 🍕</h1>

    <div class="grid gap-6 md:grid-cols-2">

      <div class="bg-gray-800 p-6 rounded-xl">
        <h2 class="text-xl font-bold">Pizza Margherita</h2>
        <p class="text-gray-400">Sos pomidorowy, mozzarella, bazylia</p>
      </div>

      <div class="bg-gray-800 p-6 rounded-xl">
        <h2 class="text-xl font-bold">Pasta Carbonara</h2>
        <p class="text-gray-400">Makaron, pancetta, jajko, parmezan</p>
      </div>

    </div>

    <NuxtLink to="/" class="inline-block mt-10 text-orange-400">
      ← Powrót do strony głównej
    </NuxtLink>
  </div>
</template>