import React, { useState, useEffect } from 'react';
import processList from './ProcessList';
import ProductBox from './ProductBox';
import CartItems from './CartItems';

// Shopping List Component
// Includes the input form, item list, and product results
function ShopList() {
    
    const [input, setInput] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [orderList, setOrderList] = useState([]);

    // Show products when they are available
    useEffect(() => {
        if (products.length > 0)
            setShowProducts(true);
    }, [products]);
    
    // Add the item from the form to the list
    // Reset input and quantity
    function handleAdd(event) {
        event.preventDefault();
        const trimmedInput = input.trim();
        if (trimmedInput && quantity > 0) {
            setItems([...items, { name: trimmedInput, quantity }]);
            setInput('');
            setQuantity(1);
        }
    };

    // Remove item from the list by index
    function handleRemove(index) {
        setItems(items.filter((_, i) => i !== index));
    };

    // Process the list and fetch products
    async function handleSubmit() {
        try {
            const result = await processList(items); // ⏳ wait for it to resolve
            console.log("Resolved products:", result);
            setProducts(result);
        } catch (error) {
            console.error("Error processing list:", error);
        }
    };

    // Render the list of items in <li>
    const itemList = items.map((item, idx) => (
        <li key={idx} className='item'>
            <span>{item.name} (x{item.quantity})</span>
            <button
                onClick={() => handleRemove(idx)}
                className='remove-btn'
                aria-label={`Remove ${item.name}`}
            >×</button>
        </li>
    ))

    // Add selected product to order list with quantity
    function addToSelection(item, productCount) {
        let itemPersist = structuredClone(item);
        itemPersist.count = productCount
        setOrderList([...orderList, itemPersist])
        console.log(orderList);
    }


    // Render the component
    return (
        <section className='main-container'>
            <section className='items'>
                <form onSubmit={handleAdd} className='add-item'>
                    <input type="text" placeholder="Apples" value={input} onChange={event => setInput(event.target.value)} required />
                    <input type="number" min="1" value={quantity} onChange={event => setQuantity(Number(event.target.value))} required />
                    <button type="submit">Add</button>
                </form>
                <ul className='item-list'>
                    {itemList}
                </ul>
                <button onClick={handleSubmit}>Submit</button>
            </section>
            <section className='products-section'>
                {showProducts && <ProductBox products={products} addToSelection={addToSelection}/>}
            </section>
            <CartItems />
        </section>
    );
};

export default ShopList;