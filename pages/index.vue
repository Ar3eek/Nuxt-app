<script setup lang="ts">
const goToMenu = () => {
  navigateTo('/menu')
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">

    <!-- NAVBAR -->
    <nav class="flex justify-between items-center px-8 py-6">
      <h1 class="text-2xl font-bold text-orange-400">
        🍝 Bella Cucina
      </h1>

      <div class="flex gap-6 text-gray-300">
        <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
        <NuxtLink to="/menu" class="hover:text-white">Menu</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-white">Kontakt</NuxtLink>
      </div>
    </nav>

    <!-- HERO -->
    <section class="flex flex-col items-center justify-center text-center px-6 mt-20">

      <h2 class="text-5xl font-extrabold mb-6">
        Najlepsza włoska kuchnia w mieście
      </h2>

      <p class="text-gray-400 max-w-xl mb-8 text-lg">
        Świeże składniki, tradycyjne przepisy i wyjątkowa atmosfera.
        Zapraszamy na pizzę, pastę i wino prosto z Włoch.
      </p>

      <button
          @click="goToMenu"
          class="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl text-lg font-semibold transition"
      >
        Zobacz menu
      </button>

    </section>

    <!-- FEATURED DISHES -->
    <section class="mt-28 px-10 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

      <div class="bg-gray-800 p-6 rounded-2xl">
        <h3 class="text-xl font-bold mb-2">🍕 Pizza Margherita</h3>
        <p class="text-gray-400">Klasyczna pizza z mozzarellą i świeżą bazylią.</p>
      </div>

      <div class="bg-gray-800 p-6 rounded-2xl">
        <h3 class="text-xl font-bold mb-2">🍝 Pasta Carbonara</h3>
        <p class="text-gray-400">Makaron z pancettą, jajkiem i parmezanem.</p>
      </div>

      <div class="bg-gray-800 p-6 rounded-2xl">
        <h3 class="text-xl font-bold mb-2">🍷 Włoskie wino</h3>
        <p class="text-gray-400">Starannie dobrane wina z najlepszych regionów.</p>
      </div>

    </section>

  </div>
</template>