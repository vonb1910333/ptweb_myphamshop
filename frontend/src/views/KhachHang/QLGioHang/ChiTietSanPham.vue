<template>
     <div class="container-fuild chitietsanpham">
          <!---------------------------- Header--------------------------- -->
          <div class="container-fuild header">
               <header class="align-items-center">
                    <div class="row  justify-content-between align-items-center">
                         <div class="col-md-1 logo-image pl-0 pr-0">
                              <img class="img-fluid" src="../../../images/Logo.png" @click="gotoHomePage()">
                         </div>
                         <div class="col-sm-11">
                              <div class="row search">
                                   <div class="col-sm-9 pt-2 pb-1 pl-1">
                                        <div class="input-group">
                                             <input type="text" class="form-control" placeholder="Tìm kiếm"
                                                  v-model="nameToSearch" @keyup.enter="searchName"
                                                  @click="gotoHomePage()" style="font-size: 18px;" />
                                             <div class="input-group-append">
                                                  <button class="btn btn-outline-secondary" type="button"
                                                       @click="searchName" style="border: none; font-size: 18px;">
                                                       <span class="fa fa-search" aria-hidden="true"></span>
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                                   <div class="col-sm-3 align-items-center pt-0 pl-0 pr-0">
                                        <div v-if="currentUser"
                                             class="justify-content-end align-items-center headerKhachHang">
                                             <p class="tenTaiKhoan">
                                                  {{ currentUser.KH_Ten }}
                                             </p>
                                             <div class="nav-item dropdown justify-content-center"
                                                  style="display:inline; ">
                                                  <button class="btn btnTaiKhoan btn-default"><span
                                                            class="fas fa-user-circle iconTaiKhoan"></span>
                                                       <a class="nav-link " href="#" id="navbardrop">
                                                            <div class="dropdown-menu right">
                                                                 <a class="dropdown-item" href="#"
                                                                      @click="logout()">Đăng
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
                                                  <button class="btn btn-secondary pl-1 pr-1 btnDangKy"
                                                       @click="goToDangKy()">Đăng
                                                       ký</button>
                                             </div>
                                             <div class="nav-item dropdown justify-content-center"
                                                  style="display:inline; margin-top: 1px; ">
                                                  <button class="btn btnTaiKhoan btn-default"
                                                       style="display:inline; margin-top: 1px;"><span
                                                            class="fas fa-user-circle iconTaiKhoan"></span>
                                                       <a class="nav-link " href="#" id="navbardrop">
                                                            <div class="dropdown-menu right">
                                                                 <a class="dropdown-item" href="#"
                                                                      @click="goToQLDangNhap()">Đăng
                                                                      nhập</a>
                                                                 <a class="dropdown-item" href="#"
                                                                      @click="goToDangKy()">Đăng
                                                                      ký</a>
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
                                   <div class="col-12"><img src="../../../images/Cosmetic.png" class="img-fluid"></div>
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
                                   <button v-if="SoLuong == 1" class="btn btngiam"><span
                                             class="fas fa-minus"></span></button>
                                   <p class="text soluong">{{ SoLuong }}</p>
                                   <button class="btn btntang" @click="tangSL()"><span
                                             class="fas fa-plus"></span></button>

                                   <button v-if="currentUser" class="btn btn-outline-secondary btnThemvaoGioHang"
                                        @click="checkCTGH()" type="button">Thêm vào giỏ hàng</button>
                                   <button v-if="!currentUser" class="btn btn-outline-secondary btnThemvaoGioHang"
                                        @click="goToQLDangNhap()" type="button">Thêm vào giỏ hàng</button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <!-- <SanPhamCT :sanpham="sanpham" /> -->
          <div class="listSP container-fuild border-top border-bottom">
               <div>
                    <h5>CÓ THỂ BẠN SẼ THÍCH</h5>
               </div>
               <div class="row sanpham-khung bg-light">
                    <div v-for="(sanpham, i) in sanphams" :key="i" class="col-md-2">
                         <SanPhamGioHang :sanpham="sanpham" @click="lamMoi()" />
                    </div>
               </div>
          </div>
          <Footer />
     </div>
</template>

<script>
import CTGHService from "../../../services/chitietgiohang.service";
// import SanPhamCT from '../../../components/HomePageComponents/SanPhamCT.vue';
import SanPhamService from '../../../services/sanpham.service';
import GioHangService from '../../../services/giohang.service';
import Footer from '../../../components/HomePageComponents/Footer.vue'
import SanPhamGioHang from "../../../components/HomePageComponents/SanPhamGioHang.vue";
import ThuongHieuService from "../../../services/thuonghieu.service";
import { mapGetters, mapMutations } from "vuex";
export default {
     name: `ChiTietSanPham`,
     components: { SanPhamGioHang, Footer },

     data() {
          return {
               sanpham: {},
               sanphams: [],
               nameToSearch: "",
               sanphamthem: {},
               chitietgiohang: [],
               chitietgiohangthem: {},
               SoLuong: 1,
               giohang: {},
               thuonghieu: [],
          }
     },

     computed: {
          ...mapGetters({
               currentUser: "loggedInKhachHang",
          }),
     },

     created() {
          this.sanpham.SP_Ma = this.$route.params.id;
          this.getSanPham();
     },

     methods: {

          ...mapMutations([
               "initCustomerState"
          ]),
          async retrieveSanPhams() {
               this.sanphams = this.sanphams.slice()
               const [error, response] = await this.handle(
                    SanPhamService.getAll()
               );
               if (error) {
                    console.log(error);
               } else {
                    let i = 0;
                    const temp = response.data;
                    temp.forEach(element => {
                         if (i <= 11) {
                              this.sanphams.push(element);
                              this.findThuongHieus(element, i)
                              i++;
                         }
                    });
                    console.log(response.data);
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
                    console.log(this.thuonghieu)
               }
          },

          async findThuongHieus(sp, i) {
               this.thuonghieu.forEach(element => {
                    if (element.TH_Ma == sp.TH_Ma) {
                         this.sanphams[i].TH_Ten = element.TH_Ten;
                    }
               });
          },

          async getSanPham() {
               const [error, response] = await this.handle(
                    SanPhamService.getByID(this.sanpham.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    this.sanpham.SP_HinhAnh = require(`@/images/` + this.sanpham.SP_HinhAnh)
                    this.sanphamthem = response.data;
                    console.log(response.data);
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
                    console.log(this.giohang)
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
                         this.sanpham = response.data;
                         let i = 0;
                         this.sanpham.forEach(element => {
                              this.findThuongHieus(element, i)
                              i++;
                         });

                    }
               }
          },
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
                    SanPhamService.getByID(this.sanpham.SP_Ma)
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
               this.thuonghieu.forEach(element => {
                    if (element.TH_Ma == this.sanphamthem.TH_Ma) {
                         this.sanphamthem.TH_Ten = element.TH_Ten;
                         this.sanphamthem.TH_XuatXu = element.TH_XuatXu;
                    }
               });


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
                    this.$router.push("/");
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
          },

          async lamMoi() {
               this.sanpham.SP_Ma = this.$route.params.id;
               this.initCustomerState();
               this.retrieveGioHang();
               this.retrieveThuongHieu();
               this.getSanPham();
               this.retrieveSanPham();
          }
     },
     mounted() {
          this.initCustomerState();
          this.retrieveThuongHieu();
          this.retrieveGioHang();
          this.getSanPham();
          this.retrieveSanPhams();
          this.retrieveSanPham();

     }
}
</script>

<style>
@import '../../../assets/chitietsanphamStyle.css';
</style>