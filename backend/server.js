const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const { BadRequestError } = require("./app/helpers/errors");
const setupSanPhamRoutes = require("./app/routes/sanpham.routes");
const setupDanhMucRoutes = require("./app/routes/danhmuc.routes");
const setupThuongHieuRoutes = require("./app/routes/thuonghieu.routes");
const setupDonHangRoutes = require("./app/routes/donhang.routes");
const setupKhachHangRoutes = require("./app/routes/khachhang.routes");
const setupChiTietDonHangRoutes = require("./app/routes/chitietdonhang.routes");
const setupNhanVienRoutes = require("./app/routes/nhanvien.routes");
const setupHoaDonRoutes = require("./app/routes/hoadon.routes");
const setupImageRoutes = require("./app/routes/image.router");
const setupGioHangRoutes = require("./app/routes/giohang.routes");
const setupChiTietGioHangRoutes = require("./app/routes/chitietgiohang.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to DB
 const db = require("./app/models");
db.mongoose
    .connect(config.db.url)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((error) => {
        console.log("Cannot connect to the database!", error);
        process.exit();
    });

// simple route
// app.get("/", (req, res) => {
//     // res.json({ message: "Welcome to book review application" });
// });
app.use(express.static("uploads"));
setupSanPhamRoutes(app);
setupDanhMucRoutes(app);
setupThuongHieuRoutes(app);
setupDonHangRoutes(app);
setupKhachHangRoutes(app);
setupChiTietDonHangRoutes(app);
setupNhanVienRoutes(app)
setupHoaDonRoutes(app);
setupImageRoutes(app);
setupChiTietGioHangRoutes(app);
setupGioHangRoutes(app);

// handle 404 response
app.use((req, res, next) => {
    next(new BadRequestError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

// set port, listen for requests
const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});