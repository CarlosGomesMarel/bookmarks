export interface TelemetryDto {
  id: number;
  timestamp: Date;
  name: string;
  message: string;
  additionalMessage: string;
  cloudRoleName: string;
  operationName: string;
  method: string;
  area: string;
  siteId: string;
  context: string;
  appName: string;
  uploadedTimestamp: Date;
  jsonData: object;
  itemId: string;
  hashCode: number;
  queryId: number;
}

export const DefaultTelemetryDto: TelemetryDto = {
  id: 0,
  hashCode: 0,
  timestamp: null,
  name: "",
  message: "",
  additionalMessage: "",
  cloudRoleName: "",
  operationName: "",
  method: "",
  appName: "",
  area: "",
  siteId: "",
  context: "",
  uploadedTimestamp: null,
  itemId: "",
  jsonData: null,
  queryId: 0,
};
