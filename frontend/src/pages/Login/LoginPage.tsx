import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../components/forms/AuthForm";
import { authService } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";

export const LoginPage = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Sign In</h1>
      <AuthForm
        submitLabel="Login"
        onSubmit={async (values) => {
          const response = await authService.login(values);
          setAccessToken(response.accessToken);
          navigate("/dashboard");
        }}
      />
    </div>
  );
};