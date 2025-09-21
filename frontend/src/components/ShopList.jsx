import React, { useState, useEffect } from 'react';
import processList from './processList';
import Products from './Products';
import CartItems from './CartItems';
import "./styles/ShopList.css"

// Shopping List Component
// Includes the input form, item list, and product results
function ShopList() {

    const [input, setInput] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [postalCode, setPostalCode] = useState("V2C0C8");
    const [postalCodeInput, setPostalCodeInput] = useState('');


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

    // Remove item from the cart by product ID
    function removeFromCart(productId) { // Not used yet
        setOrderList(orderList.filter(item => item.id !== productId));
    }

    // Clear products and hide the section
    function clearProducts() {
        setProducts([]);
        setShowProducts(false);
    }

    // Process the list and fetch products for a specific item
    async function handleItemClick(item) {
        clearProducts();
        try {
            const result = await processList([item], postalCode); // Only process the clicked item
            setProducts(result);
        } catch (error) {
            console.error("Error processing list:", error);
        }
    };

    // Render the list of items in <li>
    const itemList = items.map((item, idx) => (
        <li key={idx} className='item' onClick={() => handleItemClick(item)}>
            <span>{item.name}</span>
            <button
                onClick={e => {
                    e.stopPropagation(); // Prevent triggering handleItemClick in parent <li>
                    handleRemove(idx);
                    clearProducts();
                }}
                className='remove-btn'
                aria-label={`Remove ${item.name}`}
            >×</button>
        </li>
    ))

    // Add selected product to order list with quantity
    // Clone to avoid reference issues
    function addToSelection(item, productCount) {
        let itemPersist = structuredClone(item);
        itemPersist.count = productCount
        setOrderList(prev => [...prev, itemPersist])
        console.log(orderList);
    }

    function handlePostalCode(event) {
        event.preventDefault();
        let trimmed = postalCodeInput.trim();
        if (trimmed) {
            trimmed = trimmed.toLowerCase()
            setPostalCode(trimmed);
            console.log("Postal code set to:", trimmed);
        }
    }

    // Render the component
    return (
        <>
            <form className='postal-code' onSubmit={handlePostalCode}>
                <input
                    type="text"
                    placeholder="V2C0C8"
                    value={postalCodeInput}
                    onChange={(e) => setPostalCodeInput(e.target.value)}
                    required
                />
                <button type="submit" style={{ margin: "10px" }}>Set postal code</button>
                <span>Currently: {postalCode}</span>
            </form>
            <section className='items'>
                <label htmlFor='add-type'>Add items to shopping list</label>
                <form onSubmit={handleAdd} className='add-item'>
                    
                    <input type="text" id='add-type' placeholder="Apples" value={input} onChange={event => setInput(event.target.value)} required />
                    {/* We don't really need QUANTITY input here */}
                    {/* <input type="number" min="1" value={quantity} onChange={event => setQuantity(Number(event.target.value))} required /> */}
                    <button type="submit" style={{ margin: "10px" }}>Add</button>
                    <button type="button" id="audio-btn" onClick={() => alert('Coming Soon...')}></button>
                    <button type="button" id="scan-btn" onClick={() => alert('Coming Soon...')}></button>
                </form>
                <ul className='item-list'>
                    {itemList}
                </ul>
                <button onClick={clearProducts}>Clear Result</button>
            </section>
            <CartItems orderList={orderList} setTotalCost={setTotalCost} removeFromCart={removeFromCart} />
            <section className="total-cost" style={{color: "white"}}>Total Cost: ${totalCost}</section>
            <section className='products-section'>
                {showProducts && <Products products={products} addToSelection={addToSelection} />}
            </section>
        </>
    );
};

export default ShopList;
