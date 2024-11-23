import DatabaseService from "./db";

export const createCollections = async () => {
  try {
    const db = await DatabaseService.getDb();

    // // User Collection
    // await db.createCollection("users", {
    //   validator: {
    //     $jsonSchema: {
    //       bsonType: "object",
    //       required: ["firstName", "lastName", "email", "password"],
    //       properties: {
    //         firstName: {
    //           bsonType: "string",
    //           description: "First name is required",
    //         },
    //         lastName: {
    //           bsonType: "string",
    //           description: "Last name is required",
    //         },
    //         email: {
    //           bsonType: "string",
    //           pattern: "^.+@.+$",
    //           description: "Valid email is required",
    //         },
    //         password: {
    //           bsonType: "string",
    //           description: "Password is required",
    //         },
    //         addressesId: {
    //           bsonType: "array",
    //           items: { bsonType: "objectId" },
    //           description: "List of address IDs",
    //         },
    //       },
    //     },
    //   },
    // });

    // // Address Collection
    // await db.createCollection("addresses", {
    //   validator: {
    //     $jsonSchema: {
    //       bsonType: "object",
    //       required: ["street", "city", "country"],
    //       properties: {
    //         street: { bsonType: "string", description: "Street is required" },
    //         city: { bsonType: "string", description: "City is required" },
    //         state: { bsonType: "string" },
    //         zipCode: { bsonType: "string" },
    //         country: { bsonType: "string", description: "Country is required" },
    //       },
    //     },
    //   },
    // });

    // // Order Collection
    // await db.createCollection("orders", {
    //   validator: {
    //     $jsonSchema: {
    //       bsonType: "object",
    //       required: ["user", "orderAddress", "totalPrice", "products"],
    //       properties: {
    //         user: { bsonType: "objectId", description: "User ID is required" },
    //         orderAddress: {
    //           bsonType: "objectId",
    //           description: "Order address ID is required",
    //         },
    //         orderDate: { bsonType: "date", description: "Order date" },
    //         totalPrice: {
    //           bsonType: "double",
    //           minimum: 0,
    //           description: "Total price is required",
    //         },
    //         status: {
    //           bsonType: "string",
    //           enum: [
    //             "pending",
    //             "processing",
    //             "shipped",
    //             "delivered",
    //             "cancelled",
    //           ],
    //           description: "Order status",
    //         },
    //         products: {
    //           bsonType: "array",
    //           items: {
    //             bsonType: "object",
    //             required: ["productId", "quantity", "quantityType"],
    //             properties: {
    //               productId: {
    //                 bsonType: "objectId",
    //                 description: "Product ID is required",
    //               },
    //               quantity: {
    //                 bsonType: "int",
    //                 minimum: 1,
    //                 description: "Quantity must be at least 1",
    //               },
    //               quantityType: {
    //                 bsonType: "string",
    //                 enum: ["lb", "oz", "g", "kg", "unit"],
    //                 description: "Quantity type",
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    // Product Collection
    await db.createCollection("products", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "productType"],
          properties: {
            name: {
              bsonType: "string",
              description: "Product name is required",
            },
            imgsUrl: {
              bsonType: "array",
              items: { bsonType: "string" },
              description: "List of image URLs",
            },
            family: { bsonType: "string" },
            season: {
              bsonType: "string",
              enum: ["spring", "summer", "fall", "winter", "year-round"],
              description: "Season",
            },
            productType: {
              bsonType: "string",
              enum: [
                "vegetable",
                "fruit",
                "herb",
                "root",
                "legume",
                "nut",
                "spice",
                "other",
              ],
              description: "Product type is required",
            },
            subProductType: { bsonType: "string" },
            description: { bsonType: "string" },
            rating: {
              bsonType: "int",
              minimum: 0,
              maximum: 5,
              description: "Product rating",
            },
            quantityType: {
              bsonType: "array",
              items: {
                bsonType: "object",
                properties: {
                  price: {
                    bsonType: "double",
                    minimum: 0,
                    description: "Price is required",
                  },
                  type: {
                    bsonType: "string",
                    enum: ["lb", "oz", "g", "kg", "unit", "pack"],
                    description: "Quantity type",
                  },
                  quantity: {
                    bsonType: "int",
                    minimum: 0,
                    description: "Quantity is required",
                  },
                  discount: {
                    bsonType: "int",
                    minimum: 0,
                    maximum: 100,
                    description: "Discount",
                  },
                },
              },
            },
            nutrition: {
              bsonType: "object",
              properties: {
                calories: { bsonType: "double", minimum: 0 },
                protein: { bsonType: "double", minimum: 0 },
                fat: { bsonType: "double", minimum: 0 },
                carbohydrates: { bsonType: "double", minimum: 0 },
                fiber: { bsonType: "double", minimum: 0 },
                vitamins: { bsonType: "array", items: { bsonType: "string" } },
                minerals: { bsonType: "array", items: { bsonType: "string" } },
              },
            },
          },
        },
      },
    });

    console.info("Collections created successfully");
  } catch (error) {
    console.error("Error creating collections:", error);
  } finally {
    await DatabaseService.closeConnection();
  }
};
