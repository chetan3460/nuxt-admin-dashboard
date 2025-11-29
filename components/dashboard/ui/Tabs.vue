<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";

defineProps<{
  tabs: string[];
  activeTab: string;
}>();

const emit = defineEmits<{
  (e: "tabClick", tab: string): void;
}>();
</script>

<template>
  <div class="flex items-center justify-center">
    <!-- Mobile: Dropdown -->
    <div class="sm:hidden w-full max-w-xs mb-4 relative">
      <select
        :value="activeTab"
        @change="(e) => emit('tabClick', (e.target as HTMLSelectElement).value)"
        class="w-full rounded-full border border-primary bg-card py-2 pl-6 pr-10 text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
      >
        <option
          v-for="tab in tabs"
          :key="tab"
          :value="tab"
          :class="[
            activeTab === tab
              ? 'font-bold text-primary bg-primary/10'
              : 'text-gray-700',
          ]"
        >
          {{ tab }}
        </option>
      </select>
      <!-- Custom Arrow -->
      <ChevronDown
        class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary"
        :size="18"
      />
    </div>

    <!-- Desktop: Tabs -->
    <nav
      class="hidden sm:inline-flex p-1 gap-2 bg-card rounded-full mb-4"
      aria-label="Tabs"
    >
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="emit('tabClick', tab)"
        :class="[
          activeTab === tab
            ? 'border-primary text-primary bg-primary/10 rounded-full'
            : 'border-transparent text-gray-500 hover:border-primary hover:bg-primary/10 hover:text-primary',
          'whitespace-nowrap border py-2 px-6 text-sm font-semibold transition-colors duration-200 rounded-full',
        ]"
      >
        {{ tab }}
      </button>
    </nav>
  </div>
</template>
