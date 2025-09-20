import React, { useState } from 'react';
import ProcessList from './ProcessList';

function ShopList() {
    const [input, setInput] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [items, setItems] = useState([]);

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

    return (
        <section className='items'>
            <form onSubmit={handleAdd} className='add-item'>
                <input type="text" placeholder="Apples" value={input} onChange={e => setInput(e.target.value)} required />
                <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} required />
                <button type="submit">Add</button>
            </form>
            <ul className='item-list'>
                {itemList}
            </ul>
            {}
            
        </section>
    );
};

export default ShopList;