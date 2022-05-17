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
      {
        name: "Sprints",
        href: "https://dev.azure.com/innovamps/Innova/_sprints/backlog/Cornell/Innova/Beta/Cornell",
        tags: [],
      },
      {
        name: "Pipelines",
        href: "https://dev.azure.com/innovamps/Innova/_build?definitionScope=%5CMarel%20Connect%5Cmc-pno-services",
        tags: [],
      },
      {
        name: "Releases",
        href: "https://dev.azure.com/innovamps/Innova/_release?view=all&path=%5CPlanning&_a=releases",
        tags: [],
      },
      {
        name: "Deployments",
        href: "https://portal.azure.com/#@mareldigital.com/resource/subscriptions/095f3138-cbfa-4777-ab4d-760b92d586ee/subdeployments",
        tags: [],
      },
      {
        name: "Deployments (SBOX)",
        href: "https://portal.azure.com/#@mareldigital.com/resource/subscriptions/a4168068-5051-4529-a67f-f363f912d0cf/subdeployments",
        tags: [],
      },
      {
        name: "Workbooks (INT)",
        href: "https://portal.azure.com/#@mareldigital.com/resource/subscriptions/095f3138-cbfa-4777-ab4d-760b92d586ee/resourceGroups/md-i-euw-pno-rg/providers/microsoft.insights/components/md-i-euw-pno-ai/workbooks",
        tags: [],
      },
      {
        name: "Workbooks (PROD)",
        href: "https://portal.azure.com/#@mareldigital.com/resource/subscriptions/a7970eba-3a9e-48eb-93d3-76a992a64cff/resourceGroups/md-p-euw-pno-rg/providers/microsoft.insights/components/md-p-euw-pno-ai/workbooks",
        tags: [],
      },
      {
        name: "Simulator IOT Edge",
        href: "https://portal.azure.com/#blade/Microsoft_Azure_IotHub/StandaloneFrameBlade/path/%2Fdevices%2Fdevice%3FdeviceId%3Dmd-i-euw-pno-sim-edge/title/md-i-euw-pno-sim-edge/resourceId/%2Fsubscriptions%2F095f3138-cbfa-4777-ab4d-760b92d586ee%2FresourceGroups%2Fmd-i-euw-iot-rg%2Fproviders%2FMicrosoft.Devices%2FIotHubs%2Fmd-i-euw-iot-ih",
        tags: [],
      },
    ],
  },
  {
    name: "Devops",
    backgroundColor: "",
    color: "",
    children: [
      {
        name: "Confluence",
        href: "https://mymarel.atlassian.net/wiki/spaces/MC/pages/2255455245/Team+Cornell",
        tags: ["DevOps"],
      },
      {
        name: "ARM Pipeline",
        href: "https://dev.azure.com/innovamps/Innova/_build?definitionId=411&_a=summary",
        tags: ["DevOps"],
      },
      {
        name: "Tech Debt",
        href: "https://dev.azure.com/innovamps/Innova/_workitems/edit/95768",
        tags: ["DevOps"],
      },
      {
        name: "Bug Fixes",
        href: "https://innovamps.visualstudio.com/Innova/_workitems/edit/94047",
        tags: ["DevOps"],
      },
      {
        name: "Pipelines (Insights)",
        href: "https://dev.azure.com/innovamps/Innova/_build?definitionScope=%5CMarel%20Connect%5Cmc-insights-monitor",
        tags: ["DevOps"],
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
        tags: ["General"],
      },
      {
        name: "On Boarding",
        href: "https://mymarel.atlassian.net/wiki/spaces/MC/pages/1774452738/On-Boarding+-+Team+Supersonics+Flamingo",
        tags: ["Misc"],
      },
      {
        name: "Workday",
        href: "https://wd3.myworkday.com/marel/d/home.htmld",
        tags: ["Misc"],
      },
    ],
  },
  {
    name: "Portal",
    backgroundColor: "",
    color: "",
    children: [
      {
        name: "PIM",
        href: "https://portal.azure.com/#blade/Microsoft_Azure_PIMCommon/ActivationMenuBlade/azurerbac",
        tags: ["Portal"],
      },
      {
        name: "Deployments",
        href: "https://portal.azure.com/#@mareldigital.com/resource/subscriptions/095f3138-cbfa-4777-ab4d-760b92d586ee/subdeployments",
        tags: ["Portal"],
      },
      {
        name: "Deployments (SBOX)",
        href: "https://portal.azure.com/#@mareldigital.com/resource/subscriptions/a4168068-5051-4529-a67f-f363f912d0cf/subdeployments",
        tags: ["Portal"],
      },
      {
        name: "Workbooks (INT)",
        href: "https://portal.azure.com/#@mareldigital.com/resource/subscriptions/095f3138-cbfa-4777-ab4d-760b92d586ee/resourceGroups/md-i-euw-pno-rg/providers/microsoft.insights/components/md-i-euw-pno-ai/workbooks",
        tags: ["Portal"],
      },
      {
        name: "Workbooks (PROD)",
        href: "https://portal.azure.com/#@mareldigital.com/resource/subscriptions/a7970eba-3a9e-48eb-93d3-76a992a64cff/resourceGroups/md-p-euw-pno-rg/providers/microsoft.insights/components/md-p-euw-pno-ai/workbooks",
        tags: ["Portal"],
      },
      {
        name: "Simulator IOT Edge",
        href: "https://portal.azure.com/#blade/Microsoft_Azure_IotHub/StandaloneFrameBlade/path/%2Fdevices%2Fdevice%3FdeviceId%3Dmd-i-euw-pno-sim-edge/title/md-i-euw-pno-sim-edge/resourceId/%2Fsubscriptions%2F095f3138-cbfa-4777-ab4d-760b92d586ee%2FresourceGroups%2Fmd-i-euw-iot-rg%2Fproviders%2FMicrosoft.Devices%2FIotHubs%2Fmd-i-euw-iot-ih",
        tags: ["Portal"],
      },
      {
        name: "LPP Iot Edge (PROD)",
        href: "https://portal.azure.com/#blade/Microsoft_Azure_IotHub/StandaloneFrameBlade/path/%2Fdevices%2Fdevice%3FdeviceId%3D089bdc01-1f88-4997-ff74-08d976a9d13f/title/089bdc01-1f88-4997-ff74-08d976a9d13f/resourceId/%2Fsubscriptions%2Fa7970eba-3a9e-48eb-93d3-76a992a64cff%2FresourceGroups%2Fmd-p-euw-iot-rg%2Fproviders%2FMicrosoft.Devices%2FIotHubs%2Fmd-p-euw-iot-ih",
        tags: ["Portal"],
      },
      {
        name: "Iot Edges (PROD)",
        href: "https://portal.azure.com/#@mareldigital.com/resource/subscriptions/a7970eba-3a9e-48eb-93d3-76a992a64cff/resourceGroups/md-p-euw-iot-rg/providers/Microsoft.Devices/IotHubs/md-p-euw-iot-ih/EdgeExplorer",
        tags: ["Portal"],
      },
      {
        name: "Management Portal (INT)",
        href: "https://md-i-euw-portals-mgmt-ui.azurewebsites.net/identity/tenants",
        tags: ["Portal"],
      },
      {
        name: "Deployments (PROD)",
        href: "https://portal.azure.com/#@mareldigital.com/resource/subscriptions/a7970eba-3a9e-48eb-93d3-76a992a64cff/subdeployments",
        tags: ["Portal"],
      },
    ],
  },
  {
    name: "localhost services",
    backgroundColor: "",
    color: "",
    children: [
      {
        name: "Cosmos Db",
        href: "https://localhost:8081/_explorer/index.html",
        tags: ["localhost"],
      },
      {
        name: "Azurite",
        href: "http://127.0.0.1:10000",
        tags: ["localhost"],
      },
    ],
  },
  {
    name: "Planning (Local)",
    backgroundColor: "",
    color: "",
    children: [
      {
        name: "Portal (Local)",
        href: "http://localhost:4400/",
        tags: ["Planning", "Local"],
      },
      {
        name: "Planning Swagger (Local)",
        href: "http://localhost:5021/swagger",
        tags: ["Planning", "Local"],
      },
      {
        name: "Customer Planning Swagger (Local)",
        href: "http://localhost:5031/api/planning/customer/swagger/ui",
        tags: ["Planning", "Local"],
      },
      {
        name: "Ingestion Swagger (Local)",
        href: "http://localhost:5071/api/planning/ingestion/swagger/ui",
        tags: ["Planning", "Local"],
      },
      {
        name: "Settings Swagger (Local)",
        href: "http://localhost:5041/api/planning/settings/swagger/ui",
        tags: ["Planning", "Local"],
      },
      {
        name: "Optimization Swagger (Local)",
        href: "http://localhost:5051/api/planning/optimization/swagger/ui",
        tags: ["Planning", "Local"],
      },
      {
        name: "Insights Swagger (Local)",
        href: "http://localhost:5091/api/insights/swagger/ui",
        tags: ["Planning", "Local"],
      },
    ],
  },
  {
    name: "Planning (INT)",
    backgroundColor: "",
    color: "",
    children: [
      {
        name: "Portal (INT)",
        href: "https://md-i-euw-portals-pno-ui.azurewebsites.net/",
        tags: ["Planning", "INT"],
      },
      {
        name: "Planning Swagger (INT)",
        href: "https://md-i-euw-pno-appsvc.azurewebsites.net/swagger",
        tags: ["Planning", "INT"],
      },
      {
        name: "Customer Planning Swagger (INT)",
        href: "https://md-i-euw-pno-customer-fa.azurewebsites.net/api/planning/customer/swagger/ui",
        tags: ["Planning", "INT"],
      },
      {
        name: "Ingestion Swagger (INT)",
        href: "https://md-i-euw-pno-ingestion-fa.azurewebsites.net/api/planning/ingestion/swagger/ui",
        tags: ["Planning", "INT"],
      },
      {
        name: "Settings Swagger (INT)",
        href: "https://md-i-euw-pno-settings-fa.azurewebsites.net/api/planning/settings/swagger/ui",
        tags: ["Planning", "INT"],
      },
      {
        name: "Optimization Swagger (INT)",
        href: "https://md-i-euw-pno-optimize-fa.azurewebsites.net/api/planning/optimization/swagger/ui",
        tags: ["Planning", "INT"],
      },
      {
        name: "Scheduler Service (INT) - 1b110872-c0cf-4bca-b2fb-8645f5f792ca",
        href: "https://md-i-euw-scheduler-svc-api.azurewebsites.net/swagger/index.html",
        tags: ["Planning", "INT"],
      },
      {
        name: "Optimization Results (INT)",
        href: "https://mcieuwpnostg.blob.core.windows.net/optimization-service/Results.html?sp=r&st=2021-01-20T05:04:15Z&se=2022-01-20T13:04:15Z&spr=https&sv=2019-12-12&sr=b&sig=D6zlVE12OAo7zMcd9N7maV%2B8NVooeyXRQEKkILPuRNc%3D",
        tags: ["Planning", "INT"],
      },
      {
        name: "AIMMS Optimization Container (INT)",
        href: "https://portal.azure.com/#@mareldigital.com/resource/subscriptions/095f3138-cbfa-4777-ab4d-760b92d586ee/resourceGroups/md-i-euw-pno-rg/providers/Microsoft.ContainerInstance/containerGroups/md-i-euw-pno-opt-aimms-ci/overview",
        tags: ["Planning", "INT"],
      },
    ],
  },
  {
    name: "Planning (PROD)",
    backgroundColor: "",
    color: "",
    children: [
      {
        name: "Portal (PROD)",
        href: "https://md-p-euw-portals-pno-ui.azurewebsites.net/",
        tags: ["Planning", "PROD"],
      },
      {
        name: "Planning Swagger (PROD)",
        href: "https://md-p-euw-pno-appsvc.azurewebsites.net/swagger",
        tags: ["Planning", "PROD"],
      },
      {
        name: "Customer Planning Swagger (PROD)",
        href: "https://md-p-euw-pno-customer-fa.azurewebsites.net/api/planning/customer/swagger/ui",
        tags: ["Planning", "PROD"],
      },
      {
        name: "Ingestion Swagger (PROD)",
        href: "https://md-p-euw-pno-ingestion-fa.azurewebsites.net/api/planning/ingestion/swagger/ui",
        tags: ["Planning", "PROD"],
      },
      {
        name: "Settings Swagger (PROD)",
        href: "https://md-p-euw-pno-settings-fa.azurewebsites.net/api/planning/settings/swagger/ui",
        tags: ["Planning", "PROD"],
      },
      {
        name: "Optimization Swagger (PROD)",
        href: "https://md-p-euw-pno-optimize-fa.azurewebsites.net/api/planning/optimization/swagger/ui",
        tags: ["Planning", "PROD"],
      },
      {
        name: "Scheduler Service (PROD) - 1b110872-c0cf-4bca-b2fb-8645f5f792ca",
        href: "https://md-p-euw-scheduler-svc-api.azurewebsites.net/swagger/index.html",
        tags: ["Planning", "PROD"],
      },
      {
        name: "Optimization Results (PROD)",
        href: "https://mcieuwpnostg.blob.core.windows.net/optimization-service/Results.html?sp=r&st=2021-01-20T05:04:15Z&se=2022-01-20T13:04:15Z&spr=https&sv=2019-12-12&sr=b&sig=D6zlVE12OAo7zMcd9N7maV%2B8NVooeyXRQEKkILPuRNc%3D",
        tags: ["Planning", "PROD"],
      },
      {
        name: "AIMMS Optimization Container (PROD)",
        href: "https://portal.azure.com/#@mareldigital.com/resource/subscriptions/a7970eba-3a9e-48eb-93d3-76a992a64cff/resourceGroups/md-p-euw-pno-rg/providers/Microsoft.ContainerInstance/containerGroups/md-p-euw-pno-opt-aimms-ci/containers",
        tags: ["Planning", "PROD"],
      },
    ],
  },
];
