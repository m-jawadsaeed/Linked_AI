import { randomUUID } from "node:crypto";

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "USER" | "ADMIN";
  verified: boolean;
}

const users = new Map<string, UserRecord>();

export const userRepository = {
  findByEmail: async (email: string) => [...users.values()].find((item) => item.email === email) ?? null,
  findById: async (id: string) => users.get(id) ?? null,
  create: async (input: Omit<UserRecord, "id">) => {
    const record: UserRecord = { ...input, id: randomUUID() };
    users.set(record.id, record);
    return record;
  }
};