import axios from "axios";
import { School, SchoolCreateRequest, SchoolType } from "../types/School";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const schoolApi = {
  getSchools: async (filters?: {
    region?: string;
    type?: SchoolType;
    isActive?: boolean;
  }): Promise<School[]> => {
    const params = new URLSearchParams();

    if (filters?.region) {
      params.append("region", filters.region);
    }
    if (filters?.type) {
      params.append("type", filters.type);
    }
    if (filters?.isActive !== undefined) {
      params.append("isActive", filters.isActive.toString());
    }

    const response = await api.get("/schools", { params });
    return response.data;
  },

  createSchool: async (school: SchoolCreateRequest): Promise<School> => {
    const response = await api.post("/schools", school);
    return response.data;
  },

  deactivateSchool: async (id: number): Promise<School> => {
    const response = await api.patch(`/schools/${id}/deactivate`);
    return response.data;
  },
};
