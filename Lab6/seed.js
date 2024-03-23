import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import products from "./data/products.js";
import reviewFunctions from "./data/reviews.js";

const db = await dbConnection();
await db.dropDatabase();

const productData = [
  {
    productName: "Product 1",
    productDescription: "This is product 1",
    modelNumber: "1",
    price: 100,
    manufacturer: "Manufacturer 1",
    manufacturerWebsite: "http://www.manufacturer1.com",
    keywords: ["keyword1", "keyword2"],
    categories: ["category1", "category2"],
    dateReleased: "01/01/2022",
    discontinued: false,
    reviews: [
      {
        title: "Review 1",
        reviewerName: "Reviewer 1",
        review: "This is review 1",
        rating: 5,
        reviewDate: "01/01/2022",
      },
      {
        title: "Review 2",
        reviewerName: "Reviewer 2",
        review: "This is review 2",
        rating: 4,
        reviewDate: "02/01/2022",
      },
    ],
  },
  {
    productName: "Product 2",
    productDescription: "This is product 2",
    modelNumber: "2",
    price: 200,
    manufacturer: "Manufacturer 2",
    manufacturerWebsite: "http://www.manufacturer2.com",
    keywords: ["keyword3", "keyword4"],
    categories: ["category3", "category4"],
    dateReleased: "02/02/2022",
    discontinued: false,
    reviews: [
      {
        title: "Fantastic Product",
        reviewerName: "John Doe",
        review: "This product exceeded my expectations. Highly recommended!",
        rating: 5,
        reviewDate: "03/01/2022",
      },
      {
        title: "Good Value for Money",
        reviewerName: "Jane Smith",
        review: "Great product for its price. Will buy again.",
        rating: 4,
        reviewDate: "03/02/2022",
      },
      {
        title: "Average Experience",
        reviewerName: "Bob Johnson",
        review: "The product is okay, but there's room for improvement.",
        rating: 3,
        reviewDate: "03/03/2022",
      },
    ],
  },
  {
    productName: "Product 3",
    productDescription: "This is product 3",
    modelNumber: "3",
    price: 300,
    manufacturer: "Manufacturer 3",
    manufacturerWebsite: "http://www.manufacturer3.com",
    keywords: ["keyword5", "keyword6"],
    categories: ["category5", "category6"],
    dateReleased: "03/03/2022",
    discontinued: true,
  },
];

for (const product of productData) {
  const {
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
    reviews,
  } = product;

  const createdProduct = await products.create(
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
  if (reviews && reviews.length > 0) {
    for (const review of reviews) {
      const {
        title,
        reviewerName,
        review: reviewText,
        rating,
        reviewDate,
      } = review;

      await reviewFunctions.createReview(
        createdProduct._id.toString(),
        title,
        reviewerName,
        reviewText,
        rating,
        reviewDate
      );
    }
  }
}

console.log("Database seeded!");
await closeConnection();
