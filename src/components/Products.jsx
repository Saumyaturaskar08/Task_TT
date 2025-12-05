import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  let [products, setProducts] = useState([]);
  let [quantities, setQuantities] = useState({}); 
  let navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log("Error:", err));
  }, []);

  
  let increment = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1, 
    }));
  };

  
  let decrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1, 
    }));
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((item) => (
        <div
          key={item.id}
          className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs"
        >
          <a href="#">
            <img
              className="rounded-t-base"
              src={item.thumbnail}
              alt={item.title}
            />
          </a>

          <div className="p-6 text-center">
            <span className="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
              Trending
            </span>

            <a href="#">
              <h5 className="mt-3 mb-4 text-2xl font-semibold tracking-tight text-heading">
                {item.title}
              </h5>
            </a>

            <p className="mb-4">{item.description}</p>
            <p className="mb-4 font-bold">₹{item.price}</p>

            
            <div className="flex flex-col gap-2">
             
              <button
                onClick={() => navigate(`/product/${item.id}`)}
                className="inline-flex items-center justify-center text-black bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2 focus:outline-none"
              >
                Product Details
              </button>

             
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => decrement(item.id)}
                  className="px-3 py-1 border rounded bg-gray-200"
                >
                  -
                </button>
                <span>{quantities[item.id] || 1}</span>
                <button
                  onClick={() => increment(item.id)}
                  className="px-3 py-1 border rounded bg-gray-200"
                >
                  +
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  Add to Cart
                </button>
              </div>

              
              <button className="px-4 py-2 bg-green-500 text-white rounded">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;






