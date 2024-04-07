import {products} from "./products";
import './app.css';
import logo from "./logo.png";
import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";


function PaymentScreen({closeAndEmpty, cart, products}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    let newTotal = 0;
    Object.keys(cart).forEach(productId => {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            newTotal += (cart[productId] * product.price);
        }
    });
    setTotalCost(newTotal);
  }, [cart, products]);

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data); 
    toggleConfirmation();
  };

  return (
    <div className="payment-modal">
      <div className="payment-form">
        <h2>Payment Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("fullName", { required: "Full Name is required", minLength: { value: 2, message: "Full Name must be at least 2 characters" } })} placeholder="Full Name" />
          {errors.fullName && <p>{errors.fullName.message}</p>}

          <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })} placeholder="Email" />
          {errors.email && <p>{errors.email.message}</p>}

          <input {...register("creditCard", { required: "Credit Card is required", pattern: { value: /^\d{4}-?\d{4}-?\d{4}-?\d{4}$/, message: "Invalid Credit Card format" } })} placeholder="Credit Card" />
          {errors.creditCard && <p>{errors.creditCard.message}</p>}

          <input {...register("address", { required: "Address is required" })} placeholder="Address" />
          {errors.address && <p>{errors.address.message}</p>}

          <input {...register("city", { required: "City is required" })} placeholder="City" />
          {errors.city && <p>{errors.city.message}</p>}

          <input {...register("state", { required: "State is required" })} placeholder="State" />
          {errors.state && <p>{errors.state.message}</p>}

          <input {...register("zip", { required: "Zip is required", pattern: { value: /^\d{5}$/, message: "Invalid Zip format" } })} placeholder="Zip" />
          {errors.zip && <p>{errors.zip.message}</p>}

          <button type="submit">Checkout</button>
        </form>
      </div>
      {showConfirmation && (
        <div id="myPopup" className="popup">
          <div className="popup-content">
            <h3>Payment Successful!</h3>
            <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
          </div>
          <button onClick={() => closeAndEmpty()}>Close</button>
        </div>
      )}
    </div>
  );
}



const render_products = (ProductsCategory, addToCart, removeFromCart) => {
  return <div className='category-section fixed'>
  <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
  <div className="product_catalog" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
    {/* Loop Products */}
    {ProductsCategory.map((product, index) => (
      <div key={index} className="group relative shadow-lg">
        <div className="product_item" style={{ height: '500px', border: '1px solid #ccc', overflow: 'auto' }}>
          <img
            alt="Product Image"
            src={product.image}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div> 
        <div className="flex justify-between p-3" style={{ display: 'flex', alignItems: 'center', justifyContent:'flex-end'}}>
          <p className="text-sm font-medium text-green-600" style = {{fontSize: '2.0rem'}}>${product.price}</p>
          <div style={{ marginLeft: 'auto' }}>
            <button onClick={() => addToCart(product.id)} style={{ width: '100px', height: '40px', fontSize: '1rem', backgroundColor: 'green', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}>+</button>
            <button onClick={() => removeFromCart(product.id)} style={{ width: '100px', height: '40px', fontSize: '1rem', backgroundColor: 'red', border: '1px solid #ccc', borderRadius: '5px' }}>-</button>
          </div>
        </div>
        <div className="text-center" style = {{textAlign: 'center'}}>
          <h3 className="text-sm text-gray-700">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              <span style={{ fontSize: '24px', fontWeight: '600' }}>{product.title}</span>
            </a>
            <p>{product.category}</p>
          </h3>
        </div>
      </div>
      ))}
    </div>
  </div>
}

const BrowseView = () => {

    const [cart, setCart] = useState({});
    const [showCart, setShowCart] = useState(false);
    const [ProductsCategory, setProductsCategory] = useState(products);
    const [query, setQuery] = useState('');
    const [isPaymentScreenVisible, setIsPaymentScreenVisible] = useState(false);

    
    const closePaymentScreenAndEmptyCart = () => {
      setIsPaymentScreenVisible(false);
      setCart({});
    };

    const addToCart = (productId) => {
        const updatedCart = { ...cart };
        const product = products.find(p => p.id === productId);

        if(product) {
          updatedCart[productId] = (updatedCart[productId] || 0) + 1;
          setCart(updatedCart);
        }
        
        else {
          console.error("Product does not exist with given ID");
        }
    };

    const removeFromCart = (productId) => {
      const updatedCart = { ...cart };
        if (updatedCart[productId] > 1) {
            updatedCart[productId] -= 1;
        } else {
            delete updatedCart[productId];
        }
        setCart(updatedCart);
    };

    

    const renderCart = () => {
      return (
        <div style={{
          display: showCart ? "block" : "none",
          position: "absolute",
          right: "20px",
          top: "60px",
          backgroundColor: "white",
          padding: "20px",
          border: "1px solid #ddd",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          width: "300px",
          zIndex: 1000
        }}>
          <h2 style={{ margin: "0 0 20px 0", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Your Cart</h2>
          {Object.entries(cart).length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            Object.entries(cart).map(([productId, quantity]) => {
              // Find the product to get its details
              const product = products.find(product => product.id.toString() === productId);
              // If product is found, display it along with its price and quantity
              return product ? (
                <div key={productId} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #f0f0f0"
                }}>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Product ID:</span> {productId} <br />
                    <span style={{ fontWeight: "bold" }}>Quantity:</span> {quantity} <br/>
                    {/* Displaying the price */}
                    <span style={{ fontWeight: "bold" }}>Price:</span> ${product.price}
                  </div>
                  <button onClick={() => removeFromCart(productId)} style={{
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}>
                    Remove
                  </button>
                </div>
              ) : null;
            })
          )}
          <button onClick={() => setIsPaymentScreenVisible(true)} style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
            Payment
          </button>
          {isPaymentScreenVisible && <PaymentScreen 
                                        closeAndEmpty={closePaymentScreenAndEmptyCart}
                                        cart={cart}
                                        products={products}
                                      />
          }
        </div>
      );
    };
    
      

      
    

    console.log("Step 1 : load Products in a useState.");

    const handleChange = (e) => {
        setQuery(e.target.value);
        const filteredProducts = products.filter(product => product.title.toLowerCase().includes(e.target.value.toLowerCase()));
        setProductsCategory(filteredProducts);
    };

  return (
    <div className="flex fixed flex-row">
      <div className="navbar flex justify-between items-center p-3 bg-gray-800 text-white">
        <div className="search-bar">
          <div className="py-10" style = {{flex:'1'}}>
            <input type="search" value={query} onChange={handleChange} style={{ border: '2px solid #ccc', width: '25%'}} placeholder="Search Products:"/>
          </div>
          <button className="cart-button" onClick={() => setShowCart(!showCart)} style={{border:'2px solid #ccc'}}>View Cart</button>
        </div>
        {renderCart()}
        <div className="h-screen bg-slate-800 p-3 xl:basis-1/5" style={{ display: 'flex', justifyContent: 'center', minWidth: '65%', justifyContent:'center'}}>
          <img className="w-full" src={logo} alt="logo" />
        </div>
        <div className="ml-5 p-10 xl:basis-4/5">
          {console.log("Before render :",products.length,ProductsCategory.length)}
          {render_products(ProductsCategory, addToCart, removeFromCart)}
        </div>
      </div>
    </div>
  );
} // end App
    

export default BrowseView;
