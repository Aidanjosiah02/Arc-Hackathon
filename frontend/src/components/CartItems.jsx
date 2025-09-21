import React, { useEffect } from 'react';
import "./styles/CartItems.css"

// Component to display items in the cart
function CartItems({ orderList, setTotalCost, removeFromCart }) {
    // Recalculate total cost when the order list changes
    useEffect(() => {
        const total = orderList.reduce((sum, product) => {
            return sum + product.current_price * product.count;
        }, 0);
        setTotalCost(total);
    }, [orderList, setTotalCost]);

    // If the order list is empty, display a message
    if (!orderList || orderList.length === 0) {
        return (
            <section className="cart-items">
                <h3>Cart is empty</h3>
            </section>
        );
    }

    // Group items by merchant
    const groupedByMerchant = orderList.reduce((acc, product) => {
        const merchant = product.merchant || product.merchant_name || "Unknown Merchant";
        if (!acc[merchant]) {
            acc[merchant] = [];
        }
        acc[merchant].push(product);
        return acc;
    }, {});

    // Render the grouped cart items
    return (
        <section className="cart-items">
            <h3>Cart Items</h3>
            {Object.entries(groupedByMerchant).map(([merchant, products]) => (
                <div key={merchant} className="merchant-group">
                    <h4>{merchant}</h4>
                    <img className='product-image' src={products[0].merchant_logo} alt={products[0].merchant || products[0].merchant_name} />
                    <ul>
                        {products.map((product, index) => {
                            const groupCost = product.current_price * product.count;

                            return (
                                <li key={`${product.name}-${index}`} className="cart-item">
                                    <img className='product-image' src={product.image_url || product.clean_image_url} alt={product.name} /> <br />
                                    <span>{product.name}</span><br />
                                    <span>Quantity: {product.count}</span><br />
                                    <span>Cost: ${groupCost.toFixed(2)}</span><br />
                                    <button
                                        onClick={() => removeFromCart(product.id)}
                                        className="remove-cart-btn"
                                    >
                                        Remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </section>
    );
}

export default CartItems;
