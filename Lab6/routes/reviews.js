// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { reviewData } from "../data/index.js";
import { productData } from "../data/index.js";
import validation from "../data/validation.js";
import { isNumber } from "../helpers.js";
import { Router } from "express";
const router = Router();
router
  .route("/:productId")
  .get(async (req, res) => {
    //code here for GET
    try {
      let productId = req.params.productId;
      try {
        productId = validation.checkId(productId);
      } catch (e) {
        return res.status(400).json({ error: "Invalid productId" });
      }
      try {
        const product = await productData.get(productId);
      } catch (e) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      const reviews = await reviewData.getAllReviews(productId);
      if (reviews.length === 0) {
        res
          .status(404)
          .json({ error: "Error: no reviews found for this product" });
        return;
      }
      res.status(200).json(reviews);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      let productId = req.params.productId;
      let { title, reviewerName, review, rating } = req.body;
      if (
        title === undefined ||
        reviewerName === undefined ||
        review === undefined ||
        rating === undefined
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      try {
        title = validation.checkString(title, "title");
        reviewerName = validation.checkString(reviewerName, "reviewerName");
        review = validation.checkString(review, "review");
      } catch (e) {
        return res.status(400).json({ error: e });
      }

      try {
        productId = validation.checkId(productId);
      } catch (e) {
        return res.status(400).json({ error: "Invalid productId" });
      }
      try {
        const product = await productData.get(productId);
      } catch (e) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      if (
        rating === undefined ||
        !isNumber(rating) ||
        rating < 1 ||
        rating > 5 ||
        !Number.isInteger(rating * 10)
      ) {
        res.status(400).json({ error: "Invalid rating" });
        return;
      }
      const newReview = await reviewData.createReview(
        productId,
        title,
        reviewerName,
        review,
        rating
      );
      const updatedProduct = await productData.get(productId);
      console.log(updatedProduct);
      res.status(200).json(updatedProduct);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

router
  .route("/review/:reviewId")
  .get(async (req, res) => {
    //code here for GET
    try {
      let reviewId = req.params.reviewId;
      try {
        reviewId = validation.checkId(reviewId);
      } catch (error) {
        res.status(400).json({ error: "Invalid reviewId" });
        return;
      }
      try {
        const review = await reviewData.getReview(reviewId);
        res.status(200).json(review);
      } catch (error) {
        res.status(404).json({ error: "Review not found" });
        return;
      }
    } catch (error) {
      res.status(500).send();
    }
  })
  .patch(async (req, res) => {
    //code for PATCH
    try {
      let reviewId = req.params.reviewId;
      let updateObject = req.body;

      // Check if reviewId is valid
      try {
        reviewId = validation.checkId(reviewId);
      } catch (error) {
        res.status(400).json({ error: "Invalid reviewId" });
        return;
      }

      const validFields = ["title", "reviewerName", "review", "rating"];
      const updateFields = Object.keys(updateObject);
      if (!updateFields.some((field) => validFields.includes(field))) {
        res.status(400).json({
          error: "At least one valid field must be supplied for update",
        });
        return;
      }
      try {
        if (updateObject.title !== undefined) {
          updateObject.title = validation.checkString(
            updateObject.title,
            "title"
          );
        }
        if (updateObject.reviewerName !== undefined) {
          updateObject.reviewerName = validation.checkString(
            updateObject.reviewerName,
            "reviewerName"
          );
        }
        if (updateObject.review !== undefined) {
          updateObject.review = validation.checkString(
            updateObject.review,
            "review"
          );
        }
      } catch (e) {
        res.status(400).json({ error: e });
        return;
      }
      try {
        let review = await reviewData.getReview(reviewId);
      } catch (e) {
        res.status(404).json({ error: "Review not found" });
        return;
      }

      if (
        updateObject.rating !== undefined &&
        (!isNumber(updateObject.rating) ||
          updateObject.rating < 1 ||
          updateObject.rating > 5 ||
          !Number.isInteger(updateObject.rating * 10))
      ) {
        res.status(400).json({ error: "Invalid rating" });
        return;
      }

      const updatedProduct = await reviewData.updateReview(
        reviewId,
        updateObject
      );
      res.json(updatedProduct);
    } catch (error) {
      if (error.message === "Error: review not found") {
        res.status(404).json({ error: "Review not found" });
      } else {
        res.status(500).send();
      }
    }
  })
  .delete(async (req, res) => {
    try {
      let reviewId = req.params.reviewId;
      try {
        reviewId = validation.checkId(reviewId);
      } catch (error) {
        res.status(400).json({ error: "Invalid reviewId" });
        return;
      }
      const updatedProduct = await reviewData.removeReview(reviewId);
      res.json(updatedProduct);
    } catch (error) {
      if (error.message === "Error: review not found") {
        res.status(404).json({ error: "Review not found" });
      } else {
        res.status(500).send();
      }
    }
  });
export default router;
