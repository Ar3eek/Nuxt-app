<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-950 text-gray-300">

    <!-- GÓRA -->
    <div class="max-w-7xl mx-auto px-8 py-14 grid gap-10 md:grid-cols-4">

      <!-- O SYSTEMIE -->
      <div>
        <h2 class="text-xl font-bold text-white mb-3">
          System Raportów
        </h2>

        <p class="text-sm text-gray-400 leading-relaxed">
          Nowoczesna platforma do zarządzania raportami i zadaniami zespołu.
          Umożliwia płynną komunikację między zmianami oraz pełną kontrolę nad realizacją pracy.
        </p>
      </div>

      <!-- NAWIGACJA -->
      <div>
        <h3 class="text-white font-semibold mb-3">
          Nawigacja
        </h3>

        <ul class="space-y-2 text-sm">
          <li>
            <NuxtLink to="/" class="hover:text-white transition">
              Strona główna
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/reports" class="hover:text-white transition">
              Raporty
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/manager" class="hover:text-white transition">
              Panel kierownika
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- INFORMACJE -->
      <div>
        <h3 class="text-white font-semibold mb-3">
          Informacje
        </h3>

        <ul class="space-y-2 text-sm text-gray-400">
          <li>Wsparcie zespołu</li>
          <li>Kontrola pracy</li>
          <li>Historia raportów</li>
          <li>Bezpieczeństwo danych</li>
        </ul>
      </div>

      <!-- CTA / KONTAKT -->
      <div>
        <h3 class="text-white font-semibold mb-3">
          Kontakt
        </h3>

        <p class="text-sm text-gray-400 mb-4">
          Masz pytania lub chcesz wdrożyć system w swojej firmie?
        </p>

        <a
            href="https://arkadiuszkorzeniowski.pl/Kontakt"
            class="inline-block bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"
        >
          Skontaktuj się
        </a>
      </div>

    </div>

    <!-- DOLNY PASEK -->
    <div class="border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">

        <p>
          © {{ year }} System Raportów — Wszelkie prawa zastrzeżone
        </p>

        <p>
          Projekt i realizacja
          <a
              href="https://arkadiuszkorzeniowski.pl/"
              target="_blank"
              class="text-red-500 hover:text-red-400 transition"
          >
            Arkadiusz Korzeniowski
          </a>
        </p>

      </div>
    </div>

  </footer>
</template>