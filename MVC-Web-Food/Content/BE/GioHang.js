// GioHang.js
(function () {
    'use strict';

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('cart')) || [];
        } catch (e) {
            console.error('Lỗi parse cart', e);
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // biến quản lý mã giảm giá hiện tại
    let discountValue = 0;
    let shippingFee = 20000; // mặc định phí vận chuyển

    function formatVND(n) {
        return n.toLocaleString('vi-VN') + ' VND';
    }

    function renderCart() {
        const cart = getCart();
        const cartList = document.getElementById('cartList');
        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping');
        const discountEl = document.getElementById('discount');
        const totalEl = document.getElementById('total');

        if (!cartList) return;

        if (cart.length === 0) {
            cartList.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #999;">
                    <i class="fa-solid fa-shopping-cart" style="font-size: 80px; display:block; margin-bottom: 20px; color: #ddd;"></i>
                    <h3 style="font-size: 24px; margin-bottom: 10px;">Giỏ hàng trống</h3>
                    <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
                </div>
            `;
            if (subtotalEl) subtotalEl.textContent = formatVND(0);
            if (shippingEl) shippingEl.textContent = formatVND(0);
            if (discountEl) discountEl.textContent = formatVND(0);
            if (totalEl) totalEl.textContent = formatVND(0);
            return;
        }

        let html = '';
        let subtotal = 0;

        cart.forEach((item, idx) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            html += `
                <div class="cart-item" data-idx="${idx}">
                    <img src="${item.image}" alt="${item.name}" class="item-img" style="width:100px;height:100px;object-fit:cover;">
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">${item.price.toLocaleString('vi-VN')} VND</div>
                        <div class="item-quantity">
                            <button onclick="changeQuantity(${idx}, -1)">-</button>
                            <input type="number" value="${item.quantity}" min="1" onchange="manualQuantity(${idx}, this.value)">
                            <button onclick="changeQuantity(${idx}, 1)">+</button>
                        </div>
                        <div class="item-total">Tổng: ${itemTotal.toLocaleString('vi-VN')} VND</div>
                        <div class="item-remove"><button onclick="removeItem(${idx})">🗑️ Xóa</button></div>
                    </div>
                </div>
            `;
        });

        cartList.innerHTML = html;

        const total = subtotal + shippingFee - discountValue;

        if (subtotalEl) subtotalEl.textContent = formatVND(subtotal);
        if (shippingEl) shippingEl.textContent = formatVND(shippingFee);
        if (discountEl) discountEl.textContent = formatVND(discountValue);
        if (totalEl) totalEl.textContent = formatVND(total);
    }

    // thay số lượng
    function changeQuantity(idx, delta) {
        const cart = getCart();
        if (!cart[idx]) return;
        cart[idx].quantity = Math.max(1, (Number(cart[idx].quantity) || 1) + delta);
        saveCart(cart);
        renderCart();
    }

    function manualQuantity(idx, newQty) {
        const cart = getCart();
        if (!cart[idx]) return;
        cart[idx].quantity = Math.max(1, parseInt(newQty) || 1);
        saveCart(cart);
        renderCart();
    }

    function removeItem(idx) {
        const cart = getCart();
        if (!cart[idx]) return;
        if (!confirm('Bạn có chắc muốn xóa sản phẩm này không?')) return;
        cart.splice(idx, 1);
        saveCart(cart);
        renderCart();
    }

    function applyVoucher(code) {
        const cart = getCart();
        if (cart.length === 0) {
            alert('Giỏ hàng trống! Vui lòng thêm sản phẩm trước.');
            return;
        }

        const subtotal = cart.reduce((s, it) => s + it.price * it.quantity, 0);

        if (code === 'SAVE20') {
            discountValue = Math.round(subtotal * 0.2);
            shippingFee = 20000;
            alert('Áp dụng mã SAVE20 thành công — giảm 20%!');
        } else if (code === 'FREE50') {
            discountValue = 0;
            shippingFee = 0;
            alert('Áp dụng mã FREE50 thành công — miễn phí vận chuyển!');
        } else {
            alert('Mã không hợp lệ');
        }

        renderCart();
    }

    function checkout() {
        const cart = getCart();
        if (cart.length === 0) {
            alert('Giỏ hàng trống! Không thể thanh toán.');
            return;
        }

        const subtotal = cart.reduce((s, it) => s + it.price * it.quantity, 0);
        const total = subtotal + shippingFee - discountValue;

        let orderInfo = 'THÔNG TIN ĐƠN HÀNG\n\n';
        cart.forEach(it => {
            orderInfo += `- ${it.name} x${it.quantity}: ${(it.price * it.quantity).toLocaleString('vi-VN')} VND\n`;
        });
        orderInfo += `\nPhí vận chuyển: ${shippingFee.toLocaleString('vi-VN')} VND`;
        orderInfo += `\nGiảm giá: ${discountValue.toLocaleString('vi-VN')} VND`;
        orderInfo += `\n\nTỔNG CỘNG: ${total.toLocaleString('vi-VN')} VND`;

        // hiển thị thông tin đơn hàng -> ở đây demo alert, anh thay bằng gọi API tạo Order nếu muốn
        alert(orderInfo);

        // sau khi thanh toán demo -> xóa cart
        localStorage.removeItem('cart');
        discountValue = 0;
        shippingFee = 20000;
        renderCart();
    }

    // expose functions globally để HTML dùng onclick trực tiếp
    window.changeQuantity = changeQuantity;
    window.manualQuantity = manualQuantity;
    window.removeItem = removeItem;
    window.applyVoucher = applyVoucher;
    window.checkout = checkout;

    // gọi render khi trang load
    document.addEventListener('DOMContentLoaded', function () {
        renderCart();
    });

})();
