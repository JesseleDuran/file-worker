export const createGeoLocationServiceMock = (error = false) => ({
    getLocations: async coordinates => {
        if (error) {
            throw new Error("Error Getting Location Details");
        }
        return coordinates.map(({lat, lon}, index) => ({lat, lon, postcode: index}))
    }
})


export class LocationRepositorySpy {
    constructor(error = false) {
        this.saveCalls = 0;
        this.lastSave = null;
        this.error = error;
    }

    save = locations => {
        if (this.error) throw Error("Error Saving Locations");
        this.saveCalls++;
        this.lastSave = locations;
    }

}