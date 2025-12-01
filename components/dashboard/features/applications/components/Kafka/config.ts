/*
  Module: Config
  Purpose: Column configuration for Kafka table
*/
export const columns = {
  name: { key: "name", label: "Name" },
  host: { key: "host", label: "Host name" },
  cpu: { key: "cpu", label: "CPU %" },
  memory: { key: "memory", label: "Memory %" },
  threads: { key: "threads", label: "Threads" },
  connections: { key: "connections", label: "Connections" },
  heapMb: { key: "heapMb", label: "Heap Mb" },
  health: { key: "topicHealth", label: "Topic Health" },
  status: { key: "status", label: "Status" },
};
