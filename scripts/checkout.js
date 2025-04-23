const cartData = JSON.parse(localStorage.getItem("cart"));
const tbody = document.querySelector("#orderTable tbody");
const totalPriceEl = document.getElementById("totalPrice");

if (cartData && cartData.items && cartData.items.length > 0) {
  let total = 0;
  cartData.items.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>Rs.${(item.price * item.quantity).toLocaleString()}</td>
    `;
    tbody.appendChild(row);
    total += item.price * item.quantity;
  });
  totalPriceEl.textContent = "Rs." + total.toLocaleString();
} else {
  tbody.innerHTML = `<tr><td colspan="3">No items found in your cart.</td></tr>`;
}

// Handle payment
document.getElementById("payBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const card = document.getElementById("card").value.trim();
  const messageBox = document.getElementById("messageBox");

  if (name && email && address && card) {
    messageBox.textContent = `✅ Thank you, ${name}! Your order will be delivered to ${address}.`;
    localStorage.removeItem("cart");
    document.getElementById("checkoutForm").reset();

    setTimeout(() => {
      window.location.href = "thankyou.html";
    }, 2000);
  } else {
    alert("⚠️ Please fill out all fields before proceeding.");
  }
});


