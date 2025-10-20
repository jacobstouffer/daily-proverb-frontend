import { getDocument } from "../../../utils/documentdb";

export async function load({ params }) {
  const data = await getDocument(`${params.chapter}-${params.verse}`);
  if (!data?.Chapter) return null;
  return data;
}
