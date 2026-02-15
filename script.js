function goHome() {
  window.location.href = "index.html";
}
function goProducts() {
  window.location.href = "products.html";
}
function goCart() {
  window.location.href = "cart.html";
}
function goLogin() {
  window.location.href = "login.html";
}
function goSignup() {
  window.location.href = "signup.html";
}
function goCheckout() {
  window.location.href = "checkout.html";
}

function toggleMenu() {
  const dd = document.getElementById("dropdown");
  dd.classList.toggle("show");
}

document.addEventListener("click", function (e) {
  const menu = document.getElementById("user-menu");
  const dd = document.getElementById("dropdown");
  if (menu && dd && !menu.contains(e.target)) {
    dd.classList.remove("show");
  }
});

function loadProducts() {
  fetch("products.json")
    .then((r) => r.json())
    .then((products) => {
      const container = document.getElementById("product-container");
      container.innerHTML = "";

      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
        `;
        container.appendChild(card);
      });
    });
}

function searchProducts() {
  const q = (document.getElementById("searchBox")?.value || "").toLowerCase();
  fetch("products.json")
    .then((r) => r.json())
    .then((products) => {
      const container = document.getElementById("product-container");
      container.innerHTML = "";

      const filtered = products.filter((p) => p.name.toLowerCase().includes(q));

      if (filtered.length === 0) {
        container.innerHTML =
          "<p style='text-align:center;width:100%'>No products found.</p>";
        return;
      }

      filtered.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
        `;
        container.appendChild(card);
      });
    });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product.name + " added to cart!");
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-container");
  let total = 0;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML =
      "<p style='text-align:center;width:100%'>Your cart is empty.</p>";
    document.getElementById("total-price").innerText = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += Number(item.price);
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" style="width:150px;">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    container.appendChild(div);
  });

  document.getElementById("total-price").innerText = total;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !address || !phone) {
    alert("Please fill all details");
    return;
  }

  if (!localStorage.getItem("cart")) {
    alert("Cart is empty!");
    return;
  }

  localStorage.removeItem("cart");
  document.getElementById("message").innerText =
    "Order Placed Successfully! Thank you for shopping with ShopNest.";
}

function signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));
  document.getElementById("message").innerText =
    "Signup Successful! Redirecting to login...";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}

function login() {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No account found. Please signup first.");
    return;
  }

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (savedUser.email === email && savedUser.password === password) {
    localStorage.setItem("isLoggedIn", "true");
    document.getElementById("message").innerText = "Login Successful!";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    alert("Invalid email or password");
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedIn = localStorage.getItem("isLoggedIn");

  const auth = document.getElementById("auth-buttons");
  const menu = document.getElementById("user-menu");
  const uname = document.getElementById("username");

  if (user && loggedIn === "true") {
    if (auth) auth.style.display = "none";
    if (menu) menu.style.display = "block";
    if (uname) uname.innerText = user.name;
  } else {
    if (auth) auth.style.display = "block";
    if (menu) menu.style.display = "none";
  }
});
