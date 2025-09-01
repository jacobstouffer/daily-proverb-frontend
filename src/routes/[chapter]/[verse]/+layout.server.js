import { post } from "./data.js";
import { USE_TEST_DATA } from '$env/static/private';


export function load() {
  console.log("use test data:", USE_TEST_DATA);
  if (USE_TEST_DATA === "true") {
    return post;
  } else {
    return null;
  }
}
