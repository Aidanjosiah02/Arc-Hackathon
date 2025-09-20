import React, { useState } from 'react';

function ProductItem({item, addToSelection}) {
    const [productCount, setProductCount] = useState(1);

    return (
    <div className='product-box'>
        <img className='product-image' src={item.image_url || item.clean_image_url} alt={item.name} />
        <h3 className='product-name'>{item.name}</h3>
        <p className='price'>${item.current_price}</p>
        <form onSubmit={(event) => {event.preventDefault(); addToSelection(item, productCount); setProductCount(1);}}>
            <button type="button" onClick={() => setProductCount(count => Math.max(1, count - 1))}>-</button>
            <span>{productCount}</span>
            <button type="button" onClick={() => setProductCount(count => count + 1)}>+</button>
            <input type="submit" value="Add to selection" />
        </form>
    </div>
    );
}

function ProductBox({products, addToSelection}) {
    return (
        <div className='products'>
        {products.map(item => (
            <ProductItem key={item.id} item={item} addToSelection={addToSelection} />
        ))}
        </div>
    );
}

export default ProductBox;