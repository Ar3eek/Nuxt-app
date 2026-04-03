<script setup lang="ts">
import { Mail, Phone, Building2, Send } from "lucide-vue-next"
</script>

<template>
  <div class="p-4  border border-gray-100 ">
    <div class=" flex justify-center  md:w-[200px] border bg-gray-200 rounded-lg ">
      Wróć do<a href="/" class="text-red-600 hover:underline font-bold  px-1">strony głównej</a>
    </div>
  </div>
  <main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-20 px-6">

    <div class="max-w-5xl mx-auto space-y-16">

      <!-- 🔴 HERO -->
      <section class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Kontakt & Raport Systemu
        </h1>

        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
          Masz pytania, chcesz wdrożyć system lub zgłosić problem?
        </p>

        <p class="text-sm text-gray-500 max-w-xl mx-auto">
          Skontaktuj się z nami lub prześlij raport — odpowiadamy szybko i konkretnie.
        </p>
      </section>

      <!-- 📩 KONTAKT + FORM -->
      <section class="grid md:grid-cols-2 gap-10">

        <!-- 📞 DANE KONTAKTOWE -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">

          <h2 class="text-xl font-semibold text-gray-900">
            Dane kontaktowe
          </h2>

          <div class="flex items-center gap-4">
            <Mail class="w-6 h-6 text-red-500" />
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="text-gray-800 font-medium">kontakt@arkadiuszkorzeniowski.pl</p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <Phone class="w-6 h-6 text-green-500" />
            <div>
              <p class="text-sm text-gray-500">Telefon</p>
              <p class="text-gray-800 font-medium">+48 792 276 388</p>
            </div>
          </div>
          <div class="text-sm text-gray-500 pt-4">
            Odpowiadamy zazwyczaj w ciągu 24h.
          </div>

        </div>

        <!-- 📝 FORMULARZ -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            Wyślij wiadomość / raport
          </h2>

          <form class="space-y-5">

            <div>
              <label class="text-sm text-gray-600">Imię</label>
              <input
                  type="text"
                  class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Jan Kowalski"
              />
            </div>

            <div>
              <label class="text-sm text-gray-600">Email</label>
              <input
                  type="email"
                  class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="email@firma.pl"
              />
            </div>

            <div>
              <label class="text-sm text-gray-600">Temat</label>
              <select
                  class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option>Zapytanie</option>
                <option>Wdrożenie systemu</option>
                <option>Problem / błąd</option>
                <option>Inne</option>
              </select>
            </div>

            <div>
              <label class="text-sm text-gray-600">Wiadomość</label>
              <textarea
                  rows="4"
                  class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Opisz szczegóły..."
              ></textarea>
            </div>

            <button
                type="submit"
                class="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition hover:scale-[1.02]"
            >
              <Send class="w-5 h-5" />
              Wyślij wiadomość
            </button>

          </form>

        </div>

      </section>

      <!-- 🧠 INFO -->
      <section class="text-center max-w-3xl mx-auto">

        <h2 class="text-xl font-semibold text-gray-900 mb-3">
          Szybka pomoc techniczna
        </h2>

        <p class="text-sm text-gray-600">
          Jeśli zgłaszasz problem, podaj jak najwięcej szczegółów —
          przyspieszy to diagnozę i rozwiązanie.
        </p>

      </section>

    </div>

  </main>
</template>