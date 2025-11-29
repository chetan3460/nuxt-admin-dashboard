<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { cn } from "@/utils";
import SafeIcon from "@/components/ui/safe-icon/SafeIcon.vue";

const props = defineProps<{
  item: any;
  index: number;
  activeSubmenu: number | null;
  collapsed?: boolean;
  hovered?: boolean;
}>();

const emit = defineEmits(["toggleSubmenu"]);
</script>

<template>
  <div v-if="!collapsed || hovered">
    <div
      @click="emit('toggleSubmenu', index)"
      :class="
        cn(
          'flex text-default-700 group font-medium text-sm capitalize px-[10px] py-3 rounded-xl cursor-pointer transition-all duration-100 hover:bg-primary hover:text-primary-foreground group',
          {
            'bg-primary text-primary-foreground': activeSubmenu === index,
          }
        )
      "
    >
      <div class="flex-1 gap-3 flex items-start">
        <span class="inline-flex items-center">
          <SafeIcon :icon="item.icon" class="w-5 h-5" />
        </span>
        <div class="">{{ item.title }}</div>
      </div>
      <div class="flex-0">
        <div
          :class="
            cn(
              'text-base rounded-full flex justify-center items-center transition-all duration-300 group-hover:text-primary-foreground',
              {
                'rotate-90': activeSubmenu === index,
                'text-default-500': activeSubmenu !== index,
              }
            )
          "
        >
          <Icon icon="heroicons:chevron-right-20-solid" class="h-5 w-5" />
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="inline-flex cursor-pointer items-center justify-center w-12 h-12 rounded-md"
    :class="{
      'bg-primary-100 text-primary': activeSubmenu === index,
    }"
  >
    <SafeIcon :icon="item.icon" class="w-6 h-6" />
  </div>
</template>
