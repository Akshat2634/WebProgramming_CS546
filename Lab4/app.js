import * as products from "./data/products.js";

import { dbConnection, closeConnection } from "./config/mongoConnection.js";

/*

Create a product of your choice.
Log the newly created product. (Just that product, not all products)
Create another product of your choice.
Query all products, and log them all
Create the 3rd product of your choice.
Log the newly created 3rd product. (Just that product, not all product)
Rename the first product
Log the first product with the updated name. 
Remove the second product you created.
Query all products, and log them all
Try to create a product with bad input parameters to make sure it throws errors.
Try to remove a product that does not exist to make sure it throws errors.
Try to rename a product that does not exist to make sure it throws errors.
Try to rename a product passing in invalid data for the newProductName parameter to make sure it throws errors.
Try getting a product by ID that does not exist to make sure it throws errors.

*/

const db = await dbConnection();
await db.dropDatabase();

async function main() {
  try {
    // Product 1
    const lgTV = await products.create(
      "83 inch LG C3 OLED TV",
      "The advanced LG OLED evo C-Series is better than ever. The LG OLED evo C3 is powered by the next-gen a9 AI Processor Gen6—exclusively made for LG OLED—for ultra-realistic picture and sound. And the Brightness Booster improves brightness so you get luminous picture and high contrast, even in well-lit rooms.* AI-assisted deep learning analyzes what you're watching to choose the best picture and sound setting for your content. The LG OLED evo C3 not only performs great, but looks great as well. With an almost invisible bezel, it will blend into the background for a seamless look. When you're finished watching, display paintings, photos and other content to blend the LG OLED evo C3 into your space even more. But that's not all. Experience less searching and more streaming, thanks to the next generation of AI technology from LG webOS 23. Every LG OLED comes loaded with Dolby Vision for extraordinary color, contrast and brightness, plus Dolby Atmos** for wrap-around sound. And LG's FILMMAKER MODE allows you to see films just as the director intended. Packed with gaming features, the LG OLED evo C-Series comes with everything you need to win like a 0.1ms response time, native 120Hz refresh rate and four HDMI 2.1 inputs. *Based on LG internal testing: 55/65/77/83 LG OLED evo C3 models are brighter than non-OLED evo B3 models and excludes the 42 and 48 LG OLED evo C3. **Dolby, Dolby Atmos and the double-D symbol are registered trademarks of Dolby Laboratories.",
      "OLED83C3PUA",
      4757.29,
      "LG",
      "http://www.lgelectronics.com",
      ["TV", "Smart TV", "OLED", "LG", "Big Screen", "83 Inch"],
      ["Electronics", "Television & Video", "Televisions", "OLED TVs"],
      "02/29/2024 ", //mm/dd/yyyy
      false
    );
    console.log(lgTV);
  } catch (error) {
    console.log(error);
  }
  try {
    // Product 2
    const iPhone13 = await products.create(
      "iPhone 13 Pro Max",
      "The biggest Pro camera system upgrade ever. Super Retina XDR display with ProMotion for a faster, more responsive feel. Lightning-fast A15 Bionic chip. Superfast 5G. Durable design and the best battery life ever in an iPhone. ",
      "MKUH3LL/A",
      1099.0,
      "Apple",
      "http://www.apple.com",
      ["Smartphone", "iPhone", "Apple", "iOS", "5G"],
      [
        "Electronics",
        "Cell Phones & Accessories",
        "Cell Phones",
        "Smartphones",
      ],
      "9/24/2022",
      false
    );
    console.log(iPhone13);
  } catch (error) {
    console.log(error);
  }
  // getAll;
  try {
    // Log all products
    const allProducts = await products.getAll();
    console.log(allProducts);
  } catch (error) {
    console.log(error);
  }
  try {
    // Product 3
    const macBookPro = await products.create(
      "MacBook Pro 16-inch",
      "Apple M1 Pro or M1 Max chip for a massive leap in CPU, GPU, and machine learning performance. Up to 10-core CPU delivers up to 2x faster performance to fly through pro workflows quicker than ever. Up to 32-core GPU with up to 4x faster performance for graphics-intensive apps and games. 16-core Neural Engine for up to 5x faster machine learning performance. Longer battery life, up to 21 hours. 16-core Neural Engine. 16GB of unified memory. 512GB SSD storage. 16-inch Liquid Retina XDR display. Six-speaker sound system with force-cancelling woofers.",
      "MK183LL/A",
      2499.0,
      "Apple",
      "http://www.apple.com",
      ["Laptop", "MacBook", "Apple", "M1", "16 Inch"],
      ["Electronics", "Computers & Tablets", "Laptops", "MacBooks"],
      "10/18/2022",
      false
    );
    console.log(macBookPro);
  } catch (error) {
    console.log(error);
  }
  // rename first product
  try {
    const renamedTv = await products.rename(
      "65d504471f232537e34070f9",
      "SAMSUNG 83 inch QLED TV"
    );
    console.log(renamedTv);
  } catch (error) {
    console.log(error);
  }
  // remove second product
  try {
    const removeMacPro = await products.remove("65d504471f232537e34070f9");
    console.log(removeMacPro);
  } catch (error) {
    console.log(error);
  }
  // getAll products
  try {
    const allProducts = await products.getAll();
    console.log(allProducts);
  } catch (error) {
    console.log(error);
  }
  // create product with bad input parameters to make sure it throws errors
  try {
    const badInput = await products.create(
      "MacBook Air Max 11-inch",
      "Apple M1 Pro or M1 Max chip for a massive leap in CPU, GPU, and machine learning performance. Up to 10-core CPU delivers up to 2x faster performance to fly through pro workflows quicker than ever. Up to 32-core GPU with up to 4x faster performance for graphics-intensive apps and games. 16-core Neural Engine for up to 5x faster machine learning performance. Longer battery life, up to 21 hours. 16-core Neural Engine. 16GB of unified memory. 512GB SSD storage. 16-inch Liquid Retina XDR display. Six-speaker sound system with force-cancelling woofers.",
      "MK183LL/A",
      2499.08,
      "Apple   ",
      "http://www.apple.com",
      ["Laptop", "MacBook", "M2", "M1"],
      ["Electronics", "Computers & Tablets", "Laptops"],
      "02/20/2021  ",
      false
    );
    console.log(badInput);
  } catch (error) {
    console.log(error);
  }
  // remove a product that does not exist to make sure it throws errors
  try {
    const removeProduct = await products.remove("65cefe00778a32acc589de72a");
    console.log(removeProduct);
  } catch (error) {
    console.log(error);
  }
  // rename a product that does not exist to make sure it throws errors
  try {
    const renameProduct = await products.rename(
      "65d283ff12d6b9e024718cae",
      "iPhone 13 Pro Max "
    );
    console.log(renameProduct);
  } catch (error) {
    console.log(error);
  }
  // rename a product passing in invalid data for the newProductName parameter to make sure it throws errors
  try {
    const renameProduct = await products.rename(
      "65d4ded0b800fd1c4c694992",
      "rename"
    );
    console.log(renameProduct);
  } catch (error) {
    console.log(error);
  }
  // get a product by ID that does not exist to make sure it throws errors
  try {
    const macBookPro = await products.get("65d4ded0b800fd1c4c694992  ");
    console.log(macBookPro);
  } catch (error) {
    console.log(error);
  }
  await closeConnection();
  console.log("Database Disconnected!");
}
main();
