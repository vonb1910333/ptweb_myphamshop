<template>
    <!---------------------------- Header--------------------------- -->
    <div class="">
        <div class="container-fuild header">
        <header class="align-items-center">
            <div class="row  justify-content-between align-items-center">
                <div class="col-md-1 logo-image pl-0 pr-0">
                    <img class="img-fluid" src="../../images/Logo.png" @click="gotoHomePage()">
                </div>
                <div class="col-sm-11">
                    <div class="row search">
                        <div class="col-sm-9 pt-2 pb-1 pl-1">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Tìm kiếm" v-model="nameToSearch"
                                    @keyup.enter="searchName" @click="gotoHomePage()" style="font-size: 18px;" />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" @click="searchName"
                                        style="border: none; font-size: 18px;">
                                        <span class="fa fa-search" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 align-items-center pt-0 pl-0 pr-0">
                            <div v-if="currentUser" class="justify-content-end align-items-center headerKhachHang">
                                <p class="tenTaiKhoan">
                                    {{ currentUser.KH_Ten }}
                                </p>
                                <div class="nav-item dropdown justify-content-center" style="display:inline; ">
                                    <button class="btn btnTaiKhoan btn-default"><span
                                            class="fas fa-user-circle iconTaiKhoan"></span>
                                        <a class="nav-link " href="#" id="navbardrop">
                                            <div class="dropdown-menu right">
                                                <a class="dropdown-item" href="#" @click="logout()">Đăng
                                                    xuất</a>
                                                <a class="dropdown-item" href="#">Đổi mật
                                                    khẩu</a>
                                            </div>
                                        </a>
                                    </button>
                                </div>
                                <router-link :to="{ name: 'GioHang' }" class="btn btnGioHang">
                                    <span class="fas fa-shopping-cart iconGioHang">
                                    </span>
                                    <button class="soluongsanpham">{{ giohang.GH_TongSoLuong }}</button>
                                </router-link>
                            </div>
                            <div v-if="!currentUser" class="align-items-center headerKhachHang">
                                <div style="display:inline; width: 50px; height: 100px; margin-left: 30%;">
                                    <button class="btn btn-secondary pl-1 pr-1 btnDangKy" @click="goToDangKy()">Đăng
                                        ký</button>
                                </div>
                                <div class="nav-item dropdown justify-content-center"
                                    style="display:inline; margin-top: 1px; ">
                                    <button class="btn btnTaiKhoan btn-default"
                                        style="display:inline; margin-top: 1px;"><span
                                            class="fas fa-user-circle iconTaiKhoan"></span>
                                        <a class="nav-link " href="#" id="navbardrop">
                                            <div class="dropdown-menu right">
                                                <a class="dropdown-item" href="#" @click="goToQLDangNhap()">Đăng
                                                    nhập</a>
                                                <a class="dropdown-item" href="#" @click="goToDangKy()">Đăng ký</a>
                                            </div>
                                        </a>
                                    </button>
                                </div>

                                <router-link :to="{ name: 'KHDangNhap' }" class="btn btnGioHang">
                                    <span class="fas fa-shopping-cart iconGioHang">
                                    </span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="row pt-1">
                        <div class="col-12"><img src="../../images/Cosmetic.png" class="img-fluid"></div>
                    </div>
                </div>
            </div>

        </header>
    </div>
    <div class="jumbotron text-dark rounded bg-light">
        <div>
            <h3 style="text-align:center; margin-top: -2%; margin-bottom: 2%;">THÔNG TIN SẢN PHẨM</h3>
        </div>
        <div class="row">
            <div class="col-3 border-bottom p-1 pe-2">
                <div>
                    <img :src="sanpham.SP_HinhAnh" class="img-fluid" alt="">
                </div>
            </div>
            <div class="col-9 border-bottom p-1">
                <h2 class="font-weight-bold"> {{ sanpham.SP_TenSanPham }}</h2>
                <h5 class="pb-1"> Thương Hiệu: {{ sanphamthem.TH_Ten }}</h5>
                <h5 class="pb-1"> Xuất xứ: {{ sanphamthem.TH_XuatXu }}</h5>

                <h5 class="pb-1">Chi tiết về sản phẩm: </h5>
                <p class="text-justify thontinsp">{{ sanphamthem.SP_ThongTin }}</p>
                <h2 class="font-weight-bold" id="name"> {{ formatMoney(sanpham.SP_GiaBanRa) }}đ</h2>
                <div class="border-bottom p-1 pb-2">
                    <span style="color: #789c73">
                        <i style="color: pink" class="fas fa-star"></i>
                        <i style="color: pink" class="fas fa-star"></i>
                        <i style="color: pink" class="fas fa-star"></i>
                        <i style="color: pink" class="fas fa-star"></i>
                        <i style="color: pink" class="fas fa-star"></i>
                    </span>
                </div>
                <div class="col-md-6 p-4 offset-md-3">
                    <div class="input-group mb-3">
                        <button v-if="SoLuong > 1" class="btn btngiam" @click="giamSL()"><span
                                class="fas fa-minus"></span></button>
                        <button v-if="SoLuong == 1" class="btn btngiam"><span class="fas fa-minus"></span></button>
                        <p class="text soluong">{{ SoLuong }}</p>
                        <button class="btn btntang" @click="tangSL()"><span class="fas fa-plus"></span></button>

                        <button class="btn btn-outline-secondary btnThemvaoGioHang" @click="checkCTGH()"
                            type="button">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    
</template>
  
<script>
//   import SanPham from "./SanPham.vue";
import SanPhamService from "../../services/sanpham.service";
import CTGHService from "../../services/chitietgiohang.service";
import ThuongHieuService from '../../services/thuonghieu.service';
import GioHangService from "../../services/giohang.service";

import { mapGetters, mapMutations } from "vuex";
export default {
    name: "SanPhamCT",
    props: ["sanpham"],

    data() {
        return {
            sanphamthem: {},
            chitietgiohang: [],
            chitietgiohangthem: {},
            SoLuong: 1,
            giohang: {},
        };
    },
    created() {
        this.sanphamthem.SP_Ma = this.$route.params.id;
        this.retrieveSanPham();
    },
    computed: {
        ...mapGetters({
            currentUser: "loggedInKhachHang",
        }),
    },
    methods: {
        ...mapMutations([
            "initCustomerState"
        ]),
        async logout() {
            this.$store.commit("logout");
            this.$router.push("/");
        },

        async goToDangKy() {
            this.$router.push("/DangKy");
        },

        async goToQLDangNhap() {
            this.$router.push("/DangNhap");
        },
        async gotoHomePage() {
               this.$router.push({ name: 'HomePage' });
          },
        //    Dinh dang hien thi tien 
        formatMoney(data) {
            let val = (data / 1).toFixed(0).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

        async retrieveSanPham() {
            const [error, response] = await this.handle(
                SanPhamService.getByID(this.sanphamthem.SP_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.sanphamthem = response.data;
                this.findThuongHieu()
                console.log(response.data);
            }
        },

        async findThuongHieu() {
            const [error, response] = await this.handle(
                ThuongHieuService.get(this.sanphamthem.TH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.sanphamthem.TH_Ten = response.data.TH_Ten;
                this.sanphamthem.TH_XuatXu = response.data.TH_XuatXu;
            }
        },

        async checkCTGH() {
            const [error, response] = await this.handle(
                CTGHService.findByMaGH(this.currentUser.GH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                let check = 0;
                this.chitietgiohang = response.data;
                this.chitietgiohang.forEach(element => {
                    if (element.SP_Ma == this.sanphamthem.SP_Ma) {
                        check = 1;
                    }
                });
                if (check == 0) {
                    this.themCTGH();
                }
            }
        },

        async tangSL() {
            console.log(this.sanphamthem.SP_SoLuong)
            if (this.sanphamthem.SP_SoLuong > 0) {
                this.SoLuong += 1;
            }


        },

        async giamSL() {
            this.SoLuong -= 1;
        },

        async retrieveCTGH() {
            const [error, response] = await this.handle(
                CTGHService.findByMaGH(this.currentUser.GH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.chitietgiohang = response.data;
                console.log(this.chitietgiohang)
            }
        },
        async themCTGH() {
            this.chitietgiohangthem.GH_Ma = this.currentUser.GH_Ma;
            this.chitietgiohangthem.SP_Ma = this.sanphamthem.SP_Ma;
            this.chitietgiohangthem.CTGH_SoLuong = this.SoLuong;
            const [error, response] = await this.handle(
                CTGHService.create(this.chitietgiohangthem)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.retrieveCTGH()
                this.updateGioHang();
            }
        },

        async retrieveGioHang() {
            const [error, response] = await this.handle(
                GioHangService.getByID(this.currentUser.GH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.giohang = response.data;
            }
        },

        async updateGioHang() {
            this.giohang.GH_TongSoLuong = this.giohang.GH_TongSoLuong + this.SoLuong;
            const [error, response] = await this.handle(
                GioHangService.update(this.currentUser.GH_Ma, this.giohang)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data)
            }
        }

    },
    mounted() {
        this.initCustomerState();
        this.retrieveSanPham();
        this.retrieveGioHang();
    },
};
</script>
   
  
<style>

</style>