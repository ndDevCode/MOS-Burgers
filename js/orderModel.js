import loadOrderItemsToStorage from "./orderItems.js";
import { updateOrderBill } from "./itemModel.js";

loadOrderItemsToStorage();

export function loadCartItems(item) {
  return createCartItem(item);
}

function createCartItem(item) {
  // Creating the outer div with id "cart-item" and class "container"
  const cartItemDiv = document.createElement("div");
  cartItemDiv.classList.add(
    "cart-item",
    "animate__animated",
    "animate__fadeInLeft"
  );
  cartItemDiv.id = `${item.productId}`;
  cartItemDiv.classList.add("container");

  // Creating the inner elements and setting their attributes/content
  const innerRowDiv = document.createElement("div");
  innerRowDiv.classList.add("row");

  const nameColDiv = document.createElement("div");
  nameColDiv.classList.add("col-8", "d-flex", "align-items-center");

  const itemName = document.createElement("h4");
  itemName.id = "cart-item-name";
  itemName.textContent = `${item.name}`;

  const priceColDiv = document.createElement("div");
  priceColDiv.classList.add("col-4", "position-relative");

  const itemPrice = document.createElement("h5");
  itemPrice.id = "cart-item-price";
  itemPrice.innerHTML = `Rs <span>${item.price}</span>`;

  const quantityDiv = document.createElement("div");
  quantityDiv.classList.add("d-flex");

  const btnMinus = document.createElement("button");
  btnMinus.id = "btn-minus";
  btnMinus.onclick = () => {
    let quantity = parseInt(
      document.getElementById(`${item.productId}-qty`).innerText
    );
    if (quantity >= 1) {
      quantity--;
      document.getElementById(`${item.productId}-qty`).innerText = quantity;
      if (quantity === 0) {
        deleteCartItem(item);
      }
    }

    updateOrderBill();
    enableCoupon();
  };
  btnMinus.type = "button";

  const cartItemQty = document.createElement("h5");
  cartItemQty.classList.add("cart-item-qty");
  cartItemQty.id = `${item.productId}-qty`;
  cartItemQty.textContent = `${item.qty}`;

  const btnPlus = document.createElement("button");
  btnPlus.id = "btn-plus";
  btnPlus.onclick = () => {
    let quantity = parseInt(
      document.getElementById(`${item.productId}-qty`).innerText
    );
    quantity++;
    document.getElementById(`${item.productId}-qty`).innerText = quantity;
    updateOrderBill();
    enableCoupon();
  };
  btnPlus.type = "button";

  const deleteBtn = document.createElement("button");
  deleteBtn.id = "btn-item-delete";

  // delete item from cart and update quantity in session storage
  deleteBtn.onclick = () => {
    deleteCartItem(item);
    updateOrderBill();
  };

  deleteBtn.type = "button";
  deleteBtn.classList.add(
    "btn-close",
    "position-absolute",
    "translate-middle",
    "rounded-pill"
  );

  deleteBtn.setAttribute("aria-label", "Close");

  // Appending elements to their respective parent containers
  nameColDiv.appendChild(itemName);

  quantityDiv.appendChild(btnMinus);
  quantityDiv.appendChild(cartItemQty);
  quantityDiv.appendChild(btnPlus);

  priceColDiv.appendChild(itemPrice);
  priceColDiv.appendChild(quantityDiv);
  priceColDiv.appendChild(deleteBtn);

  innerRowDiv.appendChild(nameColDiv);
  innerRowDiv.appendChild(priceColDiv);

  cartItemDiv.appendChild(innerRowDiv);

  return cartItemDiv;
}

// delete a cart item
function deleteCartItem(item) {
  const tmp = JSON.parse(sessionStorage.getItem("orderItems"));
  const tempMap = new Map();
  const orderItemIndex = sessionStorage.getItem("orderItemIndex");

  tmp.forEach((item) => {
    tempMap.set(item[1].productId, item[1]);
  });

  tempMap.delete(`${item.productId}`);

  sessionStorage.setItem(
    "orderItems",
    JSON.stringify(Array.from(tempMap.entries()))
  );

  sessionStorage.setItem(
    "orderItemIndex",
    orderItemIndex > 0 ? orderItemIndex - 1 : orderItemIndex
  );

  document
    .getElementById(`${item.productId}`)
    .classList.add("animate__zoomOutLeft", "animate_animated");

  setTimeout(() => {
    document.getElementById(`${item.productId}`).remove();
  }, 800);

  document.getElementById("span-order-qty").innerText = `${orderItemIndex - 1}`;

  enableCoupon();
}

function enableCoupon() {
  document.getElementById("btn-add-coupon").disabled = false;
  document.getElementById("txt-coupon-code").disabled = false;
  document.getElementById("txt-coupon-code").value = "";
}
