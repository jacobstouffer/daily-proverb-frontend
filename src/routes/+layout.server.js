import { getDocument } from "../utils/documentdb";

export async function load() {
  const data = await getDocument("references");
  const featured = await getDocument("featured");
  if (!data?.chapters || !data?.verses) return null;
  return {
    ...data,
    featuredStartVerse: featured?.StartVerse,
    featuredEndVerse: featured?.EndVerse,
    featuredChapter: featured?.Chapter
  };
}
