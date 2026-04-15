import axios from "axios";
import { type Entry, type NewEntry, type ValidationError } from "../types/types";

const baseUrl = "http://localhost:3000";

export const getAllEntries = async () => {
  try {
    const response = await axios.get<Entry[]>(baseUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createEntry = async (newEntry: NewEntry) => {
  try {
    const response = await axios.post<Entry>(baseUrl, newEntry);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      throw error.response?.data;
    } else {
      throw new Error("Unknown error");
    }
  }
};
