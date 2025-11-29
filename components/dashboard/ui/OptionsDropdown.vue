<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import Export12 from "./icons/Export12.vue";
import Resize12 from "./icons/Resize12.vue";
import Settings12 from "./icons/Settings12.vue";
import Refresh12 from "./icons/Refresh12.vue";

interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  onClick?: () => void;
}

const props = defineProps<{
  items?: MenuItem[];
  onAction?: (id: string) => void;
}>();

const open = ref(false);
const dropdownRef = ref(null);

onClickOutside(dropdownRef, () => {
  open.value = false;
});

const getIconById = (id: string) => {
  const key = id.toLowerCase();
  switch (key) {
    case "resize":
      return Resize12;
    case "export":
      return Export12;
    case "settings":
      return Settings12;
    case "refresh":
      return Refresh12;
    default:
      return null;
  }
};

const defaultItems: MenuItem[] = [
  { id: "resize", label: "Resize" },
  { id: "export", label: "Export" },
  { id: "settings", label: "Settings" },
  { id: "refresh", label: "Refresh" },
];

const menuItems =
  props.items && props.items.length > 0 ? props.items : defaultItems;

const itemsWithIcons = menuItems.map((item) => ({
  ...item,
  icon: item.icon ?? getIconById(item.id),
}));

const handleItemClick = (item: MenuItem) => {
  props.onAction?.(item.id);
  item.onClick?.();
  open.value = false;
};
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <!-- 3-dots trigger -->
    <button
      @click="open = !open"
      class="p-1 text-default-900 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
      >
        <g clip-path="url(#clip0_621_439)">
          <path
            d="M8 9.25C8.41421 9.25 8.75 8.91421 8.75 8.5C8.75 8.08579 8.41421 7.75 8 7.75C7.58579 7.75 7.25 8.08579 7.25 8.5C7.25 8.91421 7.58579 9.25 8 9.25Z"
            fill="currentColor"
          />
          <path
            d="M8 5C8.41421 5 8.75 4.66421 8.75 4.25C8.75 3.83579 8.41421 3.5 8 3.5C7.58579 3.5 7.25 3.83579 7.25 4.25C7.25 4.66421 7.58579 5 8 5Z"
            fill="currentColor"
          />
          <path
            d="M8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75C8.75 12.3358 8.41421 12 8 12C7.58579 12 7.25 12.3358 7.25 12.75C7.25 13.1642 7.58579 13.5 8 13.5Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_621_439">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="open"
      class="absolute right-0 mt-1 w-32 rounded-[4px] bg-white dark:bg-[#323E4E] border border-[#E5E5E5] dark:border-[#5C5C5C] shadow-[4px_2px_16px_rgba(0,0,0,0.12)] z-10"
    >
      <button
        v-for="(item, idx) in itemsWithIcons"
        :key="item.id || idx"
        @click="handleItemClick(item)"
        :class="[
          'w-full flex items-center gap-2 px-3 py-2 text-xs text-default-900 hover:bg-gray-100 dark:hover:bg-[#444] cursor-pointer',
          idx === 0 ? 'border-b border-[#E5E5E5] dark:border-[#5C5C5C]' : '',
        ]"
      >
        <component :is="item.icon" v-if="item.icon" class="w-3 h-3" />
        <span>{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>
