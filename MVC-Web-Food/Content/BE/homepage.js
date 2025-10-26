document.querySelectorAll('.btnLeftBar').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent.trim();

        const typeMap = {
            "Khuyến Mãi 🔥": "khuyenmai",
            "Đồ Uống ☕": "douong",
            "Đồ Ăn 🍔": "doan",
            "Combo 🍔 ☕": "combo",
            "Đồ Thêm 🥢": "dothemt",
            "Đồ Ăn Vặt 🍟": "doanvat",
            "Tráng Miệng 🍉": "trangmieng"
        };

        const type = typeMap[text];
        const items = document.querySelectorAll('.MainTextDiv');
        const activeBtn = document.querySelector('.btnLeftBar.active');

        // Toggle hiển thị
        if (activeBtn === btn) {
            btn.classList.remove('active');
            items.forEach(item => (item.style.display = "block"));
            return;
        }

        // Bỏ active trước
        document.querySelectorAll('.btnLeftBar').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Lọc món
        items.forEach(item => {
            if (item.dataset.type === type)
                item.style.display = "block";
            else
                item.style.display = "none";
        });
    });
});
