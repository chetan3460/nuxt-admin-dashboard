<script setup lang="ts">
import { ref, computed } from "vue";
import { useDragModeStore } from "@/stores/dragMode";
import Table from "@/components/ui/table/Table.vue";
import TableBody from "@/components/ui/table/TableBody.vue";
import TableCell from "@/components/ui/table/TableCell.vue";
import TableHead from "@/components/ui/table/TableHead.vue";
import TableHeader from "@/components/ui/table/TableHeader.vue";
import TableRow from "@/components/ui/table/TableRow.vue";
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import DragHandleDots16 from "@/components/dashboard/ui/icons/DragHandleDots16.vue";
import OptionsDropdown from "@/components/dashboard/ui/OptionsDropdown.vue";
import { exportCsv } from "@/utils/csv";
import { servers as serverData } from "./data";

const dragModeStore = useDragModeStore();

// Column definitions
const columnLabels: Record<string, string> = {
  host: "Host",
  cpu: "CPU %",
  memory: "Memory %",
  threads: "Threads",
  disk: "Disk %",
  io: "IO (r/w)",
  exceededThreshold: "Threshold",
};

// Sorting state
const sortKey = ref<string>("host");
const sortDir = ref<"asc" | "desc">("asc");

// Get table keys from data
const tableKeys = computed(() => {
  if (Array.isArray(serverData) && serverData.length > 0) {
    return Object.keys(serverData[0]).filter(
      (k) => k !== "timestamp" && k !== "componentType"
    );
  }
  return [
    "host",
    "cpu",
    "memory",
    "threads",
    "disk",
    "io",
    "exceededThreshold",
  ];
});

// Calculate last updated time
const lastUpdated = computed(() => {
  const times = (serverData || [])
    .map((s) => Date.parse(s?.timestamp))
    .filter((t) => Number.isFinite(t));

  if (times.length > 0) {
    return new Date(Math.max(...times)).toLocaleString("en-GB", {
      hour12: false,
    });
  }
  return "N/A";
});

// Parse IO value for sorting
const parseIO = (ioStr: string): number => {
  if (!ioStr) return 0;
  const [r, w] = String(ioStr)
    .split("/")
    .map((v) => parseFloat(v.trim()));

  if (Number.isFinite(r) && Number.isFinite(w)) return r + w;
  if (Number.isFinite(r)) return r;
  if (Number.isFinite(w)) return w;
  return 0;
};

// Sort data
const sortedServers = computed(() => {
  if (!sortKey.value || !serverData.length) return serverData;

  return [...serverData].sort((a, b) => {
    const key = sortKey.value;
    let aVal: any = a?.[key as keyof typeof a];
    let bVal: any = b?.[key as keyof typeof b];

    // Special handling for IO column
    if (key === "io") {
      aVal = parseIO(aVal);
      bVal = parseIO(bVal);
    }

    // Special handling for exceededThreshold
    if (key === "exceededThreshold") {
      aVal = aVal ? 1 : 0;
      bVal = bVal ? 1 : 0;
    }

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

// Format cell value
const formatCell = (srv: any, key: string): string => {
  if (key === "exceededThreshold") return srv?.[key] ? "Exceeded" : "OK";
  if (srv?.[key] == null || srv?.[key] === "") return "-";
  if (["cpu", "memory", "disk"].includes(key)) return `${srv[key]}%`;
  return srv[key];
};

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
    exportCsv("server-statistics.csv", sortedServers.value);
  }
};

// Check if scrollable
const isScrollable = computed(() => sortedServers.value.length > 8);
</script>

<template>
  <Card class="h-full flex flex-col">
    <div class="flex items-center justify-between mb-5">
      <CardHeader>
        <CardTitle>Server Statistics</CardTitle>
        <CardDescription>Last updated ({{ lastUpdated }})</CardDescription>
      </CardHeader>
      <div
        v-if="dragModeStore.isGlobalDragMode"
        class="cursor-grab flex items-center"
      >
        <DragHandleDots16 />
      </div>
      <OptionsDropdown v-else :onAction="handleAction" />
    </div>

    <div class="overflow-hidden flex-1">
      <div :class="isScrollable ? 'max-h-72 overflow-y-auto' : ''">
        <Table>
          <TableHeader class="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead
                v-for="key in tableKeys"
                :key="key"
                class="cursor-pointer select-none hover:bg-muted/50"
                @click="handleSort(key)"
              >
                <div class="flex items-center gap-1">
                  <span>{{ columnLabels[key] || key }}</span>
                  <span v-if="sortKey === key" class="text-xs">
                    {{ sortDir === "asc" ? "↑" : "↓" }}
                  </span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow v-if="sortedServers.length === 0">
              <TableCell :colspan="tableKeys.length" class="p-4 text-center">
                No server rows to display
              </TableCell>
            </TableRow>
            <TableRow
              v-for="(srv, idx) in sortedServers"
              :key="srv?.host ?? `srv-${idx}`"
            >
              <TableCell
                v-for="key in tableKeys"
                :key="key"
                :class="
                  key === 'exceededThreshold' && srv?.[key]
                    ? 'text-destructive'
                    : ''
                "
              >
                {{ formatCell(srv, key) }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </Card>
</template>
