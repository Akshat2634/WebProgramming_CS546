// This data file should export all functions using the ES6 standard as shown in the lecture code
import { ObjectId } from "mongodb";
import { products } from "../config/mongoCollections.js";
import validation from "./validation.js";
import productData from "./products.js";
import { isNumber, isValidDate } from "../helpers.js";

let exportedMethods = {
  async createReview(productId, title, reviewerName, review, rating) {
    if (!isNumber(rating)) {
      throw new Error("Error: rating must be a number");
    }
    productId = validation.checkId(productId);
    title = validation.checkString(title, "title");
    reviewerName = validation.checkString(reviewerName, "reviewerName");
    review = validation.checkString(review, "review");

    if (
      !isNumber(rating) ||
      rating < 1 ||
      rating > 5 ||
      !Number.isInteger(rating * 10)
    ) {
      throw "Error: rating must be a number between 1 and 5 with at most one decimal place";
    }
    const productCollection = await products();
    const product = await productCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (!product) {
      throw "Error: product not found";
    }

    const reviewId = new ObjectId();
    const reviewDate = new Date().toLocaleDateString("en-US");
    const newReview = {
      _id: reviewId,
      title: title,
      reviewerName: reviewerName,
      review: review,
      rating: rating,
      reviewDate: reviewDate,
    };
    product.reviews.push(newReview);
    const totalRating = product.reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    product.averageRating = totalRating / product.reviews.length;

    await productCollection.updateOne(
      { _id: new ObjectId(productId) },
      {
        $set: {
          reviews: product.reviews,
          averageRating: product.averageRating,
        },
      }
    );

    return newReview;
  },

  async getAllReviews(productId) {
    productId = validation.checkId(productId);
    const productCollection = await products();
    const product = await productCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (!product) {
      throw "Error: product not found";
    }
    return product.reviews;
  },

  async getReview(reviewId) {
    reviewId = validation.checkId(reviewId);

    const productCollection = await products();
    const product = await productCollection.findOne(
      { "reviews._id": new ObjectId(reviewId) },
      {
        projection: {
          reviews: { $elemMatch: { _id: new ObjectId(reviewId) } },
        },
      }
    );

    if (!product || !product.reviews || product.reviews.length === 0) {
      throw new Error("Error: review not found");
    }

    return product.reviews[0];
  },

  async updateReview(reviewId, updateObject) {
    if (
      !reviewId ||
      typeof reviewId !== "string" ||
      reviewId.trim().length === 0
    ) {
      throw new Error("Error: reviewId must be a non-empty string");
    }

    reviewId = validation.checkId(reviewId);

    const productCollection = await products();
    const product = await productCollection.findOne({
      "reviews._id": new ObjectId(reviewId),
    });
    if (!product) {
      throw new "Error: review not found"();
    }

    const review = product.reviews.find(
      (review) => review._id.toString() === reviewId
    );

    if (updateObject.title !== undefined) {
      review.title = validation.checkString(updateObject.title.trim(), "title");
    }
    if (updateObject.reviewerName !== undefined) {
      review.reviewerName = validation.checkString(
        updateObject.reviewerName.trim(),
        "reviewerName"
      );
    }
    if (updateObject.review !== undefined) {
      review.review = validation.checkString(
        updateObject.review.trim(),
        "review"
      );
    }
    if (updateObject.rating !== undefined) {
      if (
        !isNumber(updateObject.rating) ||
        updateObject.rating < 1 ||
        updateObject.rating > 5 ||
        !Number.isInteger(updateObject.rating * 10)
      ) {
        throw "Error: rating must be a number between 1 and 5 with at most one decimal place";
      }
      review.rating = updateObject.rating;
    }

    review.reviewDate = new Date().toLocaleDateString("en-US");

    const totalRating = product.reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    product.averageRating = totalRating / product.reviews.length;

    await productCollection.updateOne(
      { _id: new ObjectId(product._id) },
      {
        $set: {
          reviews: product.reviews,
          averageRating: product.averageRating,
        },
      }
    );

    return product;
  },

  async removeReview(reviewId) {
    if (
      !reviewId ||
      typeof reviewId !== "string" ||
      reviewId.trim().length === 0
    ) {
      throw new Error("Error: reviewId must be a non-empty string");
    }

    reviewId = validation.checkId(reviewId);

    const productCollection = await products();
    const product = await productCollection.findOne({
      "reviews._id": new ObjectId(reviewId),
    });
    if (!product) {
      throw new Error("Error: review not found");
    }

    product.reviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );

    const totalRating = product.reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    product.averageRating =
      product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

    await productCollection.updateOne(
      { _id: new ObjectId(product._id) },
      {
        $set: {
          reviews: product.reviews,

          averageRating: product.averageRating,
        },
      }
    );

    return product;
  },
};

export default exportedMethods;
