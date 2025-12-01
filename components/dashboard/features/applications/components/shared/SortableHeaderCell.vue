<script setup lang="ts">
import { computed } from "vue";
import TableHead from "@/components/ui/table/TableHead.vue";
import SortArrow from "./SortArrow.vue";

const props = defineProps<{
  label: string;
  columnKey: string;
  sortKey: string;
  sortDir: "asc" | "desc";
  sticky?: boolean;
  className?: string;
}>();

const emit = defineEmits<{
  (e: "sort", key: string): void;
}>();

const handleClick = () => {
  emit("sort", props.columnKey);
};

const isActive = computed(() => props.sortKey === props.columnKey);
</script>

<template>
  <TableHead
    class="cursor-pointer select-none hover:bg-muted/50"
    :class="[
      sticky
        ? 'sticky top-0 z-10 bg-header-bg dark:bg-header-bg-dark'
        : 'cursor-pointer',
      className,
    ]"
    @click="handleClick"
  >
    <div class="flex items-center gap-1 group">
      <span>{{ label }}</span>
      <SortArrow :dir="sortDir" :active="isActive" />
    </div>
  </TableHead>
</template>
