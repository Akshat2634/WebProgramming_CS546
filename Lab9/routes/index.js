//Here you will require route files and export them as used in previous labs.
import textDecoderRouter from "./textdecoder.js";

const constructorMethod = (app) => {
    app.use("/", textDecoderRouter);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Route Not Found" });
    });
};

export default constructorMethod;