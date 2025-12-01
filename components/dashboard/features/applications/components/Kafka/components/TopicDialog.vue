<script setup lang="ts">
import { computed } from "vue";
import Dialog from "@/components/ui/dialog/Dialog.vue";
import DialogContent from "@/components/ui/dialog/DialogContent.vue";
import DialogHeader from "@/components/ui/dialog/DialogHeader.vue";
import DialogTitle from "@/components/ui/dialog/DialogTitle.vue";
import Table from "@/components/ui/table/Table.vue";
import TableBody from "@/components/ui/table/TableBody.vue";
import TableCell from "@/components/ui/table/TableCell.vue";
import TableHead from "@/components/ui/table/TableHead.vue";
import TableHeader from "@/components/ui/table/TableHeader.vue";
import TableRow from "@/components/ui/table/TableRow.vue";
import SortArrow from "../../shared/SortArrow.vue";

interface Topic {
  topic: string;
  messages: number;
}

interface ActiveRow {
  name: string;
  topics?: Topic[];
}

interface Props {
  open: boolean;
  activeRow: ActiveRow | null;
  topics: Topic[];
  topicSortKey: string;
  topicSortDir: "asc" | "desc";
  visibleCount: number;
  loadingMore: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:open": [value: boolean];
  "update:topicSortKey": [value: string];
  "update:topicSortDir": [value: "asc" | "desc"];
  scroll: [];
}>();

const handleSortClick = () => {
  emit("update:topicSortKey", "topic");
  const newDir =
    props.topicSortKey === "topic" && props.topicSortDir === "asc"
      ? "desc"
      : "asc";
  emit("update:topicSortDir", newDir);
};

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  const bottomReached =
    target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
  if (bottomReached) {
    emit("scroll");
  }
};

const visibleTopics = computed(() => {
  return props.topics.slice(0, props.visibleCount);
});
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {{ activeRow ? `${activeRow.name} Details` : "Details" }}
        </DialogTitle>
      </DialogHeader>

      <div v-if="!topics?.length" class="p-4 text-center text-muted-foreground">
        No topics available for this Kafka node.
      </div>

      <div
        v-else
        class="max-h-[240px] overflow-y-auto overscroll-contain"
        @scroll="handleScroll"
      >
        <Table>
          <TableHeader class="sticky top-0 z-10 bg-[#DADAFA] dark:bg-[#33445B]">
            <TableRow>
              <TableHead
                role="button"
                tabindex="0"
                class="cursor-pointer"
                @click="handleSortClick"
                @keydown.enter="handleSortClick"
                @keydown.space.prevent="handleSortClick"
              >
                <span class="inline-flex items-center">
                  Topic
                  <SortArrow
                    :dir="topicSortDir"
                    :active="topicSortKey === 'topic'"
                  />
                </span>
              </TableHead>
              <TableHead class="text-right">No. of messages</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(t, i) in visibleTopics" :key="t?.topic ?? i">
              <TableCell>{{ t?.topic ?? "-" }}</TableCell>
              <TableCell class="text-right">
                {{ t?.messages?.toLocaleString?.() ?? "N/A" }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div v-if="loadingMore" class="flex items-center justify-center py-4">
          <span
            class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 dark:border-gray-700 dark:border-t-gray-200"
            aria-label="Loading more topics"
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
