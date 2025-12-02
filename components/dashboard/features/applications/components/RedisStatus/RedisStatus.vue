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
import { exportCsv } from "@/utils/csv";
import { redisData } from "./data";
import { columns } from "./config";

const dragModeStore = useDragModeStore();

// Sorting state
const sortKey = ref<string>("name");
const sortDir = ref<"asc" | "desc">("asc");

// Format helpers
const formatFixed = (val: number, decimals: number): string => {
  return val?.toFixed(decimals) || "-";
};

const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    Active: "success",
    Inactive: "destructive",
    Degraded: "warning",
    Maintenance: "warning",
  };
  return statusMap[status] || "default";
};

// Sort data
const sortedRows = computed(() => {
  const rows = [...redisData.redis];
  if (!sortKey.value) return rows;

  return rows.sort((a, b) => {
    const key = sortKey.value as keyof typeof a;
    let aVal: any = a[key];
    let bVal: any = b[key];

    // Numeric comparison
    const aNum = parseFloat(aVal);
    const bNum = parseFloat(bVal);

    if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
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
    exportCsv("redis-status.csv", sortedRows.value);
  }
};

const isScrollable = computed(() => sortedRows.value.length > 6);
</script>

<template>
  <template>
    <div
      :class="{
        'border-2 border-dashed border-primary p-2 rounded-20':
          dragModeStore.isGlobalDragMode,
      }"
    >
      <Card class="h-full flex flex-col">
        <div class="flex items-center justify-between">
          <CardHeader>
            <CardTitle>Redis</CardTitle>
            <CardDescription>
              Last updated ({{ redisData.lastUpdated }})
            </CardDescription>
          </CardHeader>
          <div
            v-if="dragModeStore.isGlobalDragMode"
            class="cursor-grab flex items-center"
          >
            <DragHandleDots16 />
          </div>
          <OptionsDropdown v-else :onAction="handleAction" />
        </div>

        <CardContent class="flex-1">
          <div class="overflow-hidden">
            <div :class="isScrollable ? 'max-h-72 overflow-y-auto' : ''">
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
                    v-for="(row, idx) in sortedRows"
                    :key="row.name ?? idx"
                    :class="{
                      'bg-destructive-foreground/10 dark:bg-red-950/20':
                        row.status === 'Inactive',
                    }"
                  >
                    <TableCell>
                      <span class="inline-flex items-center gap-1 text-primary">
                        {{ row.name }}
                        <CriticalBadge v-if="row.exceededThreshold" />
                      </span>
                    </TableCell>
                    <TableCell class="text-default-900 dark:text-white">{{
                      row.host
                    }}</TableCell>
                    <TableCell>{{ formatFixed(row.cpu, 1) }}</TableCell>
                    <TableCell>{{ formatFixed(row.memory, 1) }}</TableCell>
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
    </div>
  </template>
</template>
