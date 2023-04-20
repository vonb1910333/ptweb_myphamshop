const mongoose = require("mongoose");
const createSanPhamModel = require("./sanpham.model");
const createThuongHieuModel = require("./thuonghieu.model");
const createDanhMucModel = require("./danhmuc.model");
const createDonHangModel = require("./donhang.model");
const createKhachHangModel = require("./khachhang.model");
const createChiTietdonHangModel = require("./chitietdonhang.model");
const createNhanVienModel = require("./nhanvien.model");
const createHoaDonModel = require("./hoadon.model");
const createImageModel = require("./image.model");
const createGioHangModel = require("./giohang.model");
const createChiTietGioHangModel = require("./chitietgiohang.model");

const db = {};
db.mongoose = mongoose;
db.SanPham = createSanPhamModel(mongoose);
db.ThuongHieu = createThuongHieuModel(mongoose);
db.DanhMuc = createDanhMucModel(mongoose);
db.DonHang = createDonHangModel(mongoose);
db.KhachHang = createKhachHangModel(mongoose);
db.ChiTietDonHang = createChiTietdonHangModel(mongoose);
db.NhanVien = createNhanVienModel(mongoose);
db.HoaDon = createHoaDonModel(mongoose);
db.Image = createImageModel(mongoose);
db.GioHang = createGioHangModel(mongoose);
db.ChiTietGioHang = createChiTietGioHangModel(mongoose);

module.exports = db;