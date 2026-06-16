import { http } from "../api/http";

export interface ScheduleItem {
  id: string;
  title: string;
  content: string;
  scheduledFor: string;
  createdAt: string;
}

export interface CreateScheduleInput {
  title: string;
  content: string;
  scheduledFor: string;
}

export const scheduleService = {
  getAll: (token: string) =>
    http<ScheduleItem[]>("/schedule", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  create: (token: string, input: CreateScheduleInput) =>
    http<ScheduleItem>("/schedule", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(input),
    }),

  delete: (token: string, id: string) =>
    http<void>(`/schedule/${id}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
