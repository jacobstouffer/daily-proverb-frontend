import { BACKEND_URL } from '$env/static/private';

export async function load() {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/proverbs/list-references`
    );

    if (!response.ok) {
      console.error(
        `Unable to get proverb chapters and verses, status = ${response.status}`
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(
        `Unable to get proverb chapters and verses, error = ${error}`
    );
    return null;
  }
}
