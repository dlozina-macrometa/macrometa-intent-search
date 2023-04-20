import { BASE_URL } from './constants';

const GET_SPECIFIC_SHOE_ENDPOINT = `${BASE_URL}/shoes`;
const GET_ALL_SHOES_ENDPOINT = `${BASE_URL}/shoes`;
const GET_RECOMMENDATIONS_ENDPOINT = `${BASE_URL}/recommendation`;
const GET_SEARCH_RESULTS_ENDPOINT = `${BASE_URL}/search`;


export const fetchAllShoes = async () => {
  try {
    const response = await fetch(GET_ALL_SHOES_ENDPOINT);
    const data = await response.json();

    // Extract the 'result' array from the data
    const shoes = data.result;

    return shoes;
  } catch (error) {
    console.error("Error fetching shoes:", error);
    return [];
  }
};

export const fetchShoeDetails = async (_key) => {
  try {
    const response = await fetch(GET_SPECIFIC_SHOE_ENDPOINT + `/${_key}`);
    const data = await response.json();

    // Extract the 'result' array from the data
    const shoes = data.result[0];
    return shoes;
  } catch (error) {
    console.error("Error fetching shoe:", error);
    return [];
  }
};

export const runSearch = async (searchData) => {
  try {
    const response = await fetch(`${GET_SEARCH_RESULTS_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData),
    });
    const data = await response.json();
    // Extract the 'result' array from the data
    const shoes = data.result;

    return shoes;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};

export const getRecommendations = async (visitorDetails) => {
  try {
    const response = await fetch(`${GET_RECOMMENDATIONS_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitorDetails),
    });
    const data = await response.json();
    // Extract the 'result' array from the data
    const shoes = data.result;

    return shoes;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};
