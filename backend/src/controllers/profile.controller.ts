import { Request, Response } from "express";

import { userRepository } from "../repositories/user.repository.js";

import { getAuthUser } from "../utils/get-auth-user.js";

export const profileController = {
  me: async (req: Request, res: Response) => {
    const authUser = getAuthUser(req);

    const user = await userRepository.findById(authUser.sub);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      verified: user.verified,
    });
  },
};
