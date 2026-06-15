import { HttpError } from "../errors/http-error.js";
import { userRepository } from "../repositories/user.repository.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { tokenService } from "./token.service.js";

export const authService = {
  register: async (input: { name: string; email: string; password: string }) => {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      throw new HttpError(409, "Email already in use");
    }

    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash: await hashPassword(input.password),
      role: "USER",
      verified: false
    });

    const tokens = await tokenService.issueTokenPair(user);
    return { user, ...tokens };
  },

  login: async (input: { email: string; password: string }) => {
    const user = await userRepository.findByEmail(input.email);
    if (!user || !(await comparePassword(input.password, user.passwordHash))) {
      throw new HttpError(401, "Invalid credentials");
    }

    const tokens = await tokenService.issueTokenPair(user);
    return { user, ...tokens };
  }
};