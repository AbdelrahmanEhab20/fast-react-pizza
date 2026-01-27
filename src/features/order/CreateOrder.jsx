import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );
console.log(isValidPhone("1234567")); // true
console.log(isValidPhone("123-abc-7890")); // false
const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";
  const [withPriority, setWithPriority] = useState(false);

  const formErrors = useActionData();
  const cart = fakeCart;
  // console.log(" CreateOrder  cart:", cart);
  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
        </div>
        {formErrors?.phone && <p>{formErrors?.phone}</p>}
        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button
            className="inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold tracking-wide text-stone-600 uppercase transition-colors duration-300 hover:bg-yellow-200 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing Order" : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

// action for adding new order
/* eslint-disable react-refresh/only-export-components */
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const orderData = {
    ...data,
    priority: data.priority === "on",
    cart: JSON.parse(data.cart),
  };
  const errors = {};
  // error handling
  if (!isValidPhone(orderData.phone)) {
    errors.phone =
      "Please give us your correct phone number , We might need to contact you ";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  // if all settled and okay , create order and redirect
  const newOrder = await createOrder(orderData);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
