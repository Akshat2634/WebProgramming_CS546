//An index file that returns a function that attaches all your routes to your app
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/routes/index.js

import peopleRoutes from "./people.js";
import companyRoutes from "./companies.js";

const constructorMethod = (app) => {
  app.use("/people", peopleRoutes);
  app.use("/companies", companyRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Page Not found" });
  });
};

export default constructorMethod;
