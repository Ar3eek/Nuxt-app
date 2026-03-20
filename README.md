# 📊 System Raportów

Aplikacja webowa do zarządzania raportami pracy zespołu oraz ogłoszeniami wewnętrznymi.

## 🚀 Funkcje

* 📝 Tworzenie raportów zmianowych
* ✅ Lista zadań (todo + status wykonania)
* 💬 Komentarze do zadań
* 📢 Ogłoszenia zespołu (CRUD)
* 🔐 Panel kierownika (logowanie)
* 🔄 Automatyczne odświeżanie ogłoszeń

---

## 🛠️ Technologie

* **Frontend:** Vue 3 + Nuxt 3 + TypeScript
* **Backend:** Nuxt Server API (Nitro)
* **Baza danych:** MySQL
* **Stylowanie:** TailwindCSS

---

## 🗄️ Struktura projektu

```
/server/api/
  getAnnouncements.ts
  saveAnnouncement.ts
  updateAnnouncement.ts
  deleteAnnouncement.ts

/server/utils/
  db.ts

/pages/
  index.vue        # strona główna
  admin.vue        # panel kierownika
  reports.vue      # raporty
```

---

## ⚙️ Instalacja

1. Klonuj repo:

```bash
git clone https://github.com/TWOJ_LOGIN/system-raportow.git
cd system-raportow
```

2. Zainstaluj zależności:

```bash
npm install
```

3. Skonfiguruj bazę danych (MySQL)

Utwórz tabelę:

```sql
CREATE TABLE announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text TEXT,
  author VARCHAR(255),
  timestamp BIGINT
);
```

4. Ustaw połączenie w:

```
/server/utils/db.ts
```

```ts
export const db = await mysql.createPool({
  host: "localhost",
  user: "user",
  password: "haslo",
  database: "twoja_baza"
})
```

---

## ▶️ Uruchomienie projektu

```bash
npm run dev
```

Aplikacja będzie dostępna pod:

```
http://localhost:3000
```

---

## 🔐 Panel kierownika

Panel admina umożliwia:

* ➕ dodawanie ogłoszeń
* ✏️ edycję ogłoszeń
* ❌ usuwanie ogłoszeń

---

## 🔄 Aktualizacja danych

Ogłoszenia są automatycznie odświeżane co kilka sekund (polling), dzięki czemu zmiany są widoczne bez przeładowania strony.

---

## 🧠 Architektura

* Backend oparty o API w Nuxt (`/server/api`)
* Wszystkie operacje CRUD działają bezpośrednio na MySQL
* Frontend synchronizuje dane poprzez `$fetch`
* Brak użycia plików JSON (pełna migracja do bazy danych)

---

## 📌 TODO / przyszłe usprawnienia

* 🔔 Powiadomienia realtime (WebSocket)
* 👥 System użytkowników
* 📊 Statystyki raportów
* 📱 Responsywny UI (mobile-first)
* 🔐 JWT auth

---

## 📄 Licencja

MIT

---

## 👨‍💻 Autor

Projekt stworzony jako system do zarządzania pracą zespołu.

---
