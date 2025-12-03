/*
  Module: Data
  Purpose: Centralized mock/demo data for Service Providers feature components
*/

// Provider Status Data
export const providerStatus = {
  lastUpdated: "01:15:45",
  Airtel: 1,
  Jio: 1,
  Vi: 1,
  BSNL: 0,
  Synch: 1,
  "Text Local": 1,
  Equance: 1,
  Infobip: 0,
};

export function getStatusList(statusMap = providerStatus) {
  return Object.entries(statusMap)
    .filter(([key]) => key !== "lastUpdated")
    .map(([name, status]) => ({ name, status }));
}

// Provider Traffic Data
export const providerTrafficRaw = {
  lastUpdated: "01:15:45",
  Airtel: 25,
  Jio: 25,
  VI: 5,
  BSNL: 10,
  Synch: 0,
  "Text Local": 15,
  Equance: 10,
  Infobip: 10,
};

export const providerTrafficData = Object.entries(providerTrafficRaw)
  .filter(([key, value]) => key !== "lastUpdated" && value > 0)
  .map(([name, value]) => ({ name, value }));

// API Calls Today Data
export const apiCallsTodayRaw = {
  lastUpdated: "01:15:45",
  "12:00": 249495,
  "13:00": 4049392,
  "14:00": 232454,
  "15:00": 34545,
  "16:00": 155130,
};

export const apiCallsTodayData = Object.entries(apiCallsTodayRaw)
  .filter(([key]) => key !== "lastUpdated")
  .map(([time, value]) => ({ time, value }));

// API Calls by Provider Data
export const apiCallsByProviderRaw = {
  lastUpdated: "01:15:45",
  Airtel: { success: 20822, failed: 4191, total: 25013 },
  Jio: { success: 40011, failed: 15024, total: 55035 },
  VI: { success: 16609, failed: 3362, total: 19971 },
  Bsnl: { success: 20822, failed: 4191, total: 25013 },
  Infobip: { success: 40011, failed: 15024, total: 55035 },
  Tanla: { success: 16609, failed: 3362, total: 19971 },
  Synch: { success: 40011, failed: 15024, total: 55035 },
  Nexus: { success: 16609, failed: 3362, total: 19971 },
  RouteMobile: { success: 25678, failed: 556, total: 26234 },
  Kaleyra: { success: 23112, failed: 1788, total: 24900 },
  Twilio: { success: 35123, failed: 8000, total: 43123 },
  Nexmo: { success: 18900, failed: 3865, total: 22765 },
  TataTeleservices: { success: 16700, failed: 3176, total: 19876 },
  Sify: { success: 22600, failed: 2832, total: 25432 },
  MyOperator: { success: 13800, failed: 2743, total: 16543 },
  MSG91: { success: 32100, failed: 6801, total: 38901 },
};

export const apiCallsByProviderData = Object.keys(apiCallsByProviderRaw)
  .filter((key) => key !== "lastUpdated")
  .map((key) => {
    const item = apiCallsByProviderRaw[key];
    return {
      name: key,
      success: item.success ?? 0,
      failed: item.failed ?? 0,
    };
  });

// Delivery Reports Data
export const deliveryReportsRaw = {
  lastUpdated: "01:15:45",
  Airtel: { msgSubmitted: 20822, dlrReceived: 20822 },
  Jio: { msgSubmitted: 10000, dlrReceived: 7500 },
  VI: { msgSubmitted: 50000, dlrReceived: 25000 },
  Infobip: { msgSubmitted: 0, dlrReceived: 0 },
  Equence: { msgSubmitted: 10000, dlrReceived: 7500 },
  Synch: { msgSubmitted: 50000, dlrReceived: 25000 },
};

export const deliveryReportsData = Object.keys(deliveryReportsRaw)
  .filter((key) => key !== "lastUpdated")
  .map((key) => {
    const item = deliveryReportsRaw[key];
    return {
      name: key,
      msgSubmitted: item.msgSubmitted ?? 0,
      dlrReceived: item.dlrReceived ?? 0,
    };
  });

// Ongoing TPS Data
export const ongoingTPSRaw = {
  lastUpdated: "01:15:45",
  Airtel: 1253,
  Jio: 2739,
  VI: 1002,
  Bsnl: 1253,
  Tata: 2739,
  Equence: 1002,
  Tanla: 1253,
  Synch: 2739,
  Infobip: 1002,
};

export const ongoingTPSData = Object.keys(ongoingTPSRaw)
  .filter((key) => key !== "lastUpdated")
  .map((key) => ({
    name: key,
    value: ongoingTPSRaw[key],
  }));

// Average Latency Data
export const avgLatencyRaw = {
  lastUpdated: "01:15:45",
  Airtel: 90,
  Jio: 84,
  VI: 55,
  BSNL: 18,
  "Tata Tele": 32,
  Equence: 84,
  Tanla: 55,
  Infobip: 200,
  Synch: 32,
  RouteMobile: 47,
  Kaleyra: 63,
  Twilio: 28,
  Plivo: 35,
  Gupshup: 51,
  Exotel: 44,
};

export const avgLatencyData = Object.keys(avgLatencyRaw)
  .filter((key) => key !== "lastUpdated")
  .map((key) => ({
    name: key,
    value: avgLatencyRaw[key],
  }));

// Successful Transactions Data
export const successfulTransactionsRaw = {
  lastUpdated: "01:15:45",
  Airtel: { success: 20822 },
  Jio: { success: 40011 },
  VI: { success: 16609 },
  Bsnl: { success: 20822 },
  Infobip: { success: 40011 },
  Tanla: { success: 16609 },
  Synch: { success: 40011 },
  Equence: { success: 16609 },
};

export const successfulTransactionsData = Object.keys(successfulTransactionsRaw)
  .filter((key) => key !== "lastUpdated")
  .map((key) => ({
    name: key,
    value: successfulTransactionsRaw[key].success ?? 0,
  }));
