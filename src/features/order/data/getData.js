import { getOrder } from "../../../services/apiRestaurant";

export async function loaderOrderData({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
