export const PRODUCT_BTN_PAGE_STYLE: IProdyctStyleMode = {
  contianer:
    "grid gap-4 bg-light-bg dark:bg-dark-bg text-dark-text dark:text-light-text",
  radioBtns: {
    contianer: "flex gap-2 border rounded-3xl bg-inherit p-1",
    label:
      "peer rounded-3xl cursor-pointer py-1 px-2 text-sm font-semibold font-text",
  },
  price: "text-center text-lg font-title",
  btns: {
    contianer: "flex items-center justify-center gap-4 text-center font-text",
    span: "text-lg",
  },
};
export const PRODUCT_BTN_CART_STYLE: IProdyctStyleMode = {
  contianer:
    "grid gap-4 bg-light-bg dark:bg-dark-bg text-dark-text dark:text-light-text",
  radioBtns: {
    contianer: "flex gap-2 border rounded-3xl bg-inherit p-1",
    label:
      "peer rounded-3xl cursor-pointer py-1 px-2 text-sm font-semibold font-text",
  },
  price: "text-center text-lg font-title",
  btns: {
    contianer: "flex items-center justify-center gap-4 text-center font-text",
    span: "text-lg",
  },
};

export const PRODUCTS_LIST_PAGE_STYLE =
  "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4";
export const PRODUCTS_LIST_CART_STYLE =
  "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4";

export const PRODUCT_ITEM_PAGE_STYLE = {
  contianer: "p-4 rounded border flex flex-col items-center gap-4",
  img: "w-40 aspect-square rounded",
  imgSize: 192,
};
export const PRODUCT_ITEM_CART_STYLE = {
  contianer: "p-4 rounded border flex flex-col items-center gap-4",
  img: "w-40 aspect-square rounded",
  imgSize: 64,
};
