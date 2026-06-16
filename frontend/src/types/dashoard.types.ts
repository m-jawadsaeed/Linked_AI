export interface DashboardStats {
  generatedPosts: number;
  publishedPosts: number;
  scheduledPosts: number;
  aiCredits: number;
}

export interface DashboardActivity {
  id: string;
  type: "generated" | "published" | "scheduled";
  title: string;
  createdAt: string;
}
