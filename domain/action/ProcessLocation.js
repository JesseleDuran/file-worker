export default class ProcessLocation {

    constructor(locationRepository, geoLocationService) {
        this.locationRepository = locationRepository;
        this.geoLocationService = geoLocationService;
    }

    execute = async coordinates => {
        try {
            const locations = await this.geoLocationService.getLocations(coordinates);
            await this.locationRepository.save(locations);
        } catch (e) {
            console.log("ERROR PROCESSING", coordinates.length, "Coordinates");
            console.trace(e);
        }
    }
}

