import { getDocument } from "../utils/documentdb";

export async function load() {
  const data = await getDocument("featured");
  if (!data?.Chapter) return null;
  return data;
}
