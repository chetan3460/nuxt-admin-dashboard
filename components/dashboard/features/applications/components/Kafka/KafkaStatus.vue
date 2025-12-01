<script setup lang="ts">
import { ref, computed } from "vue";
import { useDragModeStore } from "@/stores/dragMode";
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import Table from "@/components/ui/table/Table.vue";
import TableBody from "@/components/ui/table/TableBody.vue";
import TableCell from "@/components/ui/table/TableCell.vue";
import TableHead from "@/components/ui/table/TableHead.vue";
import TableHeader from "@/components/ui/table/TableHeader.vue";
import TableRow from "@/components/ui/table/TableRow.vue";
import Badge from "@/components/ui/badge/Badge.vue";
import DragHandleDots16 from "@/components/dashboard/ui/icons/DragHandleDots16.vue";
import OptionsDropdown from "@/components/dashboard/ui/OptionsDropdown.vue";
import CriticalBadge from "../shared/CriticalBadge.vue";
import SortableHeaderCell from "../shared/SortableHeaderCell.vue";
import ToastContainer from "./components/ToastContainer.vue";
import TopicDialog from "./components/TopicDialog.vue";
import { exportCsv } from "@/utils/csv";
import { kafkaData, MEMORY_THRESHOLD, THREADS_THRESHOLD } from "./data";
import { columns } from "./config";
import { useKafkaToasts } from "./composables/useKafkaToasts";

const dragModeStore = useDragModeStore();

// Sorting state
const sortKey = ref<string>("name");
const sortDir = ref<"asc" | "desc">("asc");

// Dialog state
const openRowIndex = ref<number | null>(null);

// Topic sorting state
const topicSortKey = ref<string>("topic");
const topicSortDir = ref<"asc" | "desc">("asc");
const visibleTopicCount = ref(10);
const loadingMore = ref(false);
const topicBatchSize = 10;

// Toast notifications
const { toasts, removeToast } = useKafkaToasts(kafkaData.rows, {
  memoryThreshold: MEMORY_THRESHOLD,
  threadsThreshold: THREADS_THRESHOLD,
});

// Format helpers
const formatFixed = (val: number, decimals: number): string => {
  return val?.toFixed(decimals) || "-";
};

const formatInteger = (val: number): string => {
  return val?.toString() || "-";
};

const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    Active: "success",
    Inactive: "destructive",
    Maintenance: "warning",
  };
  return statusMap[status] || "default";
};

// Sort data
const sortedRows = computed(() => {
  const rows = [...kafkaData.rows];
  if (!sortKey.value) return rows;

  return rows.sort((a, b) => {
    const key = sortKey.value as keyof typeof a;
    let aVal: any = a[key];
    let bVal: any = b[key];

    // Numeric comparison
    const aNum = parseFloat(aVal);
    const bNum = parseFloat(bVal);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return sortDir.value === "asc" ? aNum - bNum : bNum - aNum;
    }

    // String comparison
    const comparison = (aVal ?? "")
      .toString()
      .localeCompare((bVal ?? "").toString());
    return sortDir.value === "asc" ? comparison : -comparison;
  });
});

// Handle sort
const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortDir.value = "asc";
  }
};

// Handle actions
const handleAction = (id: string) => {
  if (id === "export") {
    exportCsv("kafka-status.csv", sortedRows.value);
  }
};

const isScrollable = computed(() => sortedRows.value.length > 6);

const hasWarning = computed(() => {
  return kafkaData.rows.some(
    (r) =>
      r.exceededThreshold ||
      (typeof r.memory === "number" && r.memory >= MEMORY_THRESHOLD) ||
      (typeof r.threads === "number" && r.threads >= THREADS_THRESHOLD) ||
      String(r.topicHealth).toLowerCase() === "warning"
  );
});

// Dialog computed properties
const activeRow = computed(() => {
  if (openRowIndex.value === null) return null;
  return sortedRows.value[openRowIndex.value] || null;
});

const sortedTopics = computed(() => {
  const topics = activeRow.value?.topics || [];
  if (!topicSortKey.value) return topics;

  return [...topics].sort((a, b) => {
    const key = topicSortKey.value as keyof typeof a;
    let aVal: any = a[key];
    let bVal: any = b[key];

    // Numeric comparison
    const aNum = parseFloat(aVal);
    const bNum = parseFloat(bVal);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return topicSortDir.value === "asc" ? aNum - bNum : bNum - aNum;
    }

    // String comparison
    const comparison = (aVal ?? "")
      .toString()
      .localeCompare((bVal ?? "").toString());
    return topicSortDir.value === "asc" ? comparison : -comparison;
  });
});

