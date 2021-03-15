import express from "express"
import { fileUploadHandlerMaker } from "./handlers/Requests.js"
import multer from "multer";
import fs from "fs";


const start = ({PORT, ...envs}, action) => {

    const app = express();

    const requestHandler = fileUploadHandlerMaker(action);

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if (!fs.existsSync('./files')){
                fs.mkdirSync('./files');
            }
            cb(null, './files')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })

    const uploader = multer({ storage });
    app.post("/upload", uploader.single("file"), requestHandler);
    app.listen(PORT, () => {
        console.log(`Mi Aguila File Worker Service listening at ${PORT}`)
    });
    return app;
}

export default start;