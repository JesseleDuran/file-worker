import {describe, it} from "mocha";
import chai from "chai";
import ProcessLocation from "../../action/ProcessLocation.js";
import {createGeoLocationServiceMock, LocationRepositorySpy} from "./mocks.js";

const {expect} = chai;


describe("Given an instance of the Process Location Action", () => {
    describe("When the GeolocationService Explodes", () => {
        const explosionService = createGeoLocationServiceMock(true);
        const repository = new LocationRepositorySpy();
        const action = new ProcessLocation(repository, explosionService)

        it('The action shouldn"t save anything', async () => {
            await action.execute([{lat: 1, lon: 1}])
            expect(repository.lastSave).to.be.null
            expect(repository.saveCalls).to.be.equal(0)
        });
    });

    describe("When the LocationRepository Explodes", () => {
        const explosionService = createGeoLocationServiceMock();
        const repository = new LocationRepositorySpy(true);
        const action = new ProcessLocation(repository, explosionService)

        it('The action shouldn"t save anything', async () => {
            await action.execute([{lat: 1, lon: 1}])
            expect(repository.lastSave).to.be.null
            expect(repository.saveCalls).to.be.equal(0)
        });
    });

    describe("When the process goes OK", () => {
        const explosionService = createGeoLocationServiceMock();
        const repository = new LocationRepositorySpy();
        const action = new ProcessLocation(repository, explosionService)

        it('The action should run only 1 save call', async () => {
            await action.execute([{lat: 1, lon: 1}])
            expect(repository.lastSave).to.not.be.null
            expect(repository.saveCalls).to.be.equal(1)
        });
    });

})

