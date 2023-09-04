import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { CartContext } from "../../../context/CartContext";
import { useContext, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  initMercadoPago(import.meta.env.VITE_PUBLICKEY, {
    locale: "es-AR",
  });

  const [preferenceId, setPreferenceId] = useState(null);

  const createPreference = async () => {
    const newArray = cart.map((product) => {
      return {
        title: product.title,
        unit_price: product.unit_price,
        quantity: product.quantity,
      };
    });
    try {
      let response = await axios.post(
        "http://localhost:8080/create_preference",
        {
          items: newArray,
          shipment_cost: 2500,
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log("error");
    }
  };
  const handleBuy = async () => {
    const id = createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };
  return (
    <div>
      <Button onClick={handleBuy}>Seleccione metodo de pago</Button>
      {preferenceId && (
        <Wallet initialization={{ preferenceId, redirectMode: "self" }} />
      )}
    </div>
  );
};

export default Checkout;
