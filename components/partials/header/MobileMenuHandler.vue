<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Button from "@/components/ui/button/Button.vue";
import { useSidebarStore } from "@/stores/sidebar";

const sidebarStore = useSidebarStore();
const { mobileMenu } = storeToRefs(sidebarStore);
const { setMobileMenu } = sidebarStore;
</script>

<template>
  <div>
    <Button
      @click="setMobileMenu(!mobileMenu)"
      variant="ghost"
      size="icon"
      class="relative h-9 w-9 hover:bg-primary-100 dark:hover:bg-default-300 hover:text-primary text-default-500 dark:text-default-800 rounded-full"
    >
      <Icon icon="lucide:menu" class="h-5 w-5" />
    </Button>
  </div>
</template>
