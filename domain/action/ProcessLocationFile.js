const LINES_PER_BUFFER = 1000;

export default class ProcessLocationFile {
    constructor(processLocationAction) {
        this.processLocationAction = processLocationAction;
    }

    execute = async fileLineGetter => {
        let buffer = [];
        let line;
        while (line = fileLineGetter.next()) {
            try {
                const coordinate = this.toCoordinate(line);
                buffer.push(coordinate);
                if (buffer.length >= LINES_PER_BUFFER) {
                    await this.processLocationAction.execute(buffer);
                    buffer = []; // Set the buffer as Empty!
                }
            } catch (e) {
                // Ignore Explosive lines!
            }
        }
    }

    toCoordinate = line => {
        const values = line.toString('utf-8').split(",");
        const lat = Number(values[0]);
        const lon = Number(values[1]);

        if (Number.isNaN(lat) || Number.isNaN(lon)) {
            throw Error("Error Parsing Latitude or Longitude, Not A Number!")
        }

        return {
            lat,
            lon
        }
    }
}