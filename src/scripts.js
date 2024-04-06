import {products} from "./products";
import './app.css';
import logo from "./logo.png";
import React, {useState} from "react";
import {Categories} from "./Categories";

const render_products = (ProductsCategory) => {
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
        <div className="flex justify-between p-3">
        <p className="text-sm font-medium text-green-600">${product.price}</p>
          <div className="text-center" style = {{textAlign: 'center'}}>
            <h3 className="text-sm text-gray-700">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
              </a>
              <p>Tag - {product.category}</p>
            </h3>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  }

const BrowseView = () => {
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
return (
<div className="flex fixed flex-row">
<div className="h-screen bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
<img className="w-full" src={logo} alt="Sunset in the mountains" />
</div>
<div className="ml-5 p-10 xl:basis-4/5">
{console.log("Before render :",products.length,ProductsCategory.length)}
{render_products(ProductsCategory)}
</div>
</div>
);
} // end App
    

export default BrowseView;
