import axios from "axios";
import axiosRetry from "axios-retry";
import HTTPGeolocationService from "../services/HTTPGeolocationService.js"

export const createService = async ({GEOLOCATION_SERVICE_URL}) => {
    const client = axios.create({baseURL: GEOLOCATION_SERVICE_URL});
    axiosRetry(client, {retryDelay: axiosRetry.exponentialDelay, retries: 2});
    return new HTTPGeolocationService(client);
};
