<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo("/dashboard-v2");
    },
  ],
});
</script>

<template>
  <div>Redirecting...</div>
</template>
