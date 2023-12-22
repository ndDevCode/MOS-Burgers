export function getNextOrderID() {
  const placedOrders = new Map(
    JSON.parse(sessionStorage.getItem("placedOrders"))
  );

  let nextId = Array.from(placedOrders.keys()).pop();

  if (nextId === undefined || nextId === null) {
    return "ODR00001";
  }

  let nextOrderId = parseInt(nextId.split("ODR")[1]);
  nextOrderId++;
  let nextOrderNumber = String(nextOrderId).padStart(5, "0");

  nextId = `ODR${nextOrderNumber}`;

  return nextId;
}

export function saveOrder(orderId, order) {
  const placedOrders = new Map(
    JSON.parse(sessionStorage.getItem("placedOrders"))
  );

  placedOrders.set(orderId, order);
  sessionStorage.setItem(
    "placedOrders",
    JSON.stringify(Array.from(placedOrders.entries()))
  );

  return true;
}
