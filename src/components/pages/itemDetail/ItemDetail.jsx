import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { Button } from "@mui/material";
import { CartContext } from "../../../context/CartContext";

const ItemDetail = () => {
  const { id } = useParams();
  const { addToCart, getQuantityById } = useContext(CartContext);
  let quantity = getQuantityById(id);
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(quantity || 1);

  useEffect(() => {
    let refCollection = collection(db, "products");
    let refDoc = doc(refCollection, id);
    getDoc(refDoc)
      .then((res) => setProduct({ ...res.data(), id: res.id }))
      .catch((error) => console.log(error));
  }, [id]);

  const addOne = () => {
    if (counter < product.stock) {
      setCounter(counter + 1);
    } else {
      alert("stock maximo");
    }
  };
  const subOne = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      alert("no podes agregar menos de un elemento al carrito");
    }
  };

  const onAdd = () => {
    let obj = {
      ...product,
      quantity: counter,
    };
    addToCart(obj);
  };

  return (
    <div>
      {product && (
        <div>
          <h2>{product.title}</h2>
          <img
            src={product.image}
            style={{ width: "200px", heigth: "300px" }}
            alt=""
          />
        </div>
      )}
      {quantity && <h6>Tenes {quantity} en el carrito</h6>}
      {product?.stock === quantity && (
        <h6>Ya tienes el maximo en el carrito</h6>
      )}
      <div style={{ display: "flex" }}>
        <Button variant="contained" onClick={addOne}>
          +
        </Button>
        <h4>{counter}</h4>
        <Button variant="contained" onClick={subOne}>
          -
        </Button>
      </div>
      <Button onClick={onAdd}>Agregar al carrito</Button>
    </div>
  );
};

export default ItemDetail;
