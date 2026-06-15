export const hashtagTool = (topic: string) => {
  const base = topic.toLowerCase().replace(/[^a-z0-9]/g, "");
  return {
    trending: [`#${base}ai`, "#LinkedInGrowth", "#AIAutomation"],
    niche: [`#${base}strategy`, "#FoundersPlaybook", "#B2BSaaS"],
    broad: ["#Leadership", "#Innovation", "#Marketing"]
  };
};