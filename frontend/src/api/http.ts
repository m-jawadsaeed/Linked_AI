const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export const http = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message);
  }

  return response.json();
};