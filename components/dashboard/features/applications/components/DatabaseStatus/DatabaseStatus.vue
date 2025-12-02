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
import { databaseData, ioDetails } from "./data";
import { columns } from "./config";

const dragModeStore = useDragModeStore();

// Sorting state
const sortKey = ref<string>("name");
const sortDir = ref<"asc" | "desc">("asc");

// Format helpers
const formatFixed = (val: number, decimals: number): string => {
  return val?.toFixed(decimals) || "-";
};

const formatInteger = (val: number): string => {
  return val?.toString() || "-";
};

const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    active: "success",
    activating: "warning",
    Inactive: "destructive",
    Maintenance: "warning",
    ACTIVE: "success",
    Active: "success",
  };
  return statusMap[status] || "default";
};

// Sort data
const sortedRows = computed(() => {
  const rows = [...databaseData.database];
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
    exportCsv("database-status.csv", sortedRows.value);
  }
};

const isScrollable = computed(() => sortedRows.value.length > 6);

// I/O Details state
const openKey = ref<string | null>(null);

const toggleRow = (name: string) => {
  openKey.value = openKey.value === name ? null : name;
};
</script>

<template>
  <Card
    class="h-full flex flex-col"
    :class="{
      'border-2 border-dashed border-primary': dragModeStore.isGlobalDragMode,
    }"
  >
    <div class="flex items-center justify-between">
      <CardHeader>
        <CardTitle>Database</CardTitle>
        <CardDescription>
          Last updated ({{ databaseData.lastUpdated }})
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

    <CardContent class="flex-1 flex flex-col gap-6">
      <!-- Main Database Table -->
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
              <template v-for="(row, idx) in sortedRows" :key="row.name ?? idx">
                <TableRow
                  :class="{
                    'bg-destructive-foreground/10 dark:bg-red-950/20':
                      row.status === 'Inactive',
                  }"
                >
                  <TableCell>
                    <button
                      @click="toggleRow(row.name)"
                      class="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {{ row.name }}
                      <CriticalBadge v-if="row.exceededThreshold" />
                    </button>
                  </TableCell>
                  <TableCell class="text-default-900">{{ row.host }}</TableCell>
                  <TableCell>{{ formatFixed(row.cpu, 1) }}</TableCell>
                  <TableCell>{{ formatFixed(row.memory, 1) }}</TableCell>
                  <TableCell>{{ formatInteger(row.connections) }}</TableCell>
                  <TableCell>
                    <Badge :color="getStatusColor(row.status)">
                      {{ row.status }}
                    </Badge>
                  </TableCell>
                </TableRow>

                <!-- I/O Details Row -->
                <TableRow v-if="openKey === row.name">
                  <TableCell :colspan="6" class="p-0">
                    <div class="bg-[#DDDCF933]">
                      <div class="flex flex-col gap-1 border-b px-4 py-3">
                        <div class="text-xs font-medium flex items-center">
                          I/O DB details
                          <CriticalBadge
                            v-if="
                              ioDetails.database.some(
                                (d) =>
                                  d.type === 'Output DB' &&
                                  Number(d.records) >= 1000000
                              )
                            "
                            class="ml-1"
                          />
                        </div>
                        <div class="text-xs text-default-600">
                          Last updated: {{ ioDetails.lastUpdated }}
                        </div>
                      </div>
                      <Table>
                        <TableHeader
                          class="bg-[#F2F2FF] dark:bg-primary/10 rounded-[3px]"
                        >
                          <TableRow>
                            <TableHead class="p-3">Type</TableHead>
                            <TableHead class="p-3">Name</TableHead>
                            <TableHead class="p-3 text-right"
                              >No. of records</TableHead
                            >
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow
                            v-for="d in ioDetails.database"
                            :key="`${d.type}-${d.name}`"
                            :class="{
                              'bg-destructive-foreground/10 dark:bg-red-950/20':
                                d.type === 'Output DB' &&
                                Number(d.records) >= 1000000,
                            }"
                          >
                            <TableCell class="text-default-900">
                              <span class="inline-flex items-center">
                                {{ d.type }}
                                <CriticalBadge
                                  v-if="
                                    d.type === 'Output DB' &&
                                    Number(d.records) >= 1000000
                                  "
                                  class="ml-1"
                                />
                              </span>
                            </TableCell>
                            <TableCell class="font-medium">{{
                              d.name
                            }}</TableCell>
                            <TableCell class="text-right">
                              {{ Number(d.records).toLocaleString() }}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </TableCell>
                </TableRow>
              </template>
            </TableBody>
          </Table>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
