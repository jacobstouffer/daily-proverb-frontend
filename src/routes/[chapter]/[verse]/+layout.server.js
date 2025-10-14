import { BACKEND_URL } from '$env/static/private';

export async function load({ params }) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/proverbs/single-proverb?chapter=${params.chapter}&verse=${params.verse}`
    );

    if (!response.ok) {
      console.error(
        `Unable to get proverb ${params.chapter}:${params.verse}, status = ${response.status}`
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Unable to get proverb ${params.chapter}:${params.verse}, error = ${error}`);
    return null;
  }
}
