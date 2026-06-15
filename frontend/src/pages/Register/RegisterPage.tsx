import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../components/forms/AuthForm";
import { authService } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";

export const RegisterPage = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Create Account</h1>
      <AuthForm
        includeName
        submitLabel="Register"
        onSubmit={async (values) => {
          const response = await authService.register(values);
          setAccessToken(response.accessToken);
          navigate("/dashboard");
        }}
      />
    </div>
  );
};