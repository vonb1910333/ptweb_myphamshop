<template >

    <div class="frameQLDonHang container-fluid">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
            </div>
            <div class="col-md-10">
                <QLHeader :maNV="localNhanVien.NV_Ma" />
                <div class="row bottomHeader">
                    <div class="col-md-12">
                        <p class="lableName" v-if="!isOpenCTDH && !isOpenHoaDon">DANH SÁCH ĐƠN HÀNG</p>
                        <p class="lableName" v-if="isOpenCTDH && !isOpenHoaDon">CHI TIẾT ĐƠN HÀNG</p>
                        <p class="lableName" v-if="!isOpenCTDH && isOpenHoaDon">CHI TIẾT HÓA ĐƠN</p>
                    </div>
                </div>
                <!-- Thanh tiem kiem -->
                <div class="row timkiem">
                    <div class="col-md-9 col-sm-8 input-group" v-if="(!isOpenHoaDon && !isOpenCTDH)">
                        <div class="row" style="margin-left:1px">
                            <input type="text" class="form-control col-md-10 inputSearch" placeholder="Tìm theo mã"
                                v-model="nameToSearch" @keyup.enter="searchName" @click="goToQLDonHang" />
                            <button class="btn btn-sm btn-outline-secondary btnTimKiem" type="button"
                                style="border:none" @click="searchName">
                                <span class="fa fa-search" style="font-size:18px"></span>
                            </button>
                        </div>
                    </div>
                    <div v-if="(!isOpenCTDH && isOpenHoaDon) || (!isOpenHoaDon && isOpenCTDH)"
                        class="col-md-7 col-sm-6 input-group">
                        <div class="row" style="margin-left:1px">
                            <input type="text" class="form-control col-md-10 inputSearch" placeholder="Tìm theo tên"
                                v-model="nameToSearch" @keyup.enter="searchName"
                                @click="isOpenCTDH = false, isOpenList = false, isOpenHoaDon = false" />
                            <button class="btn btn-sm btn-outline-secondary btnTimKiem" type="button"
                                style="border:none" @click="searchName">
                                <span class="fa fa-search" style="font-size:18px"></span>
                            </button>
                        </div>
                    </div>
                    <!-- Danh sach don hang theo trang thai -->
                    <div class="col-md-3 col-sm-4" style="text-align: center;">
                        <div class="btnTrangThai" style="float:right" @click="goToQLDonHang">
                            <p style="display: inline-block; padding-top: 4px;"> Trạng thái &nbsp;</p>
                            <div class="pagination nav-item dropdown " style="width:175px;"
                                @click="isOpenCTDH = false, isOpenList = false, isOpenHoaDon = false">
                                <a class="nav-link" href="#" style=" width: max-content; padding-top: 4px;width:180px"
                                    id="navbardrop">
                                    {{ curentStatus }} <span class="fas fa-angle-down"></span>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#"
                                            @click="findDHByStatus(`Tất cả`), setCurentStatus(`Tất cả`)">Tất cả</a>
                                        <a class="dropdown-item" href="#" v-for="(trangthai, i) in trangthai " :key="i"
                                            @click="findDHByStatus(trangthai), setCurentStatus(trangthai)">{{ trangthai
                                            }}
                                        </a>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div v-if="isOpenCTDH || isOpenHoaDon" class="col-md-2">
                        <button v-if="isOpenCTDH" class=" btn btnOpenCTDH"
                            @click="isOpenCTDH = !isOpenCTDH, isOpenList = !isOpenList, isOpenChoosePage = !isOpenChoosePage">
                            <span class="fa fa-list-ol"></span>
                            Xem danh sach
                        </button>
                        <button v-if="isOpenHoaDon" class="btn btnOpenHoaDon"
                            @click="isOpenHoaDon = !isOpenHoaDon, isOpenList = !isOpenList, isOpenChoosePage = !isOpenChoosePage">
                            <span class="fa fa-list-ol"></span>
                            Xem danh sach
                        </button>
                    </div>
                </div>
                <div class="row dsDonHang">
                    <table id="bangTTCTDH" v-if="!isOpenList">
                        <thead>
                            <tr style="width:100%">
                                <th>STT</th>
                                <th>Mã đơn</th>
                                <th>Ngày đặt</th>
                                <th>Khách hàng</th>
                                <th>Tổng cộng</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i ) in get_rows()" :key="i" @click="setActiveDonHang(row)">
                                <td v-if="currentPage > 1">{{ i + ((currentPage - 1) * 11) }}</td>
                                <td v-else>{{ i }}</td>
                                <td>{{ row.id }}</td>
                                <td>{{ row.DH_Ngay }}</td>
                                <td>{{ row.KH_Ma }}</td>
                                <td> {{formatMoney( row.DH_TongTien) }}</td>
                                <td >
                                    <button v-if="row.DH_TrangThai === `Mới`"
                                        @click="isOpenTrangThai = !isOpenTrangThai" class="btnTrangThaiDH"
                                        style="background-color:#00FFFF">{{ row.DH_TrangThai }}
                                    </button>

                                    <button v-if="row.DH_TrangThai === `Đã xác nhận`"
                                        @click="isOpenTrangThai = !isOpenTrangThai" class="btnTrangThaiDH"
                                        style="background-color:#DCD409">{{ row.DH_TrangThai }}
                                    </button>

                                    <button v-if="row.DH_TrangThai === `Đã vận chuyển`"
                                        @click="isOpenTrangThai = !isOpenTrangThai" class="btnTrangThaiDH"
                                        style="background-color:#FF9999">{{ row.DH_TrangThai }}
                                    </button>

                                    <button v-if="row.DH_TrangThai === `Đã nhận hàng`"
                                        @click="isOpenTrangThai = !isOpenTrangThai" class="btnTrangThaiDH"
                                        style="background-color:#00BA13">{{ row.DH_TrangThai }}
                                    </button>

                                    <button v-if="row.DH_TrangThai === `Đã hủy`"
                                        @click="isOpenTrangThai = !isOpenTrangThai" class="btnTrangThaiDH"
                                        style="background-color:#D30000">{{ row.DH_TrangThai }}
                                    </button>

                                </td>
                                <td class="tdChucNang nav-item dropdown" style="width:min-content;">
                                    <a class="nav-link  fas fa-ellipsis-v" data-toggle="dropdown" style="color:#515151"
                                        @click="setActiveDonHang(row)">
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item icon" href="#"
                                            @click="isOpenCTDH = !isOpenCTDH, isOpenList = !isOpenList, isOpenChoosePage = !isOpenChoosePage">
                                            <span class="fas fa-eye"></span> Xem chi tiết
                                        </a>
                                        <a v-if="dalapHD" class="dropdown-item icon" href="#"
                                            @click="isOpenHoaDon = !isOpenHoaDon, isOpenList = !isOpenList, isOpenChoosePage = !isOpenChoosePage">
                                            <span class="fas fa-file-invoice" style="font-size:18px; margin-left: 2px;">
                                            </span> Xem hóa đơn
                                        </a>
                                        <a v-else class="dropdown-item icon" href="#" @click="gotoLapHD">
                                            <span class="fas fa-file-invoice" style="font-size:18px; margin-left: 2px;">
                                            </span> Lập hóa đơn
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <HoaDonChiTiet v-if="isOpenHoaDon" :khachhang="khachhang" :chitietdonhang="chitietdonhang"
                        :nhanvien="nhanvienXNDH" :hoadon="hoadon" :donhang="activeDonHang" />

                    <QLDonHangCTDH v-if="isOpenCTDH" :chitietdonhang="chitietdonhang" :activeDonHang="activeDonHang"
                        :khachhang="khachhang" :nhanvien="nhanvienXNDH" />
                </div>
                <!-- danh sach so trang hien thi -->
                <div class="row" style="width: 100%;" v-if="!isOpenChoosePage && donhang.length > 11">
                    <div class="btnChonTrang">
                        <p style="display: inline-block; padding-top: 4px;text-align: right;">Trang &nbsp;</p>
                        <div class="numberPage">
                            <div class="dropup">
                                <button class="dropbtn">{{ currentPage }}
                                    <span class="fas fa-chevron-up"></span></button>
                                <div class="dropup-content">
                                    <a class="dropdown-item" v-for="(i, j) in num_pages() " :key="j"
                                        v-bind:class="[i == currentPage ? 'active' : '']" v-on:click="change_page(i)"
                                        aria-controls="my-table"> {{ i }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- -------------------------------------Bang cap nhat trang thai don hang------------------ -->
        <div class="dialogTrangThai" style="width: 30%;" v-if="isOpenTrangThai">
            <p style=" text-align:center; margin-top: 50px; font-size: 20px;">
                <span class="far fa-edit"></span> Cập nhật trạng thái đơn hàng
            </p>
            <div class="trangthai" v-for="(trangthai, i) in trangthai" :key="i">
                <input type="radio" id="{{trangthai}}" name="trangthai_nd" value="{{trangthai}}"
                    @click="setTrangThaiDH(trangthai)" v-if="trangthai === activeDonHang.DH_TrangThai" checked />
                <input type="radio" id="{{trangthai}}" name="trangthai_nd" value="{{trangthai}}"
                    @click="setTrangThaiDH(trangthai)" v-else />
                <label for="{{trangthai}}">&nbsp; {{ trangthai }}</label><br>
            </div>
            <button class="btn btnCapNhat" @click="isOpenXacNhan = !isOpenXacNhan, isOpenTrangThai = !isOpenTrangThai">Cập nhật</button>
            <button class="btn btnHuy" @click="isOpenTrangThai = !isOpenTrangThai" style="margin-left:20px">Hủy</button>
        </div>
        <div class="dialogXacNhan" v-if="isOpenXacNhan">
            <p style="color:#515151; text-align:center; margin-top: 50px; font-size: 20px;">
                Bạn chắc chắn muốn cập nhật trạng thái đơn hàng
                #{{ activeDonHang.id }}
            </p>
            <button class="btnYes btn btn-sm btn-outline-secondary"
                @click="updateDonHang(), isOpenXacNhan = !isOpenXacNhan"
                style="margin-left:10px">Cập nhật</button>
            <button class="btnNo btn btn-sm btn-outline-secondary" @click="isOpenXacNhan = !isOpenXacNhan">Hủy</button>
        </div>
    </div>

    <!-- </div> -->
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DonHangService from '../../../services/donhang.service';
import KhachHangService from '../../../services/khachhang.service';
import CTDHService from '../../../services/chitietdonhang.service';
import QLDonHangCTDH from '../../../components/QuanLy/QLDonHangCTDH.vue';
import NhanVienService from '../../../services/nhanvien.service';
import HoaDonService from '../../../services/hoadon.service';
import HoaDonChiTiet from '../../../components/QuanLy/HoaDonChiTiet.vue'
import moment from'moment';

export default {
    name: `QLDonHang`,
    components: { DanhSachChucNang, QLHeader, QLDonHangCTDH, HoaDonChiTiet },
    data() {

        return {
            donhang: [],
            khachhang: {},
            activeDonHang: {},
            chitietdonhang: [],
            sanpham: [],
            nhanvienXNDH: {},
            nameToSearch: "",
            resultSearch: null,
            isOpenCTDH: false,
            isOpenTrangThai: false,
            isOpenHoaDon: false,
            newTrangThai: "",
            isOpenXacNhan: false,
            currentPage: 1, //so trang dang xem hien tai
            elementsPerPage: 9, // so don hang duoc hien thi tren 1 trang
            ascending: false,
            curentStatus: "Tất cả",
            trangthai: [
                "Mới", "Đã xác nhận", "Đã vận chuyển", "Đã nhận hàng", "Đã hủy",
            ],
            hoadon: {},
            dalapHD: false,
            localNhanVien: {},
            isOpenList: false,
            isOpenChoosePage: false,
        }

    },

    created() {
        this.localNhanVien.NV_Ma = this.$route.params.id;
    },

    computed: {
        "columns": function columns() {
            if (this.donhang.length == 0) {
                return [];
            }
            return Object.keys(this.donhang[0])
        }
    },

    methods: {
        //Tim nhan vien dang nhap
        async findLocalNhanVien() {
            const [error, response] = await this.handle(
                NhanVienService.getByID(this.localNhanVien.NV_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.localNhanVien = response.data;
            }
        },

        //Lay danh sach don hang
        async retrieveDonHang() {
            const [error, response] = await this.handle(
                DonHangService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.donhang = response.data;
                console.log(response.data);
                this.donhang.forEach(element => {
                    element.DH_Ngay = moment(String(element.DH_NgayDat)).format("MM/DD/YYYY");
                });
            }
        },

        //Tinh so hang 
        get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.donhang.slice(start, end);
        },

        //Tinh so trang hien thi don hang
        num_pages() {
            return Math.ceil(this.donhang.length / this.elementsPerPage);

        },

        // Thay doi trang 
        async change_page(page) {
            this.currentPage = page;
        },

        //Tim kiem khach hang cua don hang
        async findKH() {
            const [error, response] = await this.handle(
                KhachHangService.getByID(this.activeDonHang.KH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.khachhang = response.data;
                console.log(response.data);
            }
        },

        //setactive don hang duoc chon
        async setActiveDonHang(DHActive) {
            this.activeDonHang = DHActive;
            this.findKH(this.activeDonHang.KH_Ma);
            this.retrieveChiTietDonHang(this.activeDonHang.id);
            this.findNVByMaNV(this.activeDonHang.NV_Ma);
            this.findHoaDon();
        },

        // Lay danh sach chi tiet don hang của don hang
        async retrieveChiTietDonHang() {
            const [error, response] = await this.handle(
                CTDHService.findByMaDH(this.activeDonHang.id)
            );
            if (error) {
                console.log(error);
            } else {
                this.chitietdonhang = response.data;
                console.log(response.data);
            }
        },

        //setclose CTDH
        async CloseCDTH() {
            this.isOpenCTDH = false;
        },
        //set trang thai don hang
        async setTrangThaiDH(data) {
            console.log("Trang thai" + data);
            this.newTrangThai = data;
        },

        // cap nhat don hang
        async updateDonHang() {
            console.log(this.activeDonHang.DH_Ma)
            this.activeDonHang.DH_TrangThai = this.newTrangThai;
            this.activeDonHang.NV_Ma = this.localNhanVien.NV_Ma
            const [error, response] = await this.handle(
                DonHangService.update(this.activeDonHang.id, this.activeDonHang)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data + "Cap nhat thanh cong");
                this.retrieveDonHang();
            }
        },

        //Tim kiem don hang theo trang thai
        async findDHByStatus(status) {
            if (status == "Tất cả") {
                this.retrieveDonHang();
            }
            else {
                const [error, response] = await this.handle(
                    DonHangService.findByStatus(status)
                );
                if (error) {
                    console.log(error);
                } else {
                    this.donhang = response.data;
                    this.donhang.forEach(element => {
                    element.DH_Ngay = moment(String(element.DH_NgayDat)).format("MM/DD/YYYY");
                });
                }
            }

        },

        //Set trang thai don hang can tiem kiem
        async setCurentStatus(status) {
            this.curentStatus = status;
        },

        // Tim nhan vien lap don hang
        async findNVByMaNV(MaNV) {
            const [error, response] = await this.handle(
                NhanVienService.getByID(MaNV)
            );
            if (error) {
                console.log(error);
            } else {
                this.nhanvienXNDH = response.data;
            }
        },

        //Tim kiem thong qua thanh tim kiem
        async searchName() {
            const [error, response] = await this.handle(
                DonHangService.getByID(this.nameToSearch)
            );
            if (error) {
                console.log(error);
            } else {
                this.donhang = [];
                this.donhang[0] = response.data;

                this.setActiveDonHang = "";
                this.donhang.forEach(element => {
                    element.DH_Ngay = moment(String(element.DH_NgayDat)).format("MM/DD/YYYY");
                });
                console.log(response.data);
            }
        },



        async findHoaDon() {
            console.log(this.activeDonHang.DH_Ma + " finddonhang")
            const [error, response] = await this.handle(
                HoaDonService.getByIDMaDH(this.activeDonHang.id)
            );
            if (error) {
                console.log(error);
            } else {
                if (response.data == "Chua ton tai") {
                    console.log(response.data);
                    this.dalapHD = false;
                }
                else {
                    this.hoadon = response.data;
                    this.dalapHD = true,
                        console.log(response.data);
                }

            }
        },

        formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },

        // Di chuyen den trang lap hoa don
        async gotoLapHD() {
            this.$router.push({ name: 'QLDonHangLapHD', params: { id: this.activeDonHang.id, user: this.localNhanVien.NV_Ma } });
        },

        async goToQLDonHang() {
            this.$router.push({ name: 'QLDonHang', params: { id: this.localNhanVien.NV_Ma } })
        }

    },

    mounted() {
        this.retrieveDonHang();
    }
};
</script>

<style>
@import "../../../assets/QLDonHangStyle.css";
.frameQLDonHang .icon{
    font-size: 18px;
}

.frameQLDonHang .dialogXacNhan{
    left: 8%;
}
</style>