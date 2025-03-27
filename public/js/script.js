document.addEventListener("DOMContentLoaded", () => {
    const bikeTypeFilter = document.getElementById("bike-type");
    const bikes = document.querySelectorAll(".bike-card");
    const cartItemsContainer = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout");
    let cart = [];

    // Update UI for bike filtering
    bikeTypeFilter.addEventListener("change", (event) => {
        const filter = event.target.value;
        bikes.forEach(bike => {
            bike.style.display = (filter === "all" || bike.dataset.type === filter) ? "block" : "none";
        });
    });

    // Add to cart functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const bikeCard = event.target.closest(".bike-card");
            const bikeName = bikeCard.querySelector("h3").textContent;
            const bikePrice = bikeCard.querySelector("p").textContent;
            addToCart(bikeName, bikePrice);
        });
    });

    function addToCart(name, price) {
        const item = cart.find(bike => bike.name === name);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = cart.length === 0 ? "<p>Your cart is empty.</p>" : "";
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name} - ${item.price} (x${item.quantity})</p>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        setupRemoveButtons();
    }

    function setupRemoveButtons() {
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (event) => {
                cart = cart.filter(item => item.name !== event.target.dataset.name);
                updateCart();
            });
        });
    }

    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Thank you for shopping with us! Your order has been placed.");
        cart = [];
        updateCart();
    });
});
