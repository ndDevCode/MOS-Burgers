const orderItems = new Map();
const orderItemIndex = 0;
function loadOrderItemsToStorage() {
  sessionStorage.setItem(
    "orderItems",
    JSON.stringify(Array.from(orderItems.entries()))
  );

  sessionStorage.setItem("orderItemIndex", orderItemIndex);
}

export default loadOrderItemsToStorage;
