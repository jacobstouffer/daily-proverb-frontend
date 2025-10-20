import { getDocument } from "../utils/documentdb";

export async function load() {
  const data = await getDocument("references");
  if (!data?.chapters || !data?.verses) return null;
  return data;
}
