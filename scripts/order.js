function addToOrder() {
  const inputs = document.querySelectorAll('#products input[type="number"]');
  const cart = [];

  inputs.forEach(input => {
    const quantity = parseInt(input.value);
    const name = input.dataset.name;
    const price = parseFloat(input.dataset.price);

    if (quantity > 0) {
      cart.push({ name, quantity, price });
    }
  });

  if (cart.length === 0) {
    alert("Please select at least one item.");
    return;
  }

  localStorage.setItem("cart", JSON.stringify({ items: cart }));
  alert("Items added to cart!");

  const orderTableBody = document.querySelector("#orderTable tbody");
  const totalEl = document.getElementById("total");

  if (orderTableBody && totalEl) {
    orderTableBody.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>Rs.${(item.price * item.quantity).toLocaleString()}</td>
      `;
      orderTableBody.appendChild(row);
      total += item.quantity * item.price;
    });

    totalEl.textContent = "Rs." + total.toLocaleString();
  }
}

function saveToFavourites() {
  const inputs = document.querySelectorAll('input[type="number"]');
  const favourites = [];

  inputs.forEach(input => {
    favourites.push({
      name: input.dataset.name,
      price: input.dataset.price,
      quantity: input.value
    });
  });

  localStorage.setItem("favouriteOrder", JSON.stringify(favourites));
  alert("Order saved to favourites!");
}

function applyFavourites() {
  const fav = localStorage.getItem("favouriteOrder");
  if (!fav) {
    alert("No favourite order saved.");
    return;
  }

  const favItems = JSON.parse(fav);
  const inputs = document.querySelectorAll('input[type="number"]');

  favItems.forEach((item, i) => {
    if (inputs[i]) {
      inputs[i].value = item.quantity;
    }
  });

  addToOrder();
  alert("Favourite order applied.");
}

// ✅ All logic in one single DOMContentLoaded block
window.addEventListener("DOMContentLoaded", () => {
  fetch("data/products.json")
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById("products");

      // 1. Group and render products
      const grouped = {};
      products.forEach(product => {
        if (!grouped[product.category]) {
          grouped[product.category] = [];
        }
        grouped[product.category].push(product);
      });

      for (const category in grouped) {
        const section = document.createElement("section");
        section.classList.add("category");

        const heading = document.createElement("h2");
        heading.textContent = category;
        section.appendChild(heading);

        const grid = document.createElement("div");
        grid.classList.add("product-grid");

        grouped[category].forEach(product => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");
          productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <label>${product.name} - Rs.${product.price.toLocaleString()}</label>
            <input type="number" min="0" value="0" 
              data-name="${product.name}" 
              data-price="${product.price}">
          `;
          grid.appendChild(productDiv);
        });

        section.appendChild(grid);
        container.appendChild(section);
      }

      // ✅ STEP 2: Restore cart quantities after render
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      if (savedCart && savedCart.items) {
        savedCart.items.forEach(savedItem => {
          const input = document.querySelector(`input[data-name="${savedItem.name}"]`);
          if (input) {
            input.value = savedItem.quantity;
          }
        });
      }

      // ✅ Buy Now button
      document.getElementById("buyNowBtn").addEventListener("click", () => {
        const inputs = document.querySelectorAll('#products input[type="number"]');
        const cart = [];
        let total = 0;

        inputs.forEach(input => {
          const quantity = parseInt(input.value);
          const name = input.dataset.name;
          const price = parseFloat(input.dataset.price);

          if (quantity > 0) {
            cart.push({ name, quantity, price });
            total += price * quantity;
          }
        });

        if (cart.length === 0) {
          alert("Please select at least one item.");
          return;
        }

        localStorage.setItem("cart", JSON.stringify({ items: cart, total }));
        window.location.href = "checkout.html";
      });
    })
    .catch(error => {
      console.error("Error loading products:", error);
    });
});

      
