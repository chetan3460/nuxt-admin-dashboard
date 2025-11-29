<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useDragContext } from "@/composables/useDragContext";

const props = defineProps<{
  containerId: string;
  items: { id: string; [key: string]: any }[];
  storageKey?: string;
}>();

const emit = defineEmits<{
  (e: "update:items", value: { id: string; [key: string]: any }[]): void;
}>();

const dragContext = useDragContext();
const localItems = ref([...props.items]);

watch(
  () => props.items,
  (val) => {
    localItems.value = [...val];
  },
  { deep: true },
);

const isCustomizeMode = computed(() => dragContext.isGlobalDragMode);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
    <div
      v-for="item in localItems"
      :key="item.id"
      :class="[
        'transition-all duration-300 relative',
        isCustomizeMode
          ? 'cursor-default border-2 border-dashed border-gray-400 rounded-20 p-1'
          : '',
      ]"
    >
      <component :is="item.component" />
    </div>
  </div>
</template>
