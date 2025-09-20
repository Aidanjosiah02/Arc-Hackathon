import React from 'react';

function CartItems({ orderList }) {
    if (!orderList || orderList.length === 0) {
        return (
            <section className="cart-items">
                <h3>Cart is empty</h3>
            </section>
        );
    }

    const cartElements = orderList.map((product, index) => (
        <li key={`${product.name}-${index}`} className="cart-item">
            <span>{product.name}</span><br />
            <span>Selected Count: {product.count}</span>
        </li>
    ));

    return (
        <section className="cart-items">
            <h3>Cart Items</h3>
            <ul>
                {cartElements}
            </ul>
        </section>
    );
}


export default CartItems;