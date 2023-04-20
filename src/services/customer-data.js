import { BASE_URL } from './constants';

const GET_USER_DETAILS_ENDPOINT = `${BASE_URL}/user`;
const ADD_USER_ENDPOINT = `${BASE_URL}/adduser`;
const PUBLISH_EVENT_ENDPOINT = `${BASE_URL}/publish`;


export const getGeoLocationDetails = async () => {
  try {
    const response = await fetch(GET_USER_DETAILS_ENDPOINT);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching Geo location details:", error);
  }
};

export const addVisitorDetails = async (details) => {
  try {
    const response = await fetch(`${ADD_USER_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding visitor details:", error);
  }
};

export const publishEvent = async (event, params) => {
  try {
    const url = new URL(PUBLISH_EVENT_ENDPOINT);
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    return await response.json();
  } catch (error) {
    console.error("Error publishing event:", error);
  }
};
