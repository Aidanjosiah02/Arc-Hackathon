import React, { useState } from 'react';

function ProductNames() {
        console.log(products)
        const productNames = products.map((item) => {
            let productImage;
            if (item.image_url) {
                productImage = item.image_url
            }
            else {
                productImage = item.clean_image_url
            }
            return (
                <div className='product-box'>
                    <img className='product-image' src={productImage}></img>
                    <h3 className='product-name'>{item.name}</h3>
                    <p className='price'>${item.current_price}</p>
                    <form className='product-selection'>
                        <button onClick={() => setProductCount(productCount+1)}>+</button>
                        <button onClick={() => setProductCount(productCount-1)}>-</button>
                        <div>
                            <p>{productCount}</p>
                        </div>
                        <input type="submit" value="Add to selection"/>
                    </form>
                </div>
            )
        })
        return (<div className='products'>{productNames}</div>)
    }

    export default ProductNames;