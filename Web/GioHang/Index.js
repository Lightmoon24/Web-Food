const cartDemo = [
    { id: 1, name: "Trà sữa trân châu", price: 25000, quantity: 2, image: "https://i.pinimg.com/736x/03/f6/fb/03f6fb4d51076c1d5b29657c5053907b.jpg" },
    { id: 2, name: "Bánh flan caramel", price: 15000, quantity: 1, image: "https://i.pinimg.com/736x/a9/ba/01/a9ba012483016f38a5e0fe2443e254aa.jpg" },
    { id: 3, name: "Cà phê sữa đá", price: 20000, quantity: 1, image: "https://i.pinimg.com/736x/0a/34/4c/0a344cfabbe54777fb3b1ff22405507c.jpg" }
];

// trạng thái voucher
let appliedVouchers = {
  SAVE20: false,
  FREE50: false
};

const shippingFeeDefault = 10000; // phí chuẩn
let shippingFee = shippingFeeDefault; // sẽ thay đổi nếu FREE50 được áp

// helper: tính subtotal hiện tại
function calculateSubtotal() {
  return cartDemo.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/* ===== Render giỏ hàng ===== */
function renderCart() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    cartDemo.forEach(item => {
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

    updateSummary(); // dùng subtotal nội bộ
}

/* ===== Cập nhật tổng ===== */
function updateSummary() {
    const subtotal = calculateSubtotal();

    // nếu SAVE20 đang bật -> tính discount = 20% * subtotal, ngược lại 0
    const discountValue = appliedVouchers.SAVE20 ? Math.round(subtotal * 0.2) : 0;

    // phí ship theo trạng thái FREE50
    const currentShipping = appliedVouchers.FREE50 ? 0 : shippingFeeDefault;

    const total = subtotal + currentShipping - discountValue;

    document.getElementById("subtotal").textContent = subtotal.toLocaleString() + " VND";
    document.getElementById("shipping").textContent = currentShipping.toLocaleString() + " VND";
    document.getElementById("discount").textContent = discountValue.toLocaleString() + " VND";
    document.getElementById("total").textContent = total.toLocaleString() + " VND";

    // (tuỳ chọn) cập nhật trạng thái nút voucher (thêm class .active nếu muốn)
    updateVoucherUI();
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
        if (confirm("Bạn có chắc bỏ món này khỏi danh sách ? ")) {
            cartDemo.splice(index, 1);
            renderCart();
        }
    }
}

/* ===== Áp dụng / bỏ voucher (toggle) ===== */
function applyVoucher(code) {
    const subtotal = calculateSubtotal();

    if (code === "SAVE20") {
        // chỉ bật/tắt SAVE20; không ảnh hưởng FREE50
        if (appliedVouchers.SAVE20) {
            appliedVouchers.SAVE20 = false;
            alert("Đã hủy mã SAVE20.");
        } else {
            // nếu muốn kiểm tra điều kiện (ví dụ subtotal tối thiểu), làm ở đây
            appliedVouchers.SAVE20 = true;
            alert("Áp dụng SAVE20 thành công! Giảm 20% tổng đơn hàng.");
        }
    } else if (code === "FREE50") {
        // chỉ bật/tắt FREE50; không ảnh hưởng SAVE20
        if (appliedVouchers.FREE50) {
            appliedVouchers.FREE50 = false;
            alert("Đã hủy mã FREE50 (miễn phí vận chuyển).");
        } else {
            appliedVouchers.FREE50 = true;
            alert("Áp dụng FREE50 thành công! Miễn phí vận chuyển.");
        }
    }

    updateSummary();
}

/* ===== Cập nhật UI cho voucher (tuỳ chọn) ===== */
function updateVoucherUI() {
    // nếu muốn highlight voucher đang bật, thêm data-code vào HTML voucher-item:
    // <div class="voucher-item" data-code="SAVE20" onclick="applyVoucher('SAVE20')">...
    // rồi cập nhật class .active dưới đây:
    const els = document.querySelectorAll('.voucher-item[data-code]');
    els.forEach(el => {
        const code = el.getAttribute('data-code');
        if (appliedVouchers[code]) el.classList.add('active');
        else el.classList.remove('active');
    });
}

/* ===== Thanh toán ===== */
function checkout() {
    alert("Demo Demo Demo. Gì quan  trọng nhắc 3 lần =))))");
}

renderCart();
