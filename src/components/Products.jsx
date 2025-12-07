import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CartContext from "./CartContext";

const Products = () => {
  let [products, setProducts] = useState([]);
  let [quantities, setQuantities] = useState({});
  let { cartItems, setCartItems, sidebarOpen, setSidebarOpen } = useContext(CartContext);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then(response => setProducts(response.data.products))
      .catch(err => console.log("Error:", err));
  }, []);

  let increment = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  let decrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1
    }));
  };

  let addToCart = (product) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let found = false;

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === product.id) {
        cartItems[i].quantity += quantities[product.id] || 1;
        found = true;
        break;
      }
    }

    if (!found) {
      cartItems.push({ ...product, quantity: quantities[product.id] || 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCartItems(cartItems);
    setSidebarOpen(true);
  };

  // sidebar increment decrement
  let incrementCartItem = (id) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
    updateLocalStorage();
  };

  const decrementCartItem = (id) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
    ));
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  // end

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(item => (
        <div key={item.id} className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs">
          <a href="#">
            <img className="rounded-t-base" src={item.thumbnail} alt={item.title} />
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
                <button onClick={() => decrement(item.id)} className="px-3 py-1 border rounded bg-gray-200">-</button>
                <span>{quantities[item.id] || 1}</span>
                <button onClick={() => increment(item.id)} className="px-3 py-1 border rounded bg-gray-200">+</button>
                <button onClick={() => addToCart(item)} className="px-3 py-1 bg-blue-500 text-white rounded">Add to Cart</button>
              </div>
              <button className="px-4 py-2 bg-green-500 text-white rounded">Buy Now</button>
            </div>
          </div>
        </div>
      ))}

      {sidebarOpen && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 z-50 overflow-y-auto">
          <button onClick={() => setSidebarOpen(false)} className="absolute top-2 right-2 text-xl">×</button>
          <h3 className="text-xl font-bold">Cart</h3>
          {cartItems.map(item => (
            <div key={item.id} className="mb-4 border-b pb-2">
              <img src={item.thumbnail} alt={item.title} className="w-full h-auto mb-2" />
              <h4 className="font-bold">{item.title}</h4>
              <p>₹{item.price}</p>
              <div className="flex items-center space-x-1 mt-2">
                <button onClick={() => decrementCartItem(item.id)} className="px-2 py-1 border border-default rounded bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none">-</button>
                <span className="font-medium">{item.quantity}</span>
                <button onClick={() => incrementCartItem(item.id)} className="px-2 py-1 border border-default rounded bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none">+</button>
              </div>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Buy Now</button>
        </div>
      )}
    </div>
  );
};

export default Products;

// previous code
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("https://dummyjson.com/products")
//       .then(response => setProducts(response.data.products))
//       .catch(err => console.log("Error:", err));
//   }, []);

//   const increment = (id) => {
//     setQuantities(prev => ({
//       ...prev,
//       [id]: (prev[id] || 1) + 1
//     }));
//   };

//   const decrement = (id) => {
//     setQuantities(prev => ({
//       ...prev,
//       [id]: prev[id] > 1 ? prev[id] - 1 : 1
//     }));
//   };

//   const addToCart = (product) => {
//     let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     let found = false;

//     for (let i = 0; i < cartItems.length; i++) {
//       if (cartItems[i].id === product.id) {
//         cartItems[i].quantity += quantities[product.id] || 1;
//         found = true;
//         break;
//       }
//     }

//     if (!found) {
//       cartItems.push({ ...product, quantity: quantities[product.id] || 1 });
//     }

//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     setCartItems(cartItems);
//     setSidebarOpen(true);
//   };

//   // side bar increment decrement 
//   const incrementCartItem = (id) => {
//   setCartItems(prev => prev.map(item => 
//     item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//   ));
//   updateLocalStorage();
// };

// const decrementCartItem = (id) => {
//   setCartItems(prev => prev.map(item => 
//     item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
//   ));
//   updateLocalStorage();
// };

// const updateLocalStorage = () => {
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// };
// // end

//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {products.map(item => (
//         <div key={item.id} className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs">
//           <a href="#">
//             <img className="rounded-t-base" src={item.thumbnail} alt={item.title} />
//           </a>
//           <div className="p-6 text-center">
//             <span className="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
//               Trending
//             </span>
//             <a href="#">
//               <h5 className="mt-3 mb-4 text-2xl font-semibold tracking-tight text-heading">
//                 {item.title}
//               </h5>
//             </a>
//             <p className="mb-4">{item.description}</p>
//             <p className="mb-4 font-bold">₹{item.price}</p>
//             <div className="flex flex-col gap-2">
//               <button
//                 onClick={() => navigate(`/product/${item.id}`)}
//                 className="inline-flex items-center justify-center text-black bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2 focus:outline-none"
//               >
//                 Product Details
//               </button>
//               <div className="flex items-center justify-center gap-2">
//                 <button onClick={() => decrement(item.id)} className="px-3 py-1 border rounded bg-gray-200">-</button>
//                 <span>{quantities[item.id] || 1}</span>
//                 <button onClick={() => increment(item.id)} className="px-3 py-1 border rounded bg-gray-200">+</button>
//                 <button onClick={() => addToCart(item)} className="px-3 py-1 bg-blue-500 text-white rounded">Add to Cart</button>
//               </div>
//               <button className="px-4 py-2 bg-green-500 text-white rounded">Buy Now</button>
//             </div>
//           </div>
//         </div>
//       ))}

//       {sidebarOpen && (
//         <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 z-50 overflow-y-auto">
//           <button onClick={() => setSidebarOpen(false)} className="absolute top-2 right-2 text-xl">×</button>
//           <h3 className="text-xl font-bold">Cart</h3>
//           {cartItems.map(item => (
//             <div key={item.id} className="mb-4 border-b pb-2">
//               <img src={item.thumbnail} alt={item.title} className="w-full h-auto mb-2" />
//               <h4 className="font-bold">{item.title}</h4>
//               <p>₹{item.price}</p>
// {/* sidebar inc nd dec button */}
// {/* <div className="flex items-center justify-between mt-2">
//   <button onClick={() => decrementCartItem(item.id)} className="px-3 py-1 border rounded bg-gray-200">-</button>
//   <span>{item.quantity}</span>
//   <button onClick={() => incrementCartItem(item.id)} className="px-3 py-1 border rounded bg-gray-200">+</button>
// </div> */}

// <div className="flex items-center space-x-1 mt-2">
//   <button onClick={() => decrementCartItem(item.id)} className="px-2 py-1 border border-default rounded bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none">-</button>
//   <span className="font-medium">{item.quantity}</span>
//   <button onClick={() => incrementCartItem(item.id)} className="px-2 py-1 border border-default rounded bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none">+</button>
// </div>

// {/* end */}

//               <p>Quantity: {item.quantity}</p>
//             </div>
//           ))}
//           <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Buy Now</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;




