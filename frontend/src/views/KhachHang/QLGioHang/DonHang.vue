<template>
     <div class="container-fuild dondathang">
          <div class="header-outside">
          <div class="container-fuild header">
               <header class="align-items-center">
                    <div class="row  justify-content-between align-items-center" style="background-color: white;">
                         <div class="col-md-1 logo-image pl-0 pr-0" @click="gotoHomePage()">
                              <img class="img-fluid" src="../../../images/Logo.png">
                         </div>
                         <div class="col-sm-11">
                              <div class="row search">
                                   <div class="col-sm-9 pt-2 pb-1 pl-1">
                                        <div class="input-group">
                                             <input type="text" class="form-control" placeholder="Tìm kiếm"
                                                  v-model="nameToSearch" style="font-size: 18px;"
                                                  @click="gotoHomePage()" />
                                             <div class="input-group-append">
                                                  <button class="btn btn-outline-secondary" type="button"
                                                       @click="searchName, gotoHomePage()"
                                                       style="border: none; font-size: 18px;">
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
                                                                      @click="logout(), gotoHomePage()">Đăng
                                                                      xuất</a>
                                                                 <a class="dropdown-item" href="#">Đổi mật khẩu</a>
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
                                                       @click="goToDangKy()">Đăng ký</button>
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
                                                                      @click="goToDangKy()">Đăng ký</a>
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
</div>
          <div class="row title">
               <h4 class="col-md-12" style="margin-top: 160px; overflow: hidden;">ĐƠN HÀNG CỦA BẠN</h4>
          </div>
          <div class="dsDonDatHang" v-if="!isOpenCTDH">
               <div class="row titleRow" style="width:100%">
                    <div class="col-md-3 title">Mã đơn hàng</div>
                    <div class="col-md-2 title">Ngày đặt</div>
                    <div class="col-md-2 title">Số lượng</div>
                    <div class="col-md-3 title">Số tiền</div>
                    <div class="col-md-2 title">Trạng thái</div>
               </div>
               <div v-for="(donhang, i) in dsDonHang" :key="i" class="row thongtinDonHang" @click="(setActiveDonHang(donhang), isOpenCTDH=!isOpenCTDH)">
                    <div class="col-md-3 column">
                         <p class="text"> {{ donhang.id }} </p>
                    </div>
                    <div class="col-md-2 column">
                         <p class="text"> {{ donhang.DH_Ngay }}</p>
                    </div>
                    <div class="col-md-2 column">
                         <p class="text"> {{ donhang.DH_TongSoLuong }}</p>
                    </div>
                    <div class="col-md-3 column">
                         <p class="text"> {{ formatMoney(donhang.DH_TongTien) }}đ </p>
                    </div>
                    <div class="col-md-2 column">
                         <button class="btn btnTrangThai">{{ donhang.DH_TrangThai }}</button>

                    </div>
               </div>
          </div>
          <CTDH v-if="isOpenCTDH" :chitietdonhang="chitietdonhang" :activeDonHang="donhangActive" :khachhang="currentUser" :nhanvien="nhanvien"/>
          <div class=" row" v-if="isOpenCTDH">
               <div class="col-md-12">
                    <button class="btn btnTroVe" @click="isOpenCTDH = !isOpenCTDH">
                         Trở về
                    </button>
               </div>
          </div>
          <Footer />
     </div>
     
</template>

<script>
import DonHangService from '../../../services/donhang.service';
import SanPhamService from '../../../services/sanpham.service';
import CTDHService from '../../../services/chitietdonhang.service';
import NhanVienService from '../../../services/nhanvien.service';
import moment from 'moment';
import GioHangService from "../../../services/giohang.service";
import { mapGetters, mapMutations } from "vuex";
import Footer from '../../../components/HomePageComponents/Footer.vue';
import CTDH from '../../../components/HomePageComponents/ChiTietDonHang.vue';
export default {
     name: `DonHang`,
     components: {Footer, CTDH},
     data() {
          return {
               dsDonHang: [],
               tongsoluongSP: 0,
               giohang: {},
               nameToSearch: "",
               isOpenCTDH: false,
               nhanvien:{},
               donhangActive:{},
               chitietdonhang:[],
          }
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
               
          },

          async goToDangKy() {
               this.$router.push("/DangKy");
          },

          async goToQLDangNhap() {
               this.$router.push("/DangNhap");
          },

          async goToDonHang() {
               this.$router.push("/DonHang");
          },
          async gotoHomePage() {
               this.$router.push({ name: 'HomePage' });
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
          async retrieveDonHang() {
               this.donhangActive.NV_Ma = "";
               this.donhangActive.HD_SoHD = "";
               let DH_TrangThai = this.currentUser.KH_Ma;
               console.log(this.currentUser)
               const [error, response] = await this.handle(
                    DonHangService.findByStatus(DH_TrangThai)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.dsDonHang = response.data;
                    if (this.dsDonHang.length > 0) {
                         this.dsDonHang.forEach(element => {
                              element.DH_Ngay = moment(String(element.DH_NgayDat)).format("MM/DD/YYYY");
                         });
                    }
               }
          },
          async retrieveChiTietDonHang() {
            const [error, response] = await this.handle(
                CTDHService.findByMaDH(this.donhangActive.id)
            );
            if (error) {
                console.log(error);
            } else {
                this.chitietdonhang = response.data;
                let i = 0;
                this.chitietdonhang.forEach(element => {
                    this.findSanPham(element,i);
                    i++;
                });

                console.log(this.chitietdonhang)
            }
        },
        async findSanPham(ctdh, index) {
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctdh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.chitietdonhang[index].SP_TenSanPham = response.data.SP_TenSanPham
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
                this.nhanvienXNDH = response.data;
            }
        },
        async setActiveDonHang(DHActive) {
            this.donhangActive = DHActive;
            this.retrieveChiTietDonHang(this.donhangActive.id);
            if(this.donhangActive.NV_Ma !=""){
               this.findNVByMaNV(this.donhangActive.NV_Ma);
            }
            else{
               this.nhanvien.NV_Ma = "";
               this.nhanvien.NV_Ten = "";
               this.nhanvien.NV_Ho = "";
            }
            
        },

          formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },

     },

     mounted() {
          this.initCustomerState();
          this.retrieveDonHang();
          this.retrieveGioHang();
     }
}
</script>

<style>
@import '../../../assets/QLDonDatHangStyle.css'
</style>