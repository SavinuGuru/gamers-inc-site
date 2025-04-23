if (country && name && email && address && city && postalcode && card) {
    document.getElementById("messageBox").textContent =
      `Thank you, ${name}! Redirecting you...`;
    localStorage.removeItem("cart");
    setTimeout(() => {
      window.location.href = "thankyou.html";
    }, 2000);
  }
  