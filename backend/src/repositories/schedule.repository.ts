import { randomUUID } from "node:crypto";

export interface ScheduleRecord {
  id: string;
  userId: string;
  title: string;
  content: string;
  scheduledFor: string;
  createdAt: string;
}

const schedules = new Map<string, ScheduleRecord>();

export const scheduleRepository = {
  create: async (
    userId: string,
    title: string,
    content: string,
    scheduledFor: string,
  ) => {
    const schedule: ScheduleRecord = {
      id: randomUUID(),
      userId,
      title,
      content,
      scheduledFor,
      createdAt: new Date().toISOString(),
    };

    schedules.set(schedule.id, schedule);

    return schedule;
  },

  findByUserId: async (userId: string) =>
    [...schedules.values()]
      .filter((item) => item.userId === userId)
      .sort(
        (a, b) =>
          new Date(a.scheduledFor).getTime() -
          new Date(b.scheduledFor).getTime(),
      ),

  delete: async (id: string) => {
    schedules.delete(id);
  },
};
