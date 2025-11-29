<script setup lang="ts">
import { cn, isLocationMatch } from "@/utils";

const props = defineProps<{
  subItem: any;
}>();

const route = useRoute();
const locationName = computed(() => route.path);
</script>

<template>
  <div v-if="subItem.badge">
    <span
      class="text-sm flex space-x-3 items-center transition-all duration-150 opacity-50 cursor-not-allowed"
    >
      <span
        class="h-2 w-2 rounded-full border border-zinc-600 dark:border-white inline-block flex-none"
      ></span>
      <div class="flex-1 truncate flex text-zinc-600 dark:text-zinc-300">
        <div class="flex-1 truncate">{{ subItem.title }}</div>
        <Badge class="leading-0 capitalize flex-none px-1 text-xs font-normal">
          {{ subItem.badge }}
        </Badge>
      </div>
    </span>
  </div>
  <NuxtLink v-else :to="subItem.href">
    <div
      :class="
        cn(
          'text-sm font-normal flex gap-3 items-center transition-all duration-150 rounded dark:hover:text-primary',
          {
            'text-primary': isLocationMatch(subItem.href, locationName),
            'text-default-600 dark:text-default-700': !isLocationMatch(
              subItem.href,
              locationName
            ),
          }
        )
      "
    >
      <span class="flex-1 truncate">{{ subItem.title }}</span>
    </div>
  </NuxtLink>
</template>
