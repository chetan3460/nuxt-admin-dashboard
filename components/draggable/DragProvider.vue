<script setup lang="ts">
import { ref, provide } from "vue";

const isGlobalDragMode = ref(false);
// Track which containers have unsaved changes
const pendingChanges = ref<Set<string>>(new Set());

const toggleGlobalDragMode = () => {
  if (isGlobalDragMode.value && pendingChanges.value.size > 0) {
    if (confirm("You have unsaved layout changes. Save them?")) {
      // On save, just clear the flag; containers already saved to localStorage
      pendingChanges.value.clear();
    } else {
      // On cancel, reload page to revert (simple approach for now)
      pendingChanges.value.clear();
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  }
  isGlobalDragMode.value = !isGlobalDragMode.value;
};

provide("dragContext", {
  isGlobalDragMode,
  toggleGlobalDragMode,
  pendingChanges: pendingChanges.value,
});
</script>

<template>
  <slot />
</template>
