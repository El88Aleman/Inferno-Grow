import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let refCollection = collection(db, "products");
    getDocs(refCollection)
      .then((res) => {
        let newArray = res.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });
        setProducts(newArray);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(products);

  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <img
              src={product.image}
              style={{ width: "400px", heigth: "500px" }}
              alt=""
            />
            <h4>{product.title}</h4>
            <h4>${product.unit_price}</h4>
            <h4>{product.stock}</h4>
            <Link to={`/itemDetail/${product.id}`}>Ver Detalle</Link>
          </div>
        );
      })}
    </div>
  );
};
export default ItemListContainer;
