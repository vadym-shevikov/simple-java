export enum SchoolType {
  GYMNASIUM = "GYMNASIUM",
  LYCEUM = "LYCEUM",
  GENERAL_SECONDARY = "GENERAL_SECONDARY",
}

export interface School {
  id: number;
  name: string;
  edrpou: string;
  region: string;
  type: SchoolType;
  isActive: boolean;
}

export interface SchoolCreateRequest {
  name: string;
  edrpou: string;
  region: string;
  type: SchoolType;
}

export const schoolTypeLabels: Record<SchoolType, string> = {
  [SchoolType.GYMNASIUM]: "Гімназія",
  [SchoolType.LYCEUM]: "Ліцей",
  [SchoolType.GENERAL_SECONDARY]: "ЗЗСО",
};
