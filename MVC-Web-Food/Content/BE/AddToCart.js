// AddToCart.js
(function (global) {
    'use strict';

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('cart')) || [];
        } catch (e) {
            console.error('Lỗi parse cart từ localStorage', e);
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    /**
     * product: { id, name, price, image, quantity }
     */
    function addToCart(product) {
        if (!product || !product.id) {
            alert('Sản phẩm không hợp lệ');
            return;
        }

        const cart = getCart();
        const idx = cart.findIndex(p => p.id === product.id);

        if (idx > -1) {
            // nếu đã có, tăng số lượng
            cart[idx].quantity = (cart[idx].quantity || 0) + (product.quantity || 1);
        } else {
            // thêm mới (chuẩn hoá)
            cart.push({
                id: product.id,
                name: product.name || '',
                price: Number(product.price) || 0,
                image: product.image || '',
                quantity: Number(product.quantity) || 1
            });
        }

        saveCart(cart);
        alert(` Đã thêm "${product.name}" vào giỏ hàng.`);
    }

    /**
     * buyNow: thêm vào giỏ rồi chuyển sang trang cart
     * redirectUrl: đường dẫn (string) đến trang giỏ hàng
     */
    function buyNow(product, redirectUrl) {
        addToCart(product);
        if (redirectUrl) {
            window.location.href = redirectUrl;
        } else {
            // mặc định chuyển tới /Home/GioHang
            window.location.href = '/Home/GioHang';
        }
    }

    // export ra global
    global.getCart = getCart;
    global.saveCart = saveCart;
    global.addToCart = addToCart;
    global.buyNow = buyNow;

})(window);
