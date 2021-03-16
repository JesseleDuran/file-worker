import startHTTPServer from "./infrastructure/http/index.js"
import {createRepository} from "./infrastructure/config/repositories.js";
import {ProcessLocationFileAction } from "./infrastructure/config/actions.js";
import dotenv from "dotenv";
import { exec } from "child_process";
import {createService} from "./infrastructure/config/services.js";

const start = async () => {
    const repository = await createRepository(process.env);
    const service = await createService(process.env);
    const action = ProcessLocationFileAction(repository, service);
    exec('db-migrate up', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
    return startHTTPServer(process.env, action);
}
dotenv.config(); // JUST TO USE ON LOCAL ENVIRONMENT

start().then();


