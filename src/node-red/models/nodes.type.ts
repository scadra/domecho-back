export type BaseNode = {
  id: string;
  type: string;
  //FlowId
  z: string;
  x: string;
  y: string;
  name: string;
  configName?: string;
  wires: Array<Array<string>>;
};

export type FunctionNode = {
  func: string;
  outputs: number;
  noerr: number;
  initialize: string;
  finalize: string;
  libs: Array<unknown>;
} & BaseNode;

export type HttpResponseNode = {
  statusCode: string;
  headers: unknown;
} & BaseNode;

export type HttpInNode = {
  url: string;
  method: string;
  upload: boolean;
  swaggerDoc: string;
} & BaseNode;

export type FileInNode = {
  filename: string;
  format: string;
  chunk: boolean;
  sendError: boolean;
  encoding: string;
} & BaseNode;

export type FileNode = {
  property: string;
} & BaseNode;

export type TadoNode = {
  apiCall: string;
  homeId: string;
  deviceId: string;
  zoneId: string;
  power: string;
  temperature: string;
  terminationType: string;
  terminationTimeout: string;
  fanSpeed: string;
  acMode: string;
  reportDate: string;
  presence: string;
  geoTracking: string;
  temperatureOffset: string;
  windowDetection: boolean;
  windowDetectionTimeout: number;
  openWindowMode: boolean;
  timetableId: string;
} & BaseNode;

export type GlobalNode =
  | FunctionNode
  | HttpResponseNode
  | HttpInNode
  | FileInNode
  | FileNode
  | TadoNode;
