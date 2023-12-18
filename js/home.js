import { getAllProduct, getAllProductByCategory } from "./itemModel.js";

// Entrance Animation handler

const animateitems = Array.from(document.querySelectorAll(".animate-div"));
const btnOrderNow = document.getElementById("btn-order-now");
const placeOrderView = document.getElementById("place-order-view");

function addAnimations(element) {
  setTimeout(() => {
    element.classList.add("animate__animated");
  }, 500);
}

function removeElement(element) {
  setTimeout(() => {
    element.classList.add("d-none");
  }, 3000);
}

btnOrderNow.addEventListener("click", () => {
  btnOrderNow.classList.add("animate__animated");
  animateitems.forEach(addAnimations);
  animateitems.forEach(removeElement);
  document.body.style.overflow = "hidden";
  placeOrderView.classList.remove("d-none");

  loadItemCards();
});

// Loading products list

const itemContainer = document.getElementById("item-card-container");
const itemList = getAllProduct();

function loadItemCards() {
  itemList.forEach((item) => itemContainer.appendChild(item));
}

// Item Searching Function

const searchInput = document.getElementById("txt-item-search");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredItems = itemList.filter((item) =>
    item.textContent.toLowerCase().includes(searchTerm)
  );

  itemContainer.innerHTML = "";
  filteredItems.forEach((item) => itemContainer.appendChild(item));
});

// Filter item by category name selection

const burger_category = document.getElementById("burger-category");
const submarine_category = document.getElementById("submarine-category");
const pasta_category = document.getElementById("pasta-category");
const fries_category = document.getElementById("fries-category");
const chicken_category = document.getElementById("chicken-category");
const beverage_category = document.getElementById("beverage-category");

burger_category.addEventListener("click", () => {
  filterItemsByCategory(burger_category.innerText);
});

submarine_category.addEventListener("click", () => {
  filterItemsByCategory(submarine_category.innerText);
});

pasta_category.addEventListener("click", () => {
  filterItemsByCategory(pasta_category.innerText);
});

fries_category.addEventListener("click", () => {
  filterItemsByCategory(fries_category.innerText);
});

chicken_category.addEventListener("click", () => {
  filterItemsByCategory(chicken_category.innerText);
});

beverage_category.addEventListener("click", () => {
  filterItemsByCategory(beverage_category.innerText);
});

function filterItemsByCategory(searchTerm) {
  const itemListByCategory = getAllProductByCategory(searchTerm);
  itemContainer.innerHTML = "";
  itemListByCategory.forEach((item) => itemContainer.appendChild(item));
}

// function of applying Coupon code

document.getElementById("btn-add-coupon").addEventListener("click", () => {
  addCouponCode();
});

function addCouponCode() {
  const couponCode = document.getElementById("txt-coupon-code");
  if (couponCode.value.length === 0) {
    alert("Please enter a valid coupon code");
  } else {
    if (couponCode.value === "mosburger") {
      const billSubtotal = document.getElementById("bill-subtotal");
      const billDiscount = document.getElementById("bill-discount");
      const billTotal = document.getElementById("bill-total");

      let couponDiscount =
        Number.parseInt(billDiscount.innerText) +
        Number.parseInt(billSubtotal.innerText) * 0.1;
      billDiscount.innerText = couponDiscount;
      billTotal.innerText =
        Number.parseInt(billSubtotal.innerText) - couponDiscount;

      couponCode.disabled = true;
      document.getElementById("btn-add-coupon").disabled = true;
      alert("Coupon code applied");
      return;
    }
    alert("Coupon code invalid");
  }
}
