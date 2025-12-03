export const menusConfig = {
  mainNav: [
    {
      title: "Dashboard",
      icon: "lucide:layout-dashboard",
      child: [
        {
          title: "Dashboard V2",
          href: "/dashboard-v2",
          icon: "lucide:line-chart",
        },
      ],
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: "lucide:layout-dashboard",
        child: [
          {
            title: "Dashboard V2",
            href: "/dashboard-v2",
            icon: "lucide:line-chart",
          },
        ],
      },
    ],
    classic: [
      { isHeader: true, title: "menu" },
      {
        title: "Dashboard",
        icon: "lucide:layout-dashboard",
        href: "/dashboard-v2",
        isOpen: false,
        isHide: false,
        child: [
          {
            title: "Dashboard V2",
            href: "/dashboard-v2",
            icon: "lucide:line-chart",
          },
        ],
      },
    ],
  },
};
