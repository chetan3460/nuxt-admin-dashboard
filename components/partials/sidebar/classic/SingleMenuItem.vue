<script setup lang="ts">
import { cn, isLocationMatch } from "@/utils";

import SafeIcon from "@/components/ui/safe-icon/SafeIcon.vue";

const props = defineProps<{
  item: any;
  collapsed?: boolean;
  hovered?: boolean;
}>();

const route = useRoute();
const locationName = computed(() => route.path);
</script>

<template>
  <NuxtLink :to="item.href">
    <div
      v-if="!collapsed || hovered"
      :class="
        cn(
          'flex gap-3 group text-default-700 dark:text-default-950 font-medium text-sm capitalize px-[10px] py-3 rounded cursor-pointer hover:bg-primary hover:text-primary-foreground',
          {
            'bg-primary text-primary-foreground': isLocationMatch(
              item.href,
              locationName
            ),
          }
        )
      "
    >
      <span class="flex-grow-0">
        <SafeIcon :icon="item.icon" class="w-5 h-5" />
      </span>
      <div class="text-box flex-grow">{{ item.title }}</div>
      <Badge v-if="item.badge" class="rounded">{{ item.badge }}</Badge>
    </div>
    <div v-else>
      <span
        :class="
          cn(
            'h-12 w-12 mx-auto rounded-md transition-all duration-300 inline-flex flex-col items-center justify-center relative',
            {
              'bg-primary text-primary-foreground': isLocationMatch(
                item.href,
                locationName
              ),
              'text-default-600': !isLocationMatch(item.href, locationName),
            }
          )
        "
      >
        <SafeIcon :icon="item.icon" class="w-6 h-6" />
      </span>
    </div>
  </NuxtLink>
</template>
