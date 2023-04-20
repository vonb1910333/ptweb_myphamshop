<template>
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <div class="container-fuild homepage" data-spy="scroll" data-target=".header" data-offset="60">
            <div class="container-fuild header">
                <header class="align-items-center">
                    <div class="row  justify-content-between align-items-center">
                        <div class="col-md-1 logo-image pl-0 pr-0">
                            <img class="img-fluid" src="../images/Logo.png">
                        </div>
                        <div class="col-sm-11">
                            <div class="row search">
                                <div class="col-sm-9 pt-2 pb-1 pl-1">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Tìm kiếm"
                                            v-model="nameToSearch" @keyup.enter="searchName" style="font-size: 18px;" />
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
                                            <div class="btn btnTaiKhoan btn-default"><span
                                                    class="fas fa-user-circle iconTaiKhoan"></span>
                                                <a class="nav-link " href="#" id="navbardrop">
                                                    <div class="dropdown-menu right">
                                                        <a class="dropdown-item" href="#" @click="logout()">Đăng
                                                            xuất</a>
                                                        <a class="dropdown-item" href="#">Đổi mật
                                                            khẩu</a>
                                                    </div>
                                                </a>
                                            </div>
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
    
                                        <router-link :to="{ name: 'KHDangNhap' }" class="btn btnGioHang"
                                            style=" margin-top: -5%;">
                                            <span class="fas fa-shopping-cart iconGioHang">
                                            </span>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="row pt-1">
                                <div class="col-12"><img src="../images/Cosmetic.png" class="img-fluid"></div>
                            </div>
                        </div>
                    </div>
    
                </header>
            </div>
            <!-- <Navbar :thuonghieu="thuonghieu" :danhmuc="danhmuc" /> -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <nav class="navbar navbar-expand-md navbar-light bg-white navbarrow">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"
                    aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                THƯƠNG HIỆU
                            </a>
                            <ul>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#" v-for="(item, i) in thuonghieu" :key="i" @click="timSPTheoThuongHieu(item)">{{
                                            item.TH_Ten
                                    }}</a>
                                </div>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">BÁN CHẠY</a>
                        </li>
                        <ul class="navbar-nav" v-for="(danhmucs, i) in danhmuc" :key="i">
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click="timSPTheoDanhMuc(danhmucs)">{{ danhmucs.DM_Ten }}</a>
                            </li>
                        </ul>
                        <li class="nav-item" style="text-align: right;">
                            <a class="nav-link" href="#" style="text-align: right;">ƯU ĐÃI</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <br>
            <Carousel />
            <!-- <router-link :to="{ name: 'DonHang' }"
                class="btn btn-sm btn-outline-secondary mx-1">
                Đơn hàng
            </router-link> -->
            <SanPhamDS :sanphams="this.sanpham" />
            <Footer />
        </div>

    </div>

</template>

<script>
import SanPhamDS from "../components/HomePageComponents/SanPhamDS.vue";
import Footer from "../components/HomePageComponents/Footer.vue";
import DanhMucService from "../services/danhmuc.service";
import ThuongHieuService from "../services/thuonghieu.service";
import SanPhamService from "../services/sanpham.service";
import GioHangService from "../services/giohang.service";
import CTGHService from '../services/chitietgiohang.service';
import { mapGetters, mapMutations } from "vuex";
import Carousel from "../components/HomePageComponents/Carousel.vue";
export default {
    name: `homepage`,
    components: {
        Carousel,
        SanPhamDS,
        Footer,
    },
    data() {
        return {
            danhmuc: [],
            thuonghieu: [],
            sanpham: [],
            giohang: {},
            chitietgiohang: [],
            nameToSearch: "",
            dssanpham:[],
        }
    },
    computed: {
        ...mapGetters({
            currentUser: "loggedInKhachHang",
        }),
    },

    mounted() {
        this.initCustomerState();
        this.retrieveDanhMuc();
        this.retrieveThuongHieu();
        this.retrieveSanPhams();
        this.retrieveGioHang();
        this.retrieveCTGH();
    },
    methods: {
        ...mapMutations([
            "initCustomerState"
        ]),

        logout() {
            this.$store.commit("logout");
            this.$router.push("/");
        },

        async goToQLDangNhap() {
            this.$router.push("/DangNhap");
        },

        async goToDangKy() {
            this.$router.push("/DangKy");
        },

        async retrieveDanhMuc() {
            const [error, response] = await this.handle(
                DanhMucService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.danhmuc = response.data;
                // console.log(response.data);
            }

        },
        async retrieveThuongHieu() {
            const [error, response] = await this.handle(
                ThuongHieuService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.thuonghieu = response.data;
                // console.log(response.data);
            }
        },
        async searchName() {
            console.log(this.nameToSearch)
            const [error, response] = await this.handle(
                SanPhamService.findByName(this.nameToSearch)
            );
            if (error) {
                console.log(error);
            } else {
                if (response.data != null) {
                    this.sanpham = response.data
                    // console.log(this.sanpham)
                }
            }
        },
        async retrieveSanPhams() {
            const [error, response] = await this.handle(
                SanPhamService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.sanpham = response.data;
                let i = 0;
                this.sanpham.forEach(element => {
                    this.findThuongHieu(element, i);
                    i++;
                });
                // console.log(this.sanpham,'reteterterterterter')
                this.dssanpham = this.sanpham.slice();
            }
        },


        async findThuongHieu(sp, i) {
            this.thuonghieu.forEach(element => {
                if (element.TH_Ma == sp.TH_Ma) {
                    this.sanpham[i].TH_Ten = element.TH_Ten;
                }
            });
        },
        async retrieveCTGH() {
            console.log("sq")
            const [error, response] = await this.handle(
                CTGHService.findByMaGH(this.currentUser.GH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.chitietgiohang = response.data;
                this.chitietgiohang.forEach(element => {
                    this.findSanPham(element);
                });
            }
        },

        async findSanPham(ctgh) {
            const [error, response] = await this.handle(
                SanPhamService.getByID(ctgh.SP_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                ctgh.SP_TenSanPham = response.data.SP_TenSanPham;
                ctgh.SP_GiaBanRa = response.data.SP_GiaBanRa;
                ctgh.SP_HinhAnh = require(`@/images/` + response.data.SP_HinhAnh);
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
                // console.log(response.data);
            }
        },

        async timSPTheoThuongHieu(data){
            let sanphamcoppy = this.dssanpham;
            this.sanpham.splice(0,this.sanpham.length);
            sanphamcoppy.forEach(element => {
                if(element.TH_Ma == data.TH_Ma){
                    this.sanpham.push(element);
                }
            });
        },

        async timSPTheoDanhMuc(data){
            console.log(data)
            let sanphamcoppy = this.dssanpham;
            this.sanpham.splice(0,this.sanpham.length);
            sanphamcoppy.forEach(element => {
                if(element.DMSP_Ma == data.DM_Ma){
                    this.sanpham.push(element);
                }
            });            
        }
    },


};
</script>

<style>
@import '../assets/homepageStyle.css'
</style>