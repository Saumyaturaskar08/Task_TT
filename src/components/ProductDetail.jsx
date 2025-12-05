import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  let { id } = useParams();
  let [product, setProduct] = useState(null);
  let [quantity, setQuantity] = useState(1);

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  fetchProduct();
}, [id]);


  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <img src={product.thumbnail} alt={product.title} className="mb-4" />
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="mb-4">{product.description}</p>
      <p className="mb-4 font-bold text-xl">₹{product.price}</p>

      
      <div className="flex items-center mb-4">
        <button
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          className="px-3 py-1 border rounded"
        >
          -
        </button>
        <span className="px-4">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-1 border rounded"
        >
          +
        </button>
      </div>

      <div className="flex gap-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Buy Now
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
