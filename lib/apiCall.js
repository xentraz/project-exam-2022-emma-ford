import { apiURL } from './apiURL';

const axios = require('axios').default;

export async function getPlaces(url) {
  const response = await fetch(url);
  const data = await response.json();
  try {
  } catch (error) {}
  return data;
}