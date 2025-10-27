// Tạo object product từ DOM -> gửi cho hàm addToCart/buyNow
(function () {
    const product = {
        id: 1, 
        name: document.getElementById('productTitle').textContent.trim(),
        price: parseFloat(document.getElementById('productPrice').textContent.replace(/[^\d]/g, "")) || 0,
        image: document.getElementById('productImage').src
    };

    const qtyInput = document.getElementById('qtyInput');
    const addBtn = document.getElementById('addToCartBtn');
    const buyBtn = document.getElementById('buyNowBtn');

    addBtn.addEventListener('click', function () {
        const qty = Math.max(1, parseInt(qtyInput.value) || 1);
        addToCart({ ...product, quantity: qty });
    });

    buyBtn.addEventListener('click', function () {
        const qty = Math.max(1, parseInt(qtyInput.value) || 1);
        // truyền redirectUrl từ Razor để đi đến trang GioHang
        buyNow({ ...product, quantity: qty }, '@Url.Action("GioHang","Home")');
    });
})();