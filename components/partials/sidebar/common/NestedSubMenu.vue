<script setup lang="ts">
import { cn, isLocationMatch } from "@/utils";
import { useRoute } from "#app";
import { computed } from "vue";
import Collapsible from "@/components/ui/collapsible/Collapsible.vue";
import CollapsibleContent from "@/components/ui/collapsible/CollapsibleContent.vue";
const props = defineProps<{
  activeSubmenu: number | null;
  item: any;
  index: number;
  activeMultiMenu: number | null;
  title?: string;
  collapsed?: boolean;
  hovered?: boolean;
}>();

const emit = defineEmits(["toggleMultiMenu"]);

const route = useRoute();
const locationName = computed(() => route.path);
</script>

<template>
  <Collapsible :open="activeSubmenu === index">
    <CollapsibleContent class="CollapsibleContent">
      <ul
        class="sub-menu space-y-4 relative before:absolute before:left-4 before:top-0 before:h-[calc(100%-5px)] before:w-[3px] before:bg-primary/10 before:rounded"
      >
        <li
          v-for="(subItem, j) in item.child"
          :key="`sub_menu_${j}`"
          :class="
            cn(
              'block pl-9 first:pt-4 last:pb-4 relative before:absolute first:before:top-4 before:top-0 before:left-4 before:w-[3px]',
              {
                'before:bg-primary first:before:h-[calc(100%-16px)] before:h-full':
                  isLocationMatch(subItem.href, locationName),
                kk: activeSubmenu === index,
              }
            )
          "
        >
          <div v-if="subItem?.multi_menu">
            <MultiMenuHandler
              :subItem="subItem"
              :subIndex="j"
              :activeMultiMenu="activeMultiMenu"
              @toggleMultiMenu="emit('toggleMultiMenu', j)"
            />
            <MultiNestedMenu
              :subItem="subItem"
              :subIndex="j"
              :activeMultiMenu="activeMultiMenu"
            />
          </div>
          <SubMenuItem v-else :subItem="subItem" />
        </li>
      </ul>
    </CollapsibleContent>
  </Collapsible>
</template>
