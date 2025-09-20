import React, { useState, useEffect } from 'react';
import processList from './ProcessList';

function ShopList() {
    const [input, setInput] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [productCount, setProductCount] = useState(1);
    const [orderList, setOrderList] = useState([]);

    const handleAdd = (event) => {
        event.preventDefault();
        const trimmedInput = input.trim();
        if (trimmedInput && quantity > 0) {
            setItems([...items, { name: trimmedInput, quantity }]);
            setInput('');
            setQuantity(1);
            // 2 truths and a lie
            // I have never broken a bone before now.


            // use AI model to parse pdfs
        }
    };

    const handleRemove = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        try {
            const result = await processList(items); // ⏳ wait for it to resolve
            console.log("Resolved products:", result);
            setProducts(result);
        } catch (error) {
            console.error("Error processing list:", error);
        }
    };

    // Detect when products update
    useEffect(() => {
        if (products.length > 0) {
            setShowProducts(true);
        }
    }, [products]);

    const itemList = items.map((item, idx) => (
        <li key={idx} className='item'>
            <span>
                {item.name} (x{item.quantity})
            </span>
            <button
                onClick={() => handleRemove(idx)}
                className='remove-btn'
                aria-label={`Remove ${item.name}`}
            >
                ×
            </button>
        </li>
    ))

    function addToSelection(item, productCount) {
        item.count = productCount
        console.log(item.count)
        setOrderList([...orderList, item])
        setProductCount(1)
    }

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
                    <form className='product-selection' action={() => addToSelection(item, productCount)}>
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

    return (
        <section className='main-container'>
            <section className='items'>
                <form onSubmit={handleAdd} className='add-item'>
                    <input type="text" placeholder="Apples" value={input} onChange={e => setInput(e.target.value)} required />
                    <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} required />
                    <button type="submit">Add</button>
                </form>
                <ul className='item-list'>
                    {itemList}
                </ul>
                <button onClick={handleSubmit}>Submit</button>
            </section>
            <section className='products-section'>
                <h1>asdasdsad</h1>
                {showProducts && <ProductNames />}
            </section>
        </section>
    );
};

export default ShopList;