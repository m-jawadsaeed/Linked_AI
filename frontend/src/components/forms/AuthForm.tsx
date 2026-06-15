import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (values: { name?: string; email: string; password: string }) => Promise<void>;
  includeName?: boolean;
  submitLabel: string;
}

export const AuthForm = ({ onSubmit, includeName, submitLabel }: Props) => {
  const { register, handleSubmit } = useForm<{ name?: string; email: string; password: string }>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {includeName ? <input className="w-full rounded border border-slate-700 bg-slate-900 p-2" placeholder="Name" {...register("name", { required: true })} /> : null}
      <input className="w-full rounded border border-slate-700 bg-slate-900 p-2" placeholder="Email" {...register("email", { required: true })} />
      <input className="w-full rounded border border-slate-700 bg-slate-900 p-2" type="password" placeholder="Password" {...register("password", { required: true })} />
      <button className="rounded bg-cyan-500 px-4 py-2 font-medium text-slate-950" type="submit">
        {submitLabel}
      </button>
    </form>
  );
};