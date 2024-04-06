import {products} from "./products";
import './app.css';
import logo from "./logo.png";
import React, {useState} from "react";
import {Categories} from "./Categories";

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
        <button onClick={() => addToCart(product.id)} style={{ width: '100px', height: '40px', fontSize: '1rem', backgroundColor: '#eee', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}>+</button>
        <button onClick={() => removeFromCart(product.id)} style={{ width: '100px', height: '40px', fontSize: '1rem', backgroundColor: '#eee', border: '1px solid #ccc', borderRadius: '5px' }}>-</button>
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
    const addToCart = (productId) => {
        const updatedCart = { ...cart };
        updatedCart[productId] = (updatedCart[productId] || 0) + 1;
        setCart(updatedCart);
    };

    const removeFromCart = (productId) => {
        const updatedCart = { ...cart };
        if (updatedCart[productId] > 0) {
            updatedCart[productId] -= 1;
            setCart(updatedCart);
        }
    };
  function handleClick(tag) {
    console.log("Step 4 : in handleClick", tag);
    let filtered = products.filter(cat => cat.category === tag);
    // modify useState
    setProductsCategory(filtered);
    // ProductsCategory = filtered;
console.log("Step 5 : ", products.length, ProductsCategory.length);
    }
  console.log("Step 1 : load Products in a useState.");
const [ProductsCategory, setProductsCategory] = useState(products);
const [query, setQuery] = useState('');
const handleChange = (e) => {
    setQuery(e.target.value);
    console.log("Step 6 : in handleChange, Target Value :",e.target.value," Query Value :",query);
    const results = products.filter(eachProduct => {
    if (e.target.value === "") return ProductsCategory;
    return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setProductsCategory(results);
    }
return (
<div className="flex fixed flex-row">
    <div className="navbar flex justify-between items-center p-3 bg-gray-800 text-white">
            <div className="search-bar">
            <div className="py-10" style = {{flex:'1'}}>
            <input type="search" value={query} onChange={handleChange} style={{ border: '2px solid #ccc', width: '25%'}} placeholder="Search Products:"/>
            </div>
        <button className="cart-button" onClick={() => console.log('View Cart')} style={{border:'2px solid #ccc'}}>View Cart</button>
    </div>
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
