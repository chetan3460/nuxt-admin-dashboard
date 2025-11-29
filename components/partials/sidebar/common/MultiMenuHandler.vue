<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { cn } from "@/utils";

const props = defineProps<{
  subItem: any;
  subIndex: number;
  activeMultiMenu: number | null;
  class?: string;
}>();

const emit = defineEmits(["toggleMultiMenu"]);
</script>

<template>
  <div
    @click="emit('toggleMultiMenu', subIndex)"
    :class="
      cn(
        'text-sm flex gap-3 rounded items-center transition-all duration-150 cursor-pointer relative before:absolute before:top-0 before:-left-5 before:w-[3px] before:h-0 before:transition-all before:duration-200',
        props.class,
        {
          'text-primary before:bg-primary before:h-full':
            activeMultiMenu === subIndex,
          'text-default-700 hover:text-primary': activeMultiMenu !== subIndex,
        }
      )
    "
  >
    <span class="flex-1">{{ subItem.title }}</span>
    <div class="flex-none">
      <span
        :class="
          cn('[&>*]:transform [&>*]:transition-all [&>*]:duration-300', {
            '[&>*]:rotate-90': activeMultiMenu === subIndex,
          })
        "
      >
        <Icon icon="heroicons:chevron-right-20-solid" class="h-5 w-5" />
      </span>
    </div>
  </div>
</template>
