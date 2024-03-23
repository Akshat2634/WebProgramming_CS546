// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import validation from "../data/validation.js";
import { isNumber, isValidDate } from "../helpers.js";
import { productData } from "../data/index.js";
import { Router } from "express";
const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    try {
      const products = await productData.getAll();
      res.json(products);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const productInfo = req.body;
    if (!productInfo || Object.keys(productInfo).length === 0) {
      res
        .status(400)
        .json({ error: "You must provide data to create a product" });
      return;
    }

    try {
      let {
        productName,
        productDescription,
        modelNumber,
        price,
        manufacturer,
        manufacturerWebsite,
        keywords,
        categories,
        dateReleased,
        discontinued,
      } = productInfo;

      const fields = [
        productName,
        productDescription,
        modelNumber,
        price,
        manufacturer,
        manufacturerWebsite,
        keywords,
        categories,
        dateReleased,
        discontinued,
      ];

      for (const field of fields) {
        if (field === undefined) {
          res.status(400).json({ error: "All fields must be supplied" });
          return;
        }
      }

      const stringFields = [
        productName,
        productDescription,
        modelNumber,
        manufacturer,
        manufacturerWebsite,
        dateReleased,
      ];

      try {
        for (const field of stringFields) {
          validation.checkString(field, "field");
        }
      } catch (e) {
        res.status(400).json({
          error:
            "Error: All fields (productName, productDescription, modelNumber, manufacturer, manufacturerWebsite, dateReleased) must be supplied and should be non-empty strings.",
        });
        return;
      }

      if (
        !isNumber(price) ||
        price <= 0 ||
        price.toFixed(2) !== price.toString()
      ) {
        res.status(400).json({
          error:
            "Price must be a number greater than 0 with no more than 2 decimal places",
        });
        return;
      }

      if (
        !manufacturerWebsite.startsWith("http://www.") ||
        !manufacturerWebsite.endsWith(".com") ||
        manufacturerWebsite.length < 20
      ) {
        res.status(400).json({
          error:
            "Manufacturer website must start with 'http://www.', end with '.com', and have at least 5 characters in between",
        });
        return;
      }

      try {
        const arrFields = [keywords, categories];
        arrFields.forEach((field) => {
          if (
            !Array.isArray(field) ||
            field.length === 0 ||
            !field.every(
              (item) => typeof item === "string" && item.trim().length > 0
            )
          ) {
            throw new Error(
              "Keywords and categories must be non-empty arrays with at least one non-empty string"
            );
          }
        });
      } catch (e) {
        res.status(400).json({ error: e.message });
        return;
      }

      if (!isValidDate(dateReleased)) {
        res.status(400).json({
          error:
            "Date released must be in the format 'mm/dd/yyyy' and be a valid date",
        });
        return;
      }

      let hasError = false;
      let errorMessage = "";

      if (typeof discontinued !== "boolean") {
        hasError = true;
        errorMessage = "Discontinued must be a boolean";
      }

      if (hasError) {
        res.status(400).json({ error: errorMessage });
        return;
      }

      productName = productName.trim();
      productDescription = productDescription.trim();
      modelNumber = modelNumber.trim();
      manufacturer = manufacturer.trim();
      manufacturerWebsite = manufacturerWebsite.trim();
      dateReleased = dateReleased.trim();
      keywords = keywords.map((keyword) => keyword.trim());
      categories = categories.map((category) => category.trim());

      const newProduct = await productData.create(
        productName,
        productDescription,
        modelNumber,
        price,
        manufacturer,
        manufacturerWebsite,
        keywords,
        categories,
        dateReleased,
        discontinued
      );

      res.status(200).json(newProduct);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  });

router
  .route("/:productId")
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.productId = validation.checkId(req.params.productId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const product = await productData.get(req.params.productId);
      return res.status(200).json(product);
    } catch (e) {
      return res.status(404).json({ error: "Product not found" });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.productId = validation.checkId(req.params.productId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let product = await productData.get(req.params.productId);
    } catch (e) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    try {
      const product = await productData.remove(req.params.productId);
      return res.status(200).json({ _id: product._id, deleted: true });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    let productId = req.params.productId;
    try {
      req.params.productId = validation.checkId(req.params.productId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let product = await productData.get(productId);
    } catch (e) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    const productUpdates = req.body;

    const requiredFields = [
      "productName",
      "productDescription",
      "modelNumber",
      "price",
      "manufacturer",
      "manufacturerWebsite",
      "keywords",
      "categories",
      "dateReleased",
      "discontinued",
    ];

    const stringFields = [
      "productName",
      "productDescription",
      "modelNumber",
      "manufacturer",
      "manufacturerWebsite",
      "dateReleased",
    ];

    for (let field of requiredFields) {
      if (!productUpdates.hasOwnProperty(field)) {
        res.status(400).json({ error: `Missing required field: ${field}` });
        return;
      }
    }
    let field;
    try {
      for (field of stringFields) {
        productUpdates[field] = validation.checkString(
          productUpdates[field],
          field
        );
      }
    } catch (e) {
      res.status(400).json({ error: `Invalid value for field: ${field}` });
      return;
    }

    if (
      !isNumber(productUpdates.price) ||
      productUpdates.price <= 0 ||
      productUpdates.price.toFixed(2) !== productUpdates.price.toString()
    ) {
      res.status(400).json({
        error:
          "Price must be a number greater than 0 with no more than 2 decimal places",
      });
      return;
    }

    if (
      !productUpdates.manufacturerWebsite.startsWith("http://www.") ||
      !productUpdates.manufacturerWebsite.endsWith(".com") ||
      productUpdates.manufacturerWebsite.length < 20
    ) {
      res.status(400).json({
        error:
          "Manufacturer website must start with 'http://www.', end with '.com', and have at least 5 characters in between",
      });
      return;
    }

    try {
      const arrFields = [productUpdates.keywords, productUpdates.categories];
      arrFields.forEach((field) => {
        if (
          !Array.isArray(field) ||
          field.length === 0 ||
          !field.every(
            (item) => typeof item === "string" && item.trim().length > 0
          )
        ) {
          throw new Error(
            "Keywords and categories must be non-empty arrays with at least one non-empty string"
          );
        }
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
      return;
    }

    if (!isValidDate(productUpdates.dateReleased)) {
      res.status(400).json({
        error:
          "Date released must be in the format 'mm/dd/yyyy' and be a valid date",
      });
      return;
    }

    let hasError = false;
    let errorMessage = "";

    if (typeof productUpdates.discontinued !== "boolean") {
      hasError = true;
      errorMessage = "Discontinued must be a boolean";
    }

    if (hasError) {
      res.status(400).json({ error: errorMessage });
      return;
    }

    try {
      productId = validation.checkId(productId);
      const updatedProduct = await productData.update(
        productId,
        productUpdates.productName,
        productUpdates.productDescription,
        productUpdates.modelNumber,
        productUpdates.price,
        productUpdates.manufacturer,
        productUpdates.manufacturerWebsite,
        productUpdates.keywords,
        productUpdates.categories,
        productUpdates.dateReleased,
        productUpdates.discontinued
      );

      if (!updatedProduct) {
        throw "Product not found";
      }

      res.status(200).json(updatedProduct);
      return;
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  });

export default router;
