export const mentionTool = (people: string[] = [], companies: string[] = []) => {
  const formattedPeople = people.map((value) => `@${value.replace(/\s+/g, "")}`);
  const formattedCompanies = companies.map((value) => `@${value.replace(/\s+/g, "")}`);
  return [...formattedPeople, ...formattedCompanies];
};