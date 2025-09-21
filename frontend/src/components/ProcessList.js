"use strict"

const baseUrl = "https://cdn-gateflipp.flippback.com/bf/flipp/items/search?"
const locale = "en-ca"
const postalCode = "V0E1K0"
const sid = ""

// Sort items by current_price in ascending order
function sortItems(data) {
    const products = [...data.ecom_items, ...data.items]
    return products.sort((a, b) => a.current_price - b.current_price);
}

// Fetch products for a single item
async function getProducts(item) {
    const query = item.name;
    const url = `${baseUrl}locale=${locale}&postal_code=${postalCode}&sid=${sid}&q=${query}`;
    console.log(url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return sortItems(data); // This returns the sorted array
    } catch (error) {
        console.error("Fetch error:", error);
        return []; // Return an empty array on error to avoid breaking `Promise.all`
    }
}

// Get products for a single item
async function processItems(items) {
    const fetchPromises = items.map(async (item) => getProducts(item));
    const allResults = await Promise.all(fetchPromises);
    console.log(allResults.flat());
    return allResults.flat();
}

export default processItems; 