"use server";

import DatabaseService from "../mongo/db";

// export const createProduct = async (product: IProduct) => {
//   try {
//     const doc = await models.Product.create(product);
//     return doc;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
// export const updateProduct = async (product: IProduct) => {
//   try {
//     const doc = await models.Product.findByIdAndUpdate(product?._id, product);
//     return doc;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const getProducts = async (
  filter: IProductFilter,
  skip = 0,
  limit = 100,
  isSmallProduct = true
): Promise<IProductSmall[]> => {
  try {
    const productsCollection = await DatabaseService.getCollection<IProduct>(
      "products"
    );

    const pipeline: Record<string, unknown>[] = [];

    // Build the $match stage based on the filter
    const matchStage: Record<string, unknown> = {};

    if (filter.name) {
      matchStage.name = { $regex: filter.name, $options: "i" }; // Case-insensitive regex search
    }

    if (filter.productType) {
      matchStage.productType = filter.productType;
    }

    pipeline.push({ $match: matchStage });

    // Apply $skip and $limit for pagination
    if (skip > 0) {
      pipeline.push({ $skip: skip });
    }
    if (limit > 0) {
      pipeline.push({ $limit: limit });
    }

    if (isSmallProduct) {
      // $project stage to select specific fields and compute imgUrl
      pipeline.push({
        $project: {
          _id: { $toString: "$_id" }, // Convert ObjectId to string
          name: 1,
          imgUrl: { $arrayElemAt: ["$imgsUrl", 0] },
          productType: 1,
          subProductType: 1,
          quantityType: 1,
        },
      });
    } else {
      // For full product details, project all fields, convert _id to string, compute imgUrl
      pipeline.push({
        $addFields: {
          imgUrl: { $arrayElemAt: ["$imgsUrl", 0] },
        },
      });
      pipeline.push({
        $project: {
          _id: { $toString: "$_id" },
          imgsUrl: 0, // Exclude imgsUrl from the result
        },
      });
    }

    // Execute the aggregation pipeline
    const products = await productsCollection
      .aggregate<IProductSmall>(pipeline)
      .toArray();

    if (!products || products.length === 0) {
      console.log("No products found.");
      return [];
    }

    console.log("transformedProducts:", products);

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// export const getProductById = async (id: string) => {
//   try {
//     const doc = await models.Product.findById(id);
//     return doc;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
