/* eslint-disable @typescript-eslint/no-explicit-any */
import { Section } from ".";

export const DefaultBookmarks: Section[] = <any[]>[
  {
    name: "Quick Links",
    backgroundColor: "",
    color: "",
    children: [
      {
        name: "PIM",
        href: "https://portal.azure.com/#blade/Microsoft_Azure_PIMCommon/ActivationMenuBlade/azurerbac",
        tags: [],
      },
    ],
  },
  {
    name: "Misc",
    backgroundColor: "",
    color: "",
    children: [
      {
        name: "logout",
        href: "https://login.microsoftonline.com/common/oauth2/v2.0/logout",
        tags: [],
      },
      {
        name: "Marel",
        href: "https://marel.com/",
        tags: [],
      },
      {
        name: "Travel",
        href: "https://travel.mycwt.com/",
        tags: [],
      },
      {
        name: "ADP - Workforce",
        href: "https://workforcenow.adp.com/workforcenow/login.html",
        tags: [],
      },
    ],
  },
  {
    name: "Documentation",
    backgroundColor: "",
    color: "",
    children: [
      {
        name: "Azure Iot Edge",
        href: "https://docs.microsoft.com/en-us/azure/iot-edge/",
        tags: [],
      },
    ],
  },
];
