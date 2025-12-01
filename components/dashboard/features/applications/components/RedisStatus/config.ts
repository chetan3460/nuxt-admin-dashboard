/*
  Module: Config
  Purpose: Column configuration for Redis table
*/
export const columns = {
  name: { key: "name", label: "Name" },
  host: { key: "host", label: "Host name" },
  cpu: { key: "cpu", label: "CPU %" },
  memory: { key: "memory", label: "Memory %" },
  status: { key: "status", label: "Status" },
};
