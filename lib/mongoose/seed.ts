/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
import { fruits_veggies_data, fruits_veggies_img } from "./data";
import { IProductModel, IQuantityType } from "./models";

export async function seed() {
  const products = buildProductModels(fruits_veggies_data, fruits_veggies_img);
  saveToJson(products, "./products.json");
  console.log("products:", products.length);
}

function buildProductModels(products: IProduct[], images: any[]) {
  const imageMap = new Map<string, string[]>();
  images.forEach((img) => {
    const name = img.name;
    if (imageMap.has(name)) {
      imageMap.get(name)!.push(img.imageUrl);
    } else {
      imageMap.set(name, [img.imageUrl]);
    }
  });

  const productModels = products.map((product) => {
    const imgsUrl = imageMap.get(product.name) || [];
    const nutrition = {
      calories: product.calories,
      protein: product.protein,
      fat: product.fat,
      carbohydrates: product.carbohydrates,
      fiber: product.fiber,
      vitamins: product.vitamins,
      minerals: product.minerals,
    };
    const productType = product?.productType as TProductType;
    const quantity = getRandomNumber(3, 100);
    const quantityType: IQuantityType[] = [
      { type: "unit", price: getRandomNumber(0, 50) },
      { type: "kg", price: getRandomNumber(0, 50) },
      { type: "pack", price: getRandomNumber(0, 50) },
    ];

    const productModel = {
      name: product?.name,
      imgsUrl,
      family: product?.family,
      season: product?.season as TSeason,
      productType,
      subProductType: product?.subProductType || undefined,
      description: product?.description,
      nutrition,
      quantity,
      quantityType,
    };

    return productModel;
  });

  return productModels;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function saveToJson(data: any, path: string) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function loadJson(path: string): any {
  const data = fs.readFileSync(path, "utf8");
  return JSON.parse(data);
}

function cleanDuplications(data: IProduct[]) {
  const uniqueData = data.filter(
    (value, index, self) =>
      self.findIndex((t) => t.name === value.name) === index
  );
  return uniqueData;
}