// Dialog handlers
const handleRowClick = (index: number) => {
  openRowIndex.value = index;
  visibleTopicCount.value = topicBatchSize;
};

const handleTopicScroll = () => {
  if (loadingMore.value || !sortedTopics.value.length) return;

  if (visibleTopicCount.value < sortedTopics.value.length) {
    loadingMore.value = true;
    setTimeout(() => {
      visibleTopicCount.value = Math.min(
        visibleTopicCount.value + topicBatchSize,
        sortedTopics.value.length
      );
      loadingMore.value = false;
    }, 600);
  }
};
</script>

<template>
  <Card class="h-full flex flex-col">
    <div class="flex items-center justify-between">
      <CardHeader>
        <div class="flex items-center gap-2">
          <DragHandleDots16
            v-if="dragModeStore.isGlobalDragMode"
            class="cursor-grab active:cursor-grabbing text-muted-foreground"
          />
          <CardTitle class="text-xl font-semibold flex items-center gap-2">
            Kafka
            <svg
              v-if="hasWarning"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33334 8 1.33334C4.3181 1.33334 1.33334 4.3181 1.33334 8C1.33334 11.6819 4.3181 14.6667 8 14.6667Z"
                fill="#F04438"
                fill-opacity="0.3"
                stroke="#F04438"
                stroke-width="1.33333"
              />
              <path
                d="M8 8V4.66666M8 11.3333H8.00667"
                stroke="#F04438"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </CardTitle>
        </div>
        <CardDescription>
          Last updated ({{ new Date().toLocaleTimeString() }})
        </CardDescription>
      </CardHeader>
      <div class="pr-6">
        <OptionsDropdown @action="handleAction" />
      </div>
    </div>

    <CardContent class="flex-1 min-h-0 overflow-hidden p-0">
      <div class="h-full flex flex-col">
        <div class="overflow-auto" :class="{ 'pr-2': isScrollable }">
          <Table>
            <TableHeader
              class="sticky top-0 z-10 bg-header-bg dark:bg-header-bg-dark"
            >
              <TableRow>
                <SortableHeaderCell
                  v-for="col in Object.values(columns)"
                  :key="col.key"
                  :label="col.label"
                  :column-key="col.key"
                  :sort-key="sortKey"
                  :sort-dir="sortDir"
                  @sort="handleSort"
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="(row, i) in sortedRows"
                :key="row.name"
                class="cursor-pointer hover:bg-muted/50 transition-colors"
                :class="{
                  'bg-destructive-foreground/10 dark:bg-red-950/20':
                    row.status === 'Inactive',
                }"
                @click="handleRowClick(i)"
              >
                <TableCell>
                  <span class="inline-flex items-center gap-1 text-primary">
                    {{ row.name }}
                    <CriticalBadge
                      v-if="
                        row.memory >= MEMORY_THRESHOLD ||
                        row.threads >= THREADS_THRESHOLD
                      "
                    />
                  </span>
                </TableCell>
                <TableCell class="text-default-900">{{ row.host }}</TableCell>
                <TableCell>{{ formatFixed(row.cpu, 2) }}</TableCell>
                <TableCell
                  :class="{
                    'text-destructive font-bold':
                      row.memory >= MEMORY_THRESHOLD,
                  }"
                >
                  {{ formatFixed(row.memory, 1) }}
                </TableCell>
                <TableCell
                  :class="{
                    'text-destructive font-bold':
                      row.threads >= THREADS_THRESHOLD,
                  }"
                >
                  {{ formatInteger(row.threads) }}
                </TableCell>
                <TableCell>{{ formatInteger(row.connections) }}</TableCell>
                <TableCell>{{ formatFixed(row.heapMb, 0) }}</TableCell>
                <TableCell>{{ row.topicHealth }}</TableCell>
                <TableCell>
                  <Badge :color="getStatusColor(row.status)">
                    {{ row.status }}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Toast notifications -->
  <ToastContainer
    :toasts="toasts"
    :icon-src="'/icons/system-critical.svg'"
    @removeToast="removeToast"
  />

  <!-- Topic Details Dialog -->
  <TopicDialog
    :open="openRowIndex !== null"
    @update:open="(val) => !val && (openRowIndex = null)"
    :active-row="activeRow"
    :topics="sortedTopics"
    v-model:topic-sort-key="topicSortKey"
    v-model:topic-sort-dir="topicSortDir"
    :visible-count="visibleTopicCount"
    :loading-more="loadingMore"
    @scroll="handleTopicScroll"
  />
</template>
