import ProcessLocation from "../../domain/action/ProcessLocation.js";
import ProcessLocationFile from "../../domain/action/ProcessLocationFile.js";

export const ProcessLocationFileAction = (repository, service) => {
    const action = new ProcessLocation(repository, service);
    return new ProcessLocationFile(action);
}
