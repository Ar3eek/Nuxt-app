<script setup lang="ts">
</script>
<template>
  <main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-20 px-6">

    <div class="max-w-6xl mx-auto space-y-20">

      <!-- 🔴 HERO -->
      <!-- 🔴 HERO -->
      <section class="text-center">

        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Zarządzanie raportami i zadaniami bez chaosu
        </h1>

        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
          Centralne miejsce do raportowania pracy, kontroli zadań i komunikacji zespołowej.
        </p>

        <p class="text-sm text-gray-500 max-w-xl mx-auto mb-10">
          Uporządkuj procesy, zwiększ przejrzystość i miej pełną kontrolę nad pracą zespołu.
        </p>

        <button
            @click="goToReports"
            class="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition hover:scale-[1.02]"
        >
          Przejdź do systemu
        </button>

        <!-- TRUST -->
        <div class="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-500">
          <div>✔ Przejrzysta organizacja pracy</div>
          <div>✔ Szybki dostęp do danych</div>
          <div>✔ Lepsza komunikacja w zespole</div>
        </div>

      </section>

      <!-- 🧠 VALUE SECTION -->
      <section class="max-w-4xl mx-auto text-center">

        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          Jedno narzędzie do zarządzania pracą zespołu
        </h2>

        <p class="text-gray-600 text-sm leading-relaxed">
          System eliminuje rozproszone informacje i ręczne raportowanie.
          Wszystkie działania zespołu są widoczne w jednym miejscu — co pozwala szybciej podejmować decyzje,
          kontrolować postępy i ograniczyć błędy komunikacyjne.
        </p>

      </section>

      <section class="grid md:grid-cols-3 gap-6">

        <div class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
          <ClipboardList class="w-10 h-10 text-red-500 mb-4" />
          <h3 class="font-semibold text-gray-900 mb-2">
            Centralizacja raportów
          </h3>
          <p class="text-sm text-gray-600">
            Wszystkie raporty w jednym systemie — uporządkowane i dostępne w każdej chwili.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
          <CheckCircle class="w-10 h-10 text-green-500 mb-4" />
          <h3 class="font-semibold text-gray-900 mb-2">
            Kontrola realizacji zadań
          </h3>
          <p class="text-sm text-gray-600">
            Monitoruj postęp pracy zespołu i reaguj na bieżąco.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
          <Megaphone class="w-10 h-10 text-blue-500 mb-4" />
          <h3 class="font-semibold text-gray-900 mb-2">
            Spójna komunikacja
          </h3>
          <p class="text-sm text-gray-600">
            Informacje trafiają dokładnie tam, gdzie są potrzebne.
          </p>
        </div>

      </section>



      <!-- 👀 PODGLĄD SYSTEMU -->
      <section class="bg-white rounded-2xl shadow p-8 text-center">

        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Prosty i czytelny system
        </h2>

        <p class="text-sm text-gray-600 mb-6">
          Zaprojektowany tak, żeby każdy mógł zacząć korzystać od razu — bez szkolenia.
        </p>

        <div class="rounded-lg p-6 space-y-12">

          <!-- 🧠 DASHBOARD -->
          <div class="text-center">
            <img src="/screenshot.png" alt="dashboard" class="border rounded-lg mb-4 shadow" />

            <h3 class="font-semibold text-gray-800 text-lg mb-1">
              Dashboard – wszystko w jednym miejscu
            </h3>

            <p class="text-sm text-gray-600 max-w-xl mx-auto">
              Najważniejsze informacje od kierownika, liczba raportów, zadań i ogłoszeń —
              pełen podgląd sytuacji w zespole od razu po zalogowaniu.
            </p>
          </div>

          <!-- 📊 RAPORTY -->
          <div class="text-center">
            <img src="/screenshot2.png" alt="raporty" class="border rounded-lg mb-4 shadow" />

            <h3 class="font-semibold text-gray-800 text-lg mb-1">
              Raporty – przejrzyste i uporządkowane
            </h3>

            <p class="text-sm text-gray-600 max-w-xl mx-auto">
              Wszystkie raporty w jednym miejscu — czytelne, łatwe do przeglądania
              i dostępne dla odpowiednich działów bez chaosu i szukania informacji.
            </p>
          </div>

          <!-- ✍️ DODAWANIE -->
          <div class="text-center">
            <img src="/screenshot3.png" alt="dodawanie raportu" class="border rounded-lg mb-4 shadow" />

            <h3 class="font-semibold text-gray-800 text-lg mb-1">
              Dodawanie raportów – szybkie i proste
            </h3>

            <p class="text-sm text-gray-600 max-w-xl mx-auto">
              Intuicyjny panel dodawania raportów pozwala w kilka sekund zapisać wykonaną pracę
              bez zbędnych kroków i komplikacji.
            </p>
          </div>

        </div>

      </section>

    </div>

  </main>
</template>