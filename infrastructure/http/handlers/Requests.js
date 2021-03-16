import lineByLine from "n-readlines";

const validExtensions = ["csv"];

const getExtension = filename => filename.split('.').pop();

export const fileUploadHandlerMaker = action => async (req, res) => {
    if (!req.file) {
        res.status(400)
            .send("Error Uploading File: There's no file");
        return;
    }

    const extension = getExtension(req.file.originalname);

    if (!validExtensions.includes(extension)) {
        res.status(400)
            .send(`Invalid File Extension ${extension}, valid extensions are ${validExtensions.join(",")}`);
        return;
    }

    res.status(201).send("Processing File");


    const liner = new lineByLine(req.file.path);

    await action.execute(liner);

}
