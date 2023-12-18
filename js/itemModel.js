import loadProductDataToStorage from "./itemData.js";
import loadOrderItemsToStorage from "./orderItems.js";
import { loadCartItems } from "./orderModel.js";

loadProductDataToStorage();
loadOrderItemsToStorage();

// Item Model Functions

const productMap = new Map(JSON.parse(sessionStorage.getItem("productMap")));

// Return All Product Components
export function getAllProduct() {
  const itemCardList = [];
  productMap.forEach((product) => {
    const itemCard = createProductCard(product);
    itemCardList.push(itemCard);
  });
  return itemCardList;
}

// Return All Product Components by Category
export function getAllProductByCategory(category) {
  const itemCardList = [];
  productMap.forEach((product) => {
    if (product.category === category) {
      const itemCard = createProductCard(product);
      itemCardList.push(itemCard);
    }
  });
  return itemCardList;
}

// Create a single product component

function createProductCard(product) {
  // Create the main item card container
  const itemCard = document.createElement("div");
  itemCard.classList.add(
    "item-card",
    "position-relative",
    "overflow-hidden",
    "animate__animated",
    "animate__delay-2s",
    "animate__fadeIn"
  );

  // Create and append the item image
  const itemImage = document.createElement("div");
  itemImage.id = "item-image";
  itemImage.innerHTML = `<img class="img-fluid" src="${product.image}" alt="item-image" />`;
  itemCard.appendChild(itemImage);

  // Create and append the item name
  const itemName = document.createElement("div");
  itemName.id = "item-name";
  itemName.innerHTML = `<p>${product.name}</p>`;
  itemCard.appendChild(itemName);

  // Create and append the item size
  const itemSize = document.createElement("div");
  itemSize.id = "item-size";
  itemSize.innerHTML = `<p>${product.portion}</p>`;
  itemCard.appendChild(itemSize);

  // Create and append the item discount
  const itemDiscount = document.createElement("div");
  itemDiscount.id = "item-discount";
  itemDiscount.innerHTML = `<p>${product.discount} % Discount</p>`;
  itemCard.appendChild(itemDiscount);

  // Create and append the item price
  const itemPrice = document.createElement("div");
  itemPrice.id = "item-price";
  itemPrice.innerHTML = `<p>Rs ${product.price}</p>`;
  itemCard.appendChild(itemPrice);

  // Create and append the button
  const addButton = document.createElement("button");
  addButton.classList.add("btn-item-add");
  addButton.addEventListener("click", () => {
    addToOrderItems(product);
  });
  itemCard.appendChild(addButton);

  // Create and append the item code container
  const itemCodeContainer = document.createElement("div");
  itemCodeContainer.id = "item-code-container";
  itemCodeContainer.classList.add(
    "bg-white",
    "rounded-start-2",
    "position-absolute"
  );
  itemCard.appendChild(itemCodeContainer);

  // Create and append the item code
  const itemCode = document.createElement("p");
  itemCode.id = "item-code";
  itemCode.textContent = `${product.productId}`;
  itemCodeContainer.appendChild(itemCode);

  return itemCard;
}

// Add the product to the order items list and add it to cart

function addToOrderItems(product) {
  const orderItems = new Map(JSON.parse(sessionStorage.getItem("orderItems")));
  const item = {
    productId: product.productId,
    name: product.name,
    price: product.price,
    discount: product.discount,
    category: product.category,
    portion: product.portion,
    image: product.image,
    qty: 1,
  };

  if (orderItems.has(product.productId) == false) {
    orderItems.set(product.productId, item);
    sessionStorage.setItem(
      "orderItems",
      JSON.stringify(Array.from(orderItems.entries()))
    );

    // Adding item to cart list

    let orderItemIndex = sessionStorage.getItem("orderItemIndex");
    const cartItemContainer = document.getElementById("cart-item-container");
    const itemCount = document.getElementById("span-order-qty");

    cartItemContainer.appendChild(loadCartItems(item));
    orderItemIndex++;
    sessionStorage.setItem("orderItemIndex", orderItemIndex);
    itemCount.textContent = orderItemIndex;

    updateOrderBill();
  }
}

// Updating the Order Bill

export function updateOrderBill() {
  const billSubtotal = document.getElementById("bill-subtotal");
  const billDiscount = document.getElementById("bill-discount");
  const billTotal = document.getElementById("bill-total");

  const orderItems = JSON.parse(sessionStorage.getItem("orderItems"));
  if (orderItems.length > 0) {
    let totalPrice = 0;
    let discountPrice = 0;
    orderItems.forEach((item) => {
      item[1].qty = Number.parseInt(
        document.getElementById(`${item[1].productId}-qty`).innerText
      );
      totalPrice += item[1].price * item[1].qty;
      discountPrice += (item[1].discount / 100) * item[1].price * item[1].qty;
    });

    billSubtotal.innerText = totalPrice;
    billDiscount.innerText = discountPrice;
    billTotal.innerText = totalPrice - discountPrice;
  } else {
    billSubtotal.innerText = 0;
    billDiscount.innerText = 0;
    billTotal.innerText = 0;
  }
}
