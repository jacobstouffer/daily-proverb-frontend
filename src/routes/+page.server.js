import { createClient } from 'redis';


export async function load() {
  try {
    const client = createClient();
    client.on('error', err => console.error("Redis Client Error", err));
    await client.connect();
    const data = await client.json.get('featured-json');
    console.log("data:", JSON.stringify(data));
    await client.quit();
    if (!data?.Chapter) return null;
    return data;
  } catch (error) {
    console.log("Error getting featured proverb:", error);
    return null;
  }
}
