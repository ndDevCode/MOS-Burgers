const placedOrders = new Map();
function loadPlacedOrdersToStorage() {
  sessionStorage.setItem(
    "placedOrders",
    JSON.stringify(Array.from(placedOrders.entries()))
  );
}

export default loadPlacedOrdersToStorage;
