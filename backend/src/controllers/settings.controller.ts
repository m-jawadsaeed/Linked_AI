import { Request, Response } from "express";

import { userRepository } from "../repositories/user.repository.js";
import { getAuthUser } from "../utils/get-auth-user.js";

interface UpdateSettingsBody {
  name: string;
}

export const settingsController = {
  updateProfile: async (req: Request, res: Response) => {
    const authUser = getAuthUser(req);

    const body = req.body as UpdateSettingsBody;

    const user = await userRepository.findById(authUser.sub);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = body.name;

    return res.json({
      message: "Settings updated",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        verified: user.verified,
      },
    });
  },
};
