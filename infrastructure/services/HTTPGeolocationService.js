export default class HTTPGeolocationService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getLocations = async coordinates => {
        try {
            const res = await this.httpClient.post("/", {coordinates});
            return res.data;
        }catch (e) {
            console.log(e)
            throw Error("Error Getting Locations")
        }
    }
}