// This data file should export all functions using the ES6 standard as shown in the lecture code
import { ObjectId } from "mongodb";
import { isNumber, isValidDate } from "../helpers.js";
import { products } from "../config/mongoCollections.js";
import validation from "./validation.js";

const exportedMethods = {
  async create(
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
  ) {
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
    fields.forEach((field) => {
      if (field === undefined) {
        throw "All fields must be supplied";
      }
    });

    const stringFields = [
      productName,
      productDescription,
      modelNumber,
      manufacturer,
      manufacturerWebsite,
      dateReleased,
    ];
    stringFields.forEach((field) => {
      if (typeof field !== "string" || field.trim().length === 0) {
        throw "All string fields must be strings";
      }
    });

    productName = validation.checkString(productName, "productName");
    productDescription = validation.checkString(
      productDescription,
      "productDescription"
    );
    manufacturer = validation.checkString(manufacturer, "manufacturer");
    manufacturerWebsite = validation.checkString(
      manufacturerWebsite,
      "manufacturerWebsite"
    );
    dateReleased = validation.checkString(dateReleased, "dateReleased");

    if (!isNumber(price) || price <= 0) {
      throw "Price must be a number ";
    }
    let decimalPart = price.toString().split(".")[1];
    if (decimalPart && decimalPart.length > 2) {
      throw "Price must have no more than 2 decimal places";
    }
    manufacturerWebsite = manufacturerWebsite.trim();
    if (
      !manufacturerWebsite.startsWith("http://www.") ||
      !manufacturerWebsite.endsWith(".com") ||
      manufacturerWebsite.length < 20
    ) {
      throw "Manufacturer website must start with 'http://www.', end with '.com', and have at least 5 characters in between";
    }
    const arrFields = [keywords, categories];
    arrFields.forEach((field) => {
      if (
        !Array.isArray(field) ||
        field.length === 0 ||
        !field.every(
          (item) => typeof item === "string" && item.trim().length > 0
        )
      ) {
        throw "Keywords and categories must be non-empty arrays with at least one non-empty string";
      }
    });
    dateReleased = dateReleased.trim();
    if (!isValidDate(dateReleased)) {
      throw "Date released must be in the format 'mm/dd/yyyy";
    }

    if (typeof discontinued !== "boolean") {
      throw "Discontinued must be a boolean";
    }
    productName = productName.trim();
    productDescription = productDescription.trim();
    modelNumber = modelNumber.trim();
    manufacturer = manufacturer.trim();
    manufacturerWebsite = manufacturerWebsite.trim();
    dateReleased = dateReleased.trim();
    keywords = keywords.map((keyword) => keyword.trim());
    categories = categories.map((category) => category.trim());

    let newProduct = {
      productName: productName,
      productDescription: productDescription,
      modelNumber: modelNumber,
      price: price,
      manufacturer: manufacturer,
      manufacturerWebsite: manufacturerWebsite,
      keywords: keywords,
      categories: categories,
      dateReleased: dateReleased,
      discontinued: discontinued,
      averageRating: 0,
      reviews: [],
    };
    const productsCollection = await products();
    const insertInfo = await productsCollection.insertOne(newProduct);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw "Could not add product";
    }
    const newId = insertInfo.insertedId.toString();
    const product = await this.get(newId);

    return product;
  },

  async getAll() {
    const productsCollection = await products();
    const productsList = await productsCollection
      .find({}, { projection: { _id: 1, productName: 1 } })
      .toArray();
    return productsList;
  },

  async get(productId) {
    productId = validation.checkId(productId);
    const productsCollection = await products();
    const product = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (product === null) {
      throw "No product with that id";
    }
    return product;
  },

  async remove(productId) {
    productId = validation.checkId(productId);
    const productsCollection = await products();
    const deletionInfo = await productsCollection.deleteOne({
      _id: new ObjectId(productId),
    });
    if (!deletionInfo.acknowledged || deletionInfo.deletedCount === 0) {
      throw `Could not delete product with id ${productId}`;
    }
    return { _id: productId, deleted: true };
  },

  async update(
    productId,
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
  ) {
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
    fields.forEach((field) => {
      if (field === undefined) {
        throw "All fields must be supplied";
      }
    });

    const stringFields = [
      productName,
      productDescription,
      modelNumber,
      manufacturer,
      manufacturerWebsite,
      dateReleased,
    ];
    stringFields.forEach((field) => {
      if (typeof field !== "string" || field.trim().length === 0) {
        throw "All string fields must be strings";
      }
    });
    productId = validation.checkId(productId);
    productName = validation.checkString(productName, "productName");
    productDescription = validation.checkString(
      productDescription,
      "productDescription"
    );
    manufacturer = validation.checkString(manufacturer, "manufacturer");
    manufacturerWebsite = validation.checkString(
      manufacturerWebsite,
      "manufacturerWebsite"
    );
    dateReleased = validation.checkString(dateReleased, "dateReleased");

    if (!isNumber(price) || price <= 0) {
      throw "Price must be a number ";
    }
    let decimalPart = price.toString().split(".")[1];
    if (decimalPart && decimalPart.length > 2) {
      throw "Price must have no more than 2 decimal places";
    }

    manufacturerWebsite = manufacturerWebsite.trim();
    if (
      !manufacturerWebsite.startsWith("http://www.") ||
      !manufacturerWebsite.endsWith(".com") ||
      manufacturerWebsite.length < 20
    ) {
      throw "Manufacturer website must start with 'http://www.', end with '.com', and have at least 5 characters in between";
    }
    const arrFields = [keywords, categories];
    arrFields.forEach((field) => {
      if (
        !Array.isArray(field) ||
        field.length === 0 ||
        !field.every(
          (item) => typeof item === "string" && item.trim().length > 0
        )
      ) {
        throw "Keywords and categories must be non-empty arrays of non-empty strings";
      }
    });
    dateReleased = dateReleased.trim();
    if (!isValidDate(dateReleased)) {
      throw "Date released must be in the format 'mm/dd/yyyy";
    }

    if (typeof discontinued !== "boolean") {
      throw "Discontinued must be a boolean";
    }

    const productUpdateInfo = {
      productName: productName.trim(),
      productDescription: productDescription.trim(),
      modelNumber: modelNumber.trim(),
      price: price,
      manufacturer: manufacturer.trim(),
      manufacturerWebsite: manufacturerWebsite.trim(),
      keywords: keywords.map((k) => k.trim()),
      categories: categories.map((c) => c.trim()),
      dateReleased: dateReleased.trim(),
      discontinued,
    };

    const productCollection = await products();
    const updateInfo = await productCollection.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $set: productUpdateInfo },
      { returnDocument: "after" }
    );

    if (!updateInfo)
      throw `Error: Update failed, could not find a product with id of ${productId}`;

    return updateInfo;
  },
};

export default exportedMethods;
