<script setup>
const { user } = useAuth()

if (!user.value) {
  navigateTo('/')
} else {
  navigateTo('/reports/list')
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    Ładowanie...
  </div>
</template>