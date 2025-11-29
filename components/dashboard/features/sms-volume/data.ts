export const smsData = {
  lastUpdated: "15:15:45",
};

export function getChartData(period: string, smsData: any) {
  switch (period) {
    case "Today":
      return [
        {
          time: "10:00",
          total: 45000,
          delivered: 38000,
          failed: 7000,
          retry: 0,
        },
        {
          time: "11:00",
          total: 89000,
          delivered: 72000,
          failed: 17000,
          retry: 0,
        },
        {
          time: "12:00",
          total: 155130,
          delivered: 77434,
          failed: 22575,
          retry: 55121,
        },
        {
          time: "13:00",
          total: 155130,
          delivered: 77434,
          failed: 22575,
          retry: 55121,
        },
        {
          time: "14:00",
          total: 155130,
          delivered: 77434,
          failed: 22575,
          retry: 55121,
        },
        {
          time: "15:00",
          total: 155130,
          delivered: 77434,
          failed: 22575,
          retry: 55121,
        },
        {
          time: "16:00",
          total: 140000,
          delivered: 110000,
          failed: 30000,
          retry: 55121,
        },
        {
          time: "17:00",
          total: 95000,
          delivered: 78000,
          failed: 17000,
          retry: 12200,
        },
      ];
    case "This week":
      return [
        {
          time: "Mon",
          total: 280000,
          delivered: 260000,
          failed: 20000,
          retry: 15000,
        },
        {
          time: "Tue",
          total: 320000,
          delivered: 300000,
          failed: 20000,
          retry: 18000,
        },
        {
          time: "Wed",
          total: 290000,
          delivered: 270000,
          failed: 20000,
          retry: 16000,
        },
        {
          time: "Thu",
          total: 350000,
          delivered: 330000,
          failed: 20000,
          retry: 22000,
        },
        {
          time: "Fri",
          total: 420000,
          delivered: 400000,
          failed: 20000,
          retry: 28000,
        },
        {
          time: "Sat",
          total: 220000,
          delivered: 210000,
          failed: 10000,
          retry: 14000,
        },
        {
          time: "Sun",
          total: 180000,
          delivered: 170000,
          failed: 10000,
          retry: 12000,
        },
      ];
    case "This month":
      return [
        {
          time: "Week 1",
          total: 1850000,
          delivered: 1720000,
          failed: 130000,
          retry: 280000,
        },
        {
          time: "Week 2",
          total: 2120000,
          delivered: 1980000,
          failed: 140000,
          retry: 320000,
        },
        {
          time: "Week 3",
          total: 1980000,
          delivered: 1850000,
          failed: 130000,
          retry: 290000,
        },
        {
          time: "Week 4",
          total: 2350000,
          delivered: 2210000,
          failed: 140000,
          retry: 350000,
        },
      ];
    default:
      return [];
  }
}

export const providerObj = {
  lastUpdated: "01:15:45",
  Airtel: { total: 25013 },
  Jio: { total: 55035 },
  VI: { total: 19971 },
  Bsnl: { total: 25013 },
  Infobip: { total: 55035 },
  Tanla: { total: 19971 },
  Synch: { total: 55035 },
  Equence: { total: 19971 },
  RouteMobile: { total: 31234 },
  Kaleyra: { total: 27890 },
  Twilio: { total: 43123 },
  Nexmo: { total: 22765 },
  TataTeleservices: { total: 19876 },
  Sify: { total: 25432 },
  MyOperator: { total: 16543 },
  MSG91: { total: 38901 },
};

export function getProviderChartData(providerData: any) {
  const obj = providerData || providerObj;
  const chartData = Object.entries(obj)
    .filter(([k]) => k !== "lastUpdated")
    .map(([name, val]: [string, any]) => ({
      name,
      total: typeof val === "object" && val !== null ? val.total ?? 0 : 0,
    }))
    .sort((a, b) => b.total - a.total);

  const lastUpdated =
    (providerData && providerData.lastUpdated) || providerObj.lastUpdated;
  return { chartData, lastUpdated };
}

export function getDeptChartData(deptData: any) {
  // Fallback demo data
  const fallback = [
    { name: "Marketing", value: 28000, success: 20000, failed: 8000 },
    { name: "Support", value: 35000, success: 30000, failed: 5000 },
    { name: "HR", value: 22000, success: 18000, failed: 4000 },
    { name: "Admin", value: 18000, success: 15000, failed: 3000 },
    { name: "Credit", value: 12000, success: 10000, failed: 2000 },
    { name: "Loan", value: 8000, success: 7000, failed: 1000 },
    { name: "Sales", value: 26000, success: 22000, failed: 4000 },
    { name: "Finance", value: 14000, success: 12000, failed: 2000 },
    { name: "Compliance", value: 9000, success: 8000, failed: 1000 },
    { name: "IT", value: 20000, success: 18000, failed: 2000 },
    { name: "Operations", value: 30000, success: 26000, failed: 4000 },
    { name: "Legal", value: 6000, success: 5200, failed: 800 },
    { name: "Product", value: 24000, success: 21000, failed: 3000 },
    { name: "Engineering", value: 27000, success: 23000, failed: 4000 },
    { name: "QA", value: 11000, success: 9500, failed: 1500 },
    { name: "Procurement", value: 13000, success: 11000, failed: 2000 },
  ];
  return { chartData: fallback, lastUpdated: "01:15:45" };
}
