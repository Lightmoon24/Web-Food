<script>
        // Lấy các phần tử
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');
    const quantityInput = document.getElementById('quantityInput');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    const cartCount = document.getElementById('cartCount');
    const toast = document.getElementById('toast');

    // Thông tin sản phẩm
    const product = {
        id: 1,
    name: 'Râu mực nhập khẩu 300g + Hành tây 300g',
    price: 53000,
    image: 'https://i.pinimg.com/736x/59/8d/64/598d64ac41b646b19f407f3f816a8eb3.jpg'
        };

    // Khởi tạo giỏ hàng từ localStorage hoặc mảng rỗng
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

        // Tăng số lượng
        increaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
    if (currentValue < 99) {
        quantityInput.value = currentValue + 1;
            }
        });

        // Giảm số lượng
        decreaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
            }
        });

        // Thêm vào giỏ hàng
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);

            // Kiểm tra xem sản phẩm đã có trong giỏ chưa
            const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // Nếu có rồi thì tăng số lượng
        existingProduct.quantity += quantity;
            } else {
        // Nếu chưa có thì thêm mới
        cart.push({
            ...product,
            quantity: quantity
        });
            }

    // Lưu vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Cập nhật số lượng giỏ hàng
    updateCartCount();

    // Hiển thị thông báo
    showToast();

    // Reset số lượng về 1
    quantityInput.value = 1;
        });

        // Mua ngay (thêm vào giỏ và chuyển đến trang giỏ hàng)
        buyNowBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            
            const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += quantity;
            } else {
        cart.push({
            ...product,
            quantity: quantity
        });
            }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Chuyển đến trang giỏ hàng (bạn có thể thay đổi URL)
    alert('Đang chuyển đến trang giỏ hàng...');
            // window.location.href = '/gio-hang'; // Uncomment để chuyển trang thật
        });

    // Cập nhật số lượng giỏ hàng
    function updateCartCount() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Ẩn badge nếu giỏ hàng trống
    if (totalItems === 0) {
        cartCount.style.display = 'none';
            } else {
        cartCount.style.display = 'flex';
            }
        }

    // Hiển thị thông báo toast
    function showToast() {
        toast.classList.add('show');
            
            setTimeout(() => {
        toast.classList.remove('show');
            }, 3000);
        }

        // Xem giỏ hàng (log ra console để kiểm tra)
        document.getElementById('cartLink').addEventListener('click', (e) => {
        e.preventDefault();
    console.log('Giỏ hàng hiện tại:', cart);
    alert(`Bạn có ${cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm trong giỏ hàng`);
            // window.location.href = '/gio-hang'; // Uncomment để chuyển trang thật
        });
</script>