import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Button, Link } from "@mui/material";

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } =
    useContext(CartContext);
  let total = getTotalPrice();
  return (
    <div>
      <h1>Estoy en el carrito</h1>
      {cart.length > 0 && <Link to="/checkout">FINALIZAR COMPRA</Link>}

      <Button onClick={clearCart}>Limpiar Carrito</Button>
      {cart.map((product) => {
        return (
          <div
            key={product.id}
            style={{ width: "200px", border: "2px solid red" }}
          >
            <h6>{product.title}</h6>
            <h6>{product.quantity}</h6>
            <Button onClick={() => deleteById(product.id)}>Eliminar</Button>
          </div>
        );
      })}
      <h5>El total a pagar es {total}</h5>
    </div>
  );
};

export default Cart;
