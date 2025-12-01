<script setup lang="ts">
import { ref, onMounted, Teleport } from "vue";
import CriticalToast from "./CriticalToast.vue";

interface ToastNode {
  name: string;
  memory: number;
  threads: number;
}

interface Props {
  toasts: ToastNode[];
  iconSrc: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  removeToast: [name: string];
}>();

const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <Teleport to="body" v-if="mounted">
    <div
      class="fixed top-4 right-6 flex flex-col gap-2 z-[999999] pointer-events-none"
    >
      <CriticalToast
        v-for="node in toasts"
        :key="node.name"
        :node="node"
        :icon-src="iconSrc"
        @close="emit('removeToast', $event)"
      />
    </div>
  </Teleport>
</template>
