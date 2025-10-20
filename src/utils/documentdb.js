import { createClient } from 'redis';
import { USE_TEST_DATA } from '$env/static/private';
import { documentMap } from "../data/testData";

export async function getDocument(key) {
  try {
    if (USE_TEST_DATA === "true") {
      const testKey = ["references", "featured"].includes(key) ? key : "single-proverb";
      return documentMap[testKey];
    }
    const client = createClient();
    client.on('error', err => console.error("Redis Client Error", err));
    await client.connect();
    const data = await client.json.get(key);
    console.log("data:", JSON.stringify(data));
    await client.quit();
    return data;
  } catch (error) {
    console.log(`Error getting key ${key}: error`);
    return null;
  }
}
