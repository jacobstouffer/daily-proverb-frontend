import { BACKEND_URL, FREQUENCY } from '$env/static/private';

export async function load() {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/proverbs/${FREQUENCY}-featured`
    );

    if (!response.ok) {
      console.error(
        `Unable to get featured proverb, status = ${response.status}`
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Unable to get featured proverb, error = ${error}`
    );
    return null;
  }
}
