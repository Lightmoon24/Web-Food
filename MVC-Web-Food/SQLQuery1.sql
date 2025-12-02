CREATE TABLE Users (
    -- ID duy nhất cho mỗi người dùng (khóa chính)
    USER_ID INT PRIMARY KEY IDENTITY(1,1),

    -- Họ và tên (Họ tên đầy đủ)
    full_name VARCHAR(100) NOT NULL,

    -- Tên đăng nhập (Tên người dùng - phải là duy nhất)
    username VARCHAR(50) NOT NULL UNIQUE,

    -- Email (Địa chỉ email - phải là duy nhất)
    email VARCHAR(100) NOT NULL UNIQUE,

    -- Mật khẩu (Lưu trữ mật khẩu đã được mã hóa/băm)
    password_hash VARCHAR(255) NOT NULL,

    -- Ngày và giờ tài khoản được tạo (ĐÃ SỬA LỖI TIMESTAMP)
    created_at DATETIME2 DEFAULT GETDATE() 
);

-- Bạn có thể thêm trường updated_at nếu cần
-- updated_at DATETIME2 DEFAULT GETDATE()