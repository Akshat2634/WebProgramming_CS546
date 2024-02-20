// TODO: Export and implement the following functions in ES6 format
import { isNumber, isValidDate } from "../helpers.js";
import { products } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

const create = async (
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
) => {
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
      !field.every((item) => typeof item === "string" && item.trim().length > 0)
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
  };
  const productsCollection = await products();
  const insertInfo = await productsCollection.insertOne(newProduct);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add product";
  }
  const newId = insertInfo.insertedId.toString();
  const product = await get(newId);

  return product;
};

const getAll = async () => {
  const productsCollection = await products();
  let allProductsArr = await productsCollection.find({}).toArray();
  allProductsArr = allProductsArr.map((product) => {
    product._id = product._id.toString();
    return product;
  });
  return allProductsArr;
};

const get = async (id) => {
  if (!id) throw "Id must be supplied";
  if (typeof id !== "string" || id.trim().length === 0) {
    throw "Id must be a non-empty string";
  }
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "Invalid object id";
  const productsCollection = await products();
  const product = await productsCollection.findOne({ _id: new ObjectId(id) });
  if (!product) throw "Product not found";
  product._id = product._id.toString();
  return product;
};

const remove = async (id) => {
  if (!id) throw "Id must be supplied";
  if (typeof id !== "string" || id.trim().length === 0) {
    throw "Id must be a non-empty string";
  }
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "Invalid object id";
  const productsCollection = await products();
  const deletionInfo = await productsCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (!deletionInfo) {
    throw `Could not delete product with id of ${id}`;
  }
  return `${deletionInfo.productName} has been successfully deleted!`;
};

const rename = async (id, newProductName) => {
  if (!id) throw "Id must be supplied";
  if (typeof id !== "string" || id.trim().length === 0) {
    throw "Id must be a non-empty string";
  }
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "Invalid object id";
  if (!newProductName) throw "New product name must be supplied";
  if (
    typeof newProductName !== "string" ||
    newProductName.trim().length === 0
  ) {
    throw "New product name must be a non-empty string";
  }
  newProductName = newProductName.trim();
  const productsCollection = await products();
  const productToUpdate = await get(id);
  if (!productToUpdate) throw "Product not found";
  if (productToUpdate.productName === newProductName) {
    throw "Product name is the same";
  }
  const updateInfo = await productsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { productName: newProductName } }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
    throw "Update failed";
  }
  const updatedProduct = await get(id);
  updatedProduct._id = updatedProduct._id.toString();
  return updatedProduct;
};

export { create, getAll, get, remove, rename };
