const cartDemo = [
    { id: 1, name: "Trà sữa trân châu", price: 25000, quantity: 2, image: "https://i.pinimg.com/736x/03/f6/fb/03f6fb4d51076c1d5b29657c5053907b.jpg" },
    { id: 2, name: "Bánh flan caramel", price: 15000, quantity: 1, image: "https://i.pinimg.com/736x/a9/ba/01/a9ba012483016f38a5e0fe2443e254aa.jpg" },
    { id: 3, name: "Cà phê sữa đá", price: 20000, quantity: 1, image: "https://i.pinimg.com/736x/0a/34/4c/0a344cfabbe54777fb3b1ff22405507c.jpg" }
];

let discountValue = 0;
let shippingFee = 10000;

/* ===== Render giỏ hàng ===== */
function renderCart() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    let subtotal = 0;
    cartDemo.forEach(item => {
        subtotal += item.price * item.quantity;

        cartList.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="item-img">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-price">${item.price.toLocaleString()} VND</div>
            </div>

            <div class="item-quantity">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <input type="number" value="${item.quantity}" min="1" onchange="manualQuantity(${item.id}, this.value)">
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>

            <div class="item-remove" onclick="removeItem(${item.id})">🗑️</div>
        </div>
        `;
    });

    updateSummary(subtotal);
}

/* ===== Cập nhật tổng ===== */
function updateSummary(subtotal) {
    const total = subtotal + shippingFee - discountValue;

    document.getElementById("subtotal").textContent = subtotal.toLocaleString() + " VND";
    document.getElementById("shipping").textContent = shippingFee.toLocaleString() + " VND";
    document.getElementById("discount").textContent = discountValue.toLocaleString() + " VND";
    document.getElementById("total").textContent = total.toLocaleString() + " VND";
}

/* ===== Thay đổi số lượng ===== */
function changeQuantity(id, delta) {
    const item = cartDemo.find(p => p.id === id);
    if (!item) return;

    item.quantity = Math.max(1, item.quantity + delta);
    renderCart();
}

/* ===== Nhập số lượng thủ công ===== */
function manualQuantity(id, newQty) {
    const item = cartDemo.find(p => p.id === id);
    if (!item) return;

    item.quantity = Math.max(1, parseInt(newQty) || 1);
    renderCart();
}

/* ===== Xóa sản phẩm ===== */
function removeItem(id) {
    const index = cartDemo.findIndex(p => p.id === id);
    if (index !== -1) {
        if (confirm("Bạn có chắc muốn xóa đơn này không ?")) {
            cartDemo.splice(index, 1);
            renderCart();
        }
    }
}

/* ===== Áp dụng mã giảm giá ===== */
function applyVoucher(code) {
    let subtotal = cartDemo.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (code === "SAVE20") {
        discountValue = subtotal * 0.2;
        shippingFee = 10000;
        alert(" Áp dụng mã SAVE20 thành công! Giảm 20% tổng đơn hàng.");
    } else if (code === "FREE50") {
        discountValue = 0;
        shippingFee = 0;
        alert(" Áp dụng mã FREE50 thành công! Miễn phí vận chuyển.");
    }
    updateSummary(subtotal);
}

/* ===== Thanh toán ===== */
function checkout() {
    alert("Demo Demo Demo. Gì quan trọng nói 3 lần =)))) ");
}

renderCart();
