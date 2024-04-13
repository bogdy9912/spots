
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { StripeService } from "@genezio-sdk/spots";

const ProductDisplay = ({ handleSubmit }: { handleSubmit: () => void; }) => (
  <>
    <div>
      <a href="https://genezio.com" target="_blank">
        <img src="https://raw.githubusercontent.com/Genez-io/graphics/main/svg/Logo_Genezio_White.svg"
          className="logo genezio light"
          alt="Genezio Logo"/>
        <img src="https://raw.githubusercontent.com/Genez-io/graphics/main/svg/Logo_Genezio_Black.svg"
          className="logo genezio dark"
          alt="Genezio Logo"/>
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
    <div className="card">
      <button onClick={(e) => {
          e.preventDefault();
          handleSubmit();
      }}>
        Buy a T-Shirt with Stripe
      </button>
    </div>
  </>
);

const Message = ({ message }: { message: string }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function StripePage() {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const url = await StripeService.createCheckoutSession().catch((err) => {
      console.error(err);
      return null;
    });
    if (url) {
      window.location.href = url;
    }
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleSubmit={handleSubmit} />
  );
}