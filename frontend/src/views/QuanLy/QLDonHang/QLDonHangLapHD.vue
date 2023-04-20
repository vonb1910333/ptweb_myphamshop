<template>
    <div class="container-fluid frameLapHoaDon">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
            </div>
            <div class="col-md-10">
                <QLHeader :maNV="localNhanVien.NV_Ma" />
                <div class="row bottomHeader">
                    <div class="col-md-12">
                        <p class="lableName">LẬP HÓA ĐƠN</p>
                        <p></p>
                    </div>
                </div>

                <div class="row container-fluid hoadon" v-if="!isOpenLapHD">
                    <div class="col-md-12">
                        <div>
                            <h4 style="text-align:center; margin-top: 30px; margin-bottom: 30px;"> HÓA ĐƠN </h4>
                        </div>
                        <div class="row">
                            <table class="bangTT">
                                <tr>
                                    <!-- <td>Số HD:  tt</td> -->
                                    <td>Khách hàng: {{ khachhang.KH_Ten }}</td>
                                    <td>Nhân viên: {{ nhanvien.NV_Ho + nhanvien.NV_Ten }} </td>
                                </tr>
                                <tr>
                                    <!-- <td>Ngày lập: </td> -->
                                    <td>Mã DH: {{ MaDH }}</td>
                                    <td>SDT: {{ khachhang.KH_SDT }} </td>
                                </tr>
                                <tr>
                                    <td>Địa chỉ giao hàng: {{ donhang.DH_DiaChiGiaoHang }}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="row">
                            <table class="bangCTDH table-bordered">
                                <thead>
                                    <tr style="width:100%">
                                        <th>STT</th>
                                        <th style="text-align:left">Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, i) in chitietdonhang" :key="i" style="width:100%">
                                        <td>{{ i + 1 }}</td>
                                        <td style="text-align:left">{{ row.SP_Ten }} </td>
                                        <td>{{ formatMoney(row.CTDH_Gia) }}</td>  
                                        <td>{{ row.CTDH_SoLuong }}</td>
                                        <td>{{ formatMoney(row.CTDH_SoLuong * row.CTDH_Gia) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="col-md-12" style="text-align: right; margin-bottom: 15px;">
                                <h6 class="thanhtien">Thành tiền:
                                    {{ formatMoney(donhang.DH_TongTien) }}
                                </h6>
                            </div>
                        </div>
                    </div>

                </div>
                <HoaDonChiTiet v-if="isOpenLapHD" :khachhang="khachhang" :chitietdonhang="chitietdonhang"
                    :nhanvien="nhanvien" :hoadon="hoadon" :donhang="donhang" />  
                              <div class="row">
                <div class="col-md-8"></div>
                <div class="col-md-4">
                    <button class="btnTroVe" @click="goToQLDonHang">
                        Trở về
                    </button>
                    <button class="btnLapHoaDon" @click="isOpenXacNhan = !isOpenXacNhan" v-if="!isOpenLapHD">
                        Lập Hóa Đơn
                    </button>
                </div>
            </div>
            </div>
        </div>   
        
        <div class="dialogXacNhan" v-if="isOpenXacNhan">
        <p style="color:#515151; text-align:center; margin: 50px 20px 20px 20px; font-size: 20px;">
            Bạn chắc chắn muốn lập hóa đơn cho đơn hàng
            #{{ donhang.id }}
        </p>
        <button class="btnYes btn btn-sm btn-outline-secondary"
            @click="findHoaDon(), isOpenXacNhan = !isOpenXacNhan, isOpenLapHD = !isOpenLapHD">Lập hóa đơn</button>
        <button class="btnNo btn btn-sm btn-outline-secondary" @click="isOpenXacNhan = !isOpenXacNhan">Hủy</button>
    </div>
    </div>

</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DonHangService from '../../../services/donhang.service';
import KhachHangService from '../../../services/khachhang.service';
import CTDHService from '../../../services/chitietdonhang.service';
import NhanVienService from '../../../services/nhanvien.service';
import SanPhamService from '../../../services/sanpham.service';
import HoaDonService from '../../../services/hoadon.service';
import HoaDonChiTiet from '../../../components/QuanLy/HoaDonChiTiet.vue';

export default {
    name: `QLDonHang`,
    components: { DanhSachChucNang, QLHeader, HoaDonChiTiet },

    props: ["DH_Ma"],
    computed: {
        getMaDH() {
            return this.$route.params.MaHD;
        }
    },
    data() {

        return {
            donhang: {},
            khachhang: {},
            chitietdonhang: [],
            nhanvien: {},
            MaDH: "",
            isOpenXacNhan: false,
            isOpenLapHD: false,
            hoadon: {},
            message: "",
            localNhanVien: {},
        }
    },

    created() {
        this.MaDH = this.$route.params.id;
        this.localNhanVien.NV_Ma = this.$route.params.user;
    },

    methods: {

        //Lay thong tin don hang
        async retrieveDonHang() {
            const [error, response] = await this.handle(
                DonHangService.getByID(this.MaDH)
            );
            if (error) {
                console.log(error);
            } else {
                this.donhang = response.data;
                this.findKH(this.donhang.KH_Ma);
                this.findNVByMaNV(this.donhang.NV_Ma)
                console.log(response.data);
            }

        },

        //Tim kiem khach hang cua don hang
        async findKH(MaKH) {
            console.log("Khach hang" + MaKH)
            const [error, response] = await this.handle(
                KhachHangService.getByID(MaKH)
            );
            if (error) {
                console.log(error);
            } else {
                this.khachhang = response.data;
                console.log(response.data + "Khach hang" + this.khachhang.KH_DiaChi);
            }
        },

        // Lay danh sach chi tiet don hang của don hang
        async retrieveChiTietDonHang() {
            const [error, response] = await this.handle(
                CTDHService.findByMaDH(this.MaDH)
            );
            if (error) {
                console.log(error);
            } else {
                this.chitietdonhang = response.data;
                console.log(response.data);
                for (const i in this.chitietdonhang) {
                    console.log("Ma " + this.chitietdonhang[i].SP_Ma);
                    this.findSanPham(this.chitietdonhang[i].SP_Ma, i);
                }

            }
        },

        // Tim nhan vien lap don hang
        async findNVByMaNV(MaNV) {
            const [error, response] = await this.handle(
                NhanVienService.getByID(MaNV)
            );
            if (error) {
                console.log(error);
            } else {
                this.nhanvien = response.data;
            }
        },

        async findSanPham(maSP, i) {
            const [error, response] = await this.handle(
                SanPhamService.getByID(maSP)
            );
            if (error) {
                console.log(error);
            } else {
                this.chitietdonhang[i].SP_Ten = response.data.SP_TenSanPham;
            }
        },
        // Kiem tra don hang da duoc lap hoa don chua
        async findHoaDon() {
            const [error, response] = await this.handle(
                HoaDonService.getByIDMaDH(this.donhang.DH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                if (response.data == "Chua ton tai") {
                    this.createHoaDon();
                    console.log(response.data);
                }
                else {
                    console.log("da ton tai");
                    console.log(response.data);
                }

            }
        },

        //Lap hoa don
        async createHoaDon() {
            this.hoadon.DH_Ma = this.donhang.id;
            this.hoadon.HD_NgayLap = new Date().toLocaleDateString();
            this.hoadon.HD_ThoiGianLap = new Date().toLocaleTimeString();
            this.hoadon.HD_TongTien = this.donhang.DH_TongTien;

            const [error, response] = await this.handle(
                HoaDonService.create(this.hoadon)
            );
            if (error) {
                console.log(error);
            } else {
                this.hoadon = response.data;
                this.donhang.HD_SoHD = this.hoadon.id;
                console.log(response.data);
                const [errors, responses] = await this.handle(
                 DonHangService.update(this.donhang.id, this.donhang)
                );
                if(errors){
                    console.log(errors)
                }
                else{
                    console.log(responses)
                }
               
            }
        },

        formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },
        async goToQLDonHang() {
            console.log(this.localNhanVien.NV_Ma)
            this.$router.push({ name: 'QLDonHang', params: { id: this.localNhanVien.NV_Ma } })
        }
    },

    mounted() {
        this.retrieveDonHang();
        this.retrieveChiTietDonHang();
    }
};
</script>

<style>
@import "../../../assets/QLDonHangStyle.css";

.hoadon .bangTT {
    background-color: #FFFFFF;
}

.hoadon .bangCTHD {
    border-radius: 15px;
    border-bottom: 1px solid #BABABA;
}

.hoadon .thanhtien{
    font-size: 18px;
    font-family: Inter;
    margin-top: 10px;
    color: black;
}

.hoadon .bangCTDH td,
.hoadon .bangCTDH th{
    text-align: center;
    font-family: Inter;
    font-size: 16px;
}
.frameLapHoaDon .hoadon{
    border-radius: 15px;
    border: 0.1px solid #515151;
}
</style>