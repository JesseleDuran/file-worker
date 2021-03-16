export default class SQLLocationRepository {

    constructor(client) {
        this.client = client;
    }

    save = async locations => { // We can Add Transactions Here
        for (const location of locations) {
            await this.insertLocation(location);
        }
    }

    insertLocation = async location => {
        const text = 'INSERT INTO locations(lat, lon, postcode) VALUES($1, $2, $3) RETURNING *'
        const values = [location.lat, location.lon, location.postcode];
        try {
            await this.client.query(text, values)
        } catch (err) {
            console.log(err.stack)
        }
    }
}