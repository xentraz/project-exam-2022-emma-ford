const axios = require('axios').default;

export async function getAPI(url) {
  const response = await fetch(url);
  const data = await response.json();
  try {
  } catch (error) {}
  return data;
}