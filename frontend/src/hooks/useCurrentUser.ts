import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

export const useCurrentUser = () => {
  const token = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: ["me", token],
    queryFn: () => authService.me(token!),
    enabled: Boolean(token)
  });
};