<template>
     <div class="container-fuild tranggiohang">
          <!------------------------------------------- Header --------------------------------->
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
                                                                      @click="logout()">Đăng
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
          
          <!------------------------------------------- Header --------------------------------->
          <div class="row" >
               <div class="col-md-12" style="margin-top: 150px; overflow: hidden;">
                    <button class="btnDonHang" @click="goToDonHang()">
                         Đơn Hàng
                    </button>
               </div>
          </div>
          <div class="giohangtrong row" v-if="SLSPTrongGioHang">
               <div class="col-md-5"></div>
               <div class="col-md-2 text-center">
                    <img src="../../../images/shopping-cart2.webp" class="img-fluid" alt="...">
                    <p class="textGioHangTrong">Giỏ hàng của bạn còn trống</p>
                    <router-link to="/" class="btn btn-sm btn-outline-secondary mx-1 btnMuaNgay">
                         Mua Ngay
                    </router-link>
               </div>
               <div class="col-md-5"></div>
          </div>
          <div class="giohang row pt-5p" v-if="(!isOpenDatHang && !SLSPTrongGioHang)">
               <div class="col-md-12">
                    <h3 style="text-align:center; margin-top: 3%; margin-bottom: 1%;">THÔNG TIN GIỎ HÀNG</h3>
               </div>
               <div class="row titleRow" style="width:100%">
                    <div class="col-md-5 title" style="text-align:center">Sản phẩm</div>
                    <div class="col-md-2 title" style="text-align:center">Đơn giá</div>
                    <div class="col-md-2 title" style="text-align:center">Số lượng</div>
                    <div class="col-md-2 title" style="text-align:center">Thành tiền</div>
                    <div class="col-md-1 title">Thao tác</div>
               </div>
               <div v-for="(ctgh, i) in chitietgiohang" :key="i" class="row thongtinSP">
                    <div class="khungsanpham col-md-5 column">
                         <div class="row">
                              <div class="col-md-1 column">
                                   <input class="form-check-input checkbox" type="checkbox" value=""
                                        id="flexCheckDefault"
                                        @click="chonTatCa = false, chonSP(ctgh), checkSLSPdaChon(), tinhThanhTien()" />
                              </div>
                              <div class="col-md-3 hinhanh">
                                   <img :src="ctgh.SP_HinhAnh" class="img-fluid" alt="">
                              </div>
                              <div class="col-md-8 khungTenSP" style=" position: relative;">
                                   <p class="tenSP">{{ ctgh.SP_TenSanPham }}</p>
                              </div>
                         </div>
                    </div>
                    <div class="col-md-2 column">
                         <p class="text">{{ formatMoney(ctgh.SP_GiaBanRa) }}đ</p>
                    </div>
                    <div class="col-md-2 column">
                         <button v-if="ctgh.CTGH_SoLuong > 1" class="btn btngiam" @click="giamSL(ctgh)"><span
                                   class="fas fa-minus"></span></button>
                         <button v-else class="btn btngiam"><span class="fas fa-minus"></span></button>
                         <p class="text soluong">{{ ctgh.CTGH_SoLuong }}</p>
                         <button class="btn btntang" @click="tangSL(ctgh)"><span class="fas fa-plus"></span></button>

                    </div>
                    <div class="col-md-2 column">
                         <p class="text">{{ formatMoney(ctgh.CTGH_SoLuong * ctgh.SP_GiaBanRa) }}đ</p>
                    </div>
                    <div class="col-md-1 column"><button @click="deleteSanPham(ctgh)" type="button"
                              class="text btnXoa btn">Xóa</button></div>
               </div>
               <div class="row thongTinDatHang">
                    <div class="col-md-2 column">
                         <input class="form-check-input chonTatCa" style="position: relative;" type="checkbox" value=""
                              id="flexCheckDefault2" @click="chonTatCa = !chonTatCa, chonTatcaSP(), tinhThanhTien()" />
                         <label class="lableTatCa">Chọn tất cả</label>
                    </div>
                    <div class="col-md-2">

                    </div>
                    <div class="col-md-6 column">
                         <p class="tongThanhToan">Tổng thanh toán ({{ sanphamChon.length }} Sản phẩm):
                              {{ formatMoney(thanhTien) }}đ</p>
                    </div>

                    <div class="col-md-2 column">
                         <button class="btn btnDatHang" @click="isOpenDatHang = !isOpenDatHang">Đặt hàng</button>
                    </div>
               </div>

          </div>
          <!------------------------------------------------------------- Form dat hang -->
          <div class="dathang container-fuild">
               <div v-if="isOpenDatHang">
                    <h3 style="text-align:center">ĐƠN HÀNG</h3>
                    <div class="row" style="width:100%">
                         <div class="col-md-6 textTT"> Tên tài khoản đặt hàng: {{ currentUser.KH_Ten }}</div>
                         <div class="col-md-6 textTT">Số điện thoại: {{ currentUser.KH_SDT }}</div>
                    </div>
                    <div class="row" style="width:100%">
                         <div class="col-md-6">
                              <label class="textTTNhap">Địa chỉ giao hàng:</label>
                              <input type="text" name="diachi" id="diachi" class="diachi" required
                                   v-model="dondathang.DH_DiaChiGiaoHang" placeholder="Nhập địa chỉ giao hàng....">
                         </div>
                         <div class="col-md-6">
                              <label class="textTTNhap">Ghi chú:</label>
                              <input type="text" name="ghichu" id="ghichu" class="ghichu" v-model="dondathang.DH_GhiChu"
                                   placeholder="Nhập ghi chú...">
                         </div>
                    </div>

                    <div class="row chitietDonHang">
                         <div class="col-md-12">
                              <h4 style="text-align:center">CHI TIẾT ĐƠN HÀNG</h4>
                         </div>
                         <div class="col-md-12 ">
                              <div class="row titleRowCTDH" style="width:100%">
                                   <div class="col-md-6 title" style="text-align:center">Sản phẩm</div>
                                   <div class="col-md-2 title" style="text-align:center">Đơn giá</div>
                                   <div class="col-md-2 title" style="text-align:center">Số lượng</div>
                                   <div class="col-md-2 title" style="text-align:center">Thành tiền</div>
                              </div>
                              <div v-for="(ctgh, i) in sanphamChon" :key="i" class="row thongtinSPDatHang">
                                   <div class="khungsanpham col-md-6 column">
                                        <div class="row">
                                             <div class="col-md-2 hinhanh">
                                                  <div class="row" style="margin: 4px 4px 4px 4px;">
                                                       <img :src="ctgh.SP_HinhAnh" class="img-fluid img-thumbnail"
                                                            alt="">
                                                  </div>
                                             </div>
                                             <div class="col-md-9 khungTenSP" style=" position: relative;">
                                                  <p class="tenSP">{{ ctgh.SP_TenSanPham }}</p>
                                             </div>
                                        </div>
                                   </div>
                                   <div class="col-md-2 column">
                                        <p class="textDatHang">{{ formatMoney(ctgh.SP_GiaBanRa) }}đ</p>
                                   </div>
                                   <div class="col-md-2 column">
                                        <p class=" soluong textDatHang">{{ ctgh.CTGH_SoLuong }}</p>
                                   </div>
                                   <div class="col-md-2 column">
                                        <p class="textDatHang">{{ formatMoney(ctgh.CTGH_SoLuong * ctgh.SP_GiaBanRa) }}đ
                                        </p>
                                   </div>
                              </div>
                         </div>
                         <div class="row rowDatHang">
                              <div class="col-md-4">
                              </div>
                              <div class="col-md-6 column">
                                   <p class="tongThanhToan">Tổng thanh toán ({{ sanphamChon.length }} Sản phẩm):
                                        {{ formatMoney(thanhTien) }}đ</p>
                              </div>

                              <div class="col-md-2 column">
                                   <button class="btn btnDatHang" @click="datHang()">Đặt hàng</button>
                              </div>
                         </div>
                    </div>
               </div>

               <div class="dialogThongBao" v-if="isOpenThongBao">
                    <p style="color:#515151; text-align:center; margin-top: 50px; font-size: 18px;"
                         class="labelThongBao">
                         <span class="fas fa-check-circle" style="color:#00BA13; text-align: center;"></span>
                         Đặt đơn hàng thành công
                    </p>
                    <button class="btnOK btn btn-sm btn-outline-secondary"
                         @click="(isOpenThongBao = !isOpenThongBao, isOpenDatHang = !isOpenDatHang)">OK</button>
               </div>
          </div>
          <!-- ----------------------------------------ds mot so san pham -->
          <div class="listSP container-fuild border-top border-bottom">
               <div>
                    <h5>CÓ THỂ BẠN SẼ THÍCH</h5>
               </div>
               <div class="row sanpham-khung bg-light">
                    <div v-for="(sanpham, i) in sanphams" :key="i" class="col-md-2">
                         <SanPhamGioHang :sanpham="sanpham" />
                    </div>
               </div>
          </div>
          <Footer />
     </div>

     <!-- ----------------------------------------------------------- -->
</template>
     
<script type=”text/javascript”>
import SanPhamGioHang from "../../../components/HomePageComponents/SanPhamGioHang.vue";
import SanPhamService from "../../../services/sanpham.service";
import CTGHService from "../../../services/chitietgiohang.service";
import GioHangService from "../../../services/giohang.service";
import DonHangService from "../../../services/donhang.service";
import CTDHService from "../../../services/chitietdonhang.service";
import ThuongHieuService from "../../../services/thuonghieu.service";
import { mapGetters, mapMutations } from "vuex";
// import Header from '../../../components/HomePageComponents/Header.vue';
import Footer from '../../../components/HomePageComponents/Footer.vue'


export default {
     name: `GioHang`,
     components: { SanPhamGioHang, Footer },
     data() {
          return {
               sanpham: {},
               ctghActive: {},
               giohangActive: {},
               sanphamChon: [],
               chitietgiohang: [],
               chonTatCa: false,
               thanhTien: 0,
               isOpenDatHang: false,
               dondathang: {},
               chitietdonhang: [],
               isOpenThongBao: false,
               SLSPTrongGioHang: false,
               sanphams: [],
               tongsoluongSP: 0,
               giohang: {},
               nameToSearch: "",
               soluongxoa: 0,
               sothanhcong: false,
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
               this.$router.push("/");
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

          //    Dinh dang hien thi tien 
          formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

          async retrieveCTGH() {
               const [error, response] = await this.handle(
                    CTGHService.findByMaGH(this.currentUser.GH_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    let tong = 0;
                    this.chitietgiohang = response.data;
                    this.chitietgiohang.forEach(element => {
                         tong += element.CTGH_SoLuong;
                         this.findSanPham(element);
                    });
                    this.giohang.GH_TongSoLuong = tong;
               }
               this.checkSLSP();
          },

          async retrieveSanPham() {
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
                              this.findThuongHieu(element, i)
                              i++;
                         }
                    });

                    console.log(response.data);
               }
          },

          async findThuongHieu(sp, i) {
               const [error, response] = await this.handle(
                    ThuongHieuService.get(sp.TH_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanphams[i].TH_Ten = response.data.TH_Ten;
               }
          },


          // Tim kiem san pham theo ma san pham
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

          // Tim kiem thong tin gio hang
          async findGioHang(ma) {
               const [error, response] = await this.handle(
                    GioHangService.getByID(ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.giohangActive = response.data;
                    console.log(this.giohangActive)
               }
          },

          // Tang so luong san pham
          async tangSL(ctgh) {
               this.findGioHang(this.currentUser.GH_Ma)
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctgh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    if (response.data.SP_SoLuong >= 1) {
                         ctgh.CTGH_SoLuong += 1;
                         this.sanpham.SP_SoLuong = this.sanpham.SP_SoLuong - 1;
                         this.giohangActive.GH_TongSoLuong = this.giohangActive.GH_TongSoLuong + 1;
                         this.updateSanPham(ctgh);
                         this.updateCTGH(ctgh);
                         this.updateGioHang();
                         this.tinhThanhTien();
                         this.retrieveGioHang();
                    }
               }
          },

          // Giam so luong san pham
          async giamSL(ctgh) {
               this.findGioHang(this.currentUser.GH_Ma)
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctgh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    ctgh.CTGH_SoLuong -= 1;
                    this.sanpham.SP_SoLuong = this.sanpham.SP_SoLuong + 1;
                    this.giohangActive.GH_TongSoLuong = this.giohangActive.GH_TongSoLuong - 1;
                    this.updateSanPham(ctgh);
                    this.updateCTGH(ctgh)
                    this.updateGioHang();
                    this.tinhThanhTien();
                    this.retrieveGioHang();
               }
          },

          // Cap nhat so luong san pham trong csdl
          async updateSanPham(ctgh) {
               const [error, response] = await this.handle(
                    SanPhamService.update(ctgh.SP_Ma, this.sanpham)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
               }
          },

          // Cap nhat so luong san pham trong chi tiet gio hang
          async updateCTGH(ctgh) {
               const [error, response] = await this.handle(
                    CTGHService.update(this.currentUser.GH_Ma, ctgh)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
               }
          },
          async updateGioHang() {
               const [error, response] = await this.handle(
                    GioHangService.update(this.currentUser.GH_Ma, this.giohangActive)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
               }
          },
          // Cap nhat tong so luong san pham trong gio hang
          async updateGioHangKhiXoaSP() {
               this.findGioHang(this.currentUser.GH_Ma)
               this.giohangActive.GH_TongSoLuong = this.giohang.GH_TongSoLuong - this.soluongxoa;
               const [error, response] = await this.handle(
                    GioHangService.update(this.currentUser.GH_Ma, this.giohangActive)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
                    this.retrieveGioHang();
               }
          },

          // Tim kiem san pham de tra so luong san pham khi xoa san pham khoi gio hang
          async deleteSanPham(ctgh) {
               this.findGioHang(this.currentUser.GH_Ma)
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctgh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    this.sanpham.SP_SoLuong = this.sanpham.SP_SoLuong + ctgh.CTGH_SoLuong;
                    this.soluongxoa = ctgh.CTGH_SoLuong;
                    this.updateSanPham(ctgh);
                    this.deleteCTGHTrenGioHang(ctgh.id);
               }

          },
          // Xoa chi tiet gio hang có ma san pham da chon xoa khoi gio hang
          async deleteCTGHTrenGioHang(id) {
               const [error, response] = await this.handle(
                    CTGHService.delete(id)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data);
                    this.retrieveCTGH();
                    console.log(this.chitietgiohang)
                    this.updateGioHangKhiXoaSP();
               }

          },
          // Xoa chi tiet gio hang có ma san pham da chon xoa khoi gio hang
          async deleteCTGH(id) {
               const [error, response] = await this.handle(
                    CTGHService.delete(id)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data);
                    this.retrieveCTGH();
                    console.log(this.chitietgiohang)
                    this.retrieveGioHang();
               }

          },

          // Cap nhat tong so luong san pham trong gio hang
          async updateGioHangXoa() {
               this.findGioHang(this.currentUser.GH_Ma);
               console.log(this.giohangActive.GH_TongSoLuong + " " + this.dondathang.DH_TongSoLuong);
               this.giohangActive.GH_TongSoLuong = this.giohang.GH_TongSoLuong - this.dondathang.DH_TongSoLuong;

               const [error, response] = await this.handle(
                    GioHangService.update(this.currentUser.GH_Ma, this.giohangActive)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
                    this.retrieveGioHang()
               }
          },

          //Click chon san pham tren checkbox
          async chonSP(ctgh) {
               const t = this.sanphamChon.length;
               if (t == 0) {
                    this.sanphamChon.push(ctgh);
               }
               else {
                    let check = 0;
                    let i = 0;
                    this.sanphamChon.forEach(element => {
                         if (element.SP_Ma == ctgh.SP_Ma) {
                              check = 1;
                              this.sanphamChon.splice(i, 1);
                              document.getElementById('flexCheckDefault2').checked = false
                         }
                         i++;
                    });
                    if (check == 0) {
                         this.sanphamChon.push(ctgh);
                    }
               }
          },

          // Click checkbox chon tat ca san pham
          async chonTatcaSP() {
               if (this.chonTatCa) {
                    this.sanphamChon.splice(0, this.sanphamChon.length);
                    let temp = this.chitietgiohang.slice();
                    this.sanphamChon = temp;
                    for (const checkbox of document.querySelectorAll('#flexCheckDefault')) {
                         checkbox.checked = true;
                    }

               }
               else {
                    this.sanphamChon.splice(0, this.sanphamChon.length);
                    for (const checkbox of document.querySelectorAll('#flexCheckDefault')) {
                         checkbox.checked = false;
                    }
               }
          },

          async checkInSanPhamDaChon(sanpham) {
               console.log("chbk" + sanpham)
               this.sanphamChon.forEach(element => {
                    if (element.SP_Ma == sanpham) {
                         return true;
                    }
               });
               return false;
          },

          // Kiem tra so luong san pham da chon co bang so luong chi tiet gio hang khong
          async checkSLSPdaChon() {
               console.log("njvda" + this.chitietgiohang.length + " " + this.sanphamChon.length)
               if (this.chitietgiohang.length == this.sanphamChon.length) {
                    this.chonTatCa = true;
                    document.getElementById('flexCheckDefault2').checked = true;
               }
               else {
                    this.chonTatCa = false;
                    document.getElementById('flexCheckDefault2').checked = false;
               }
          },

          // Tinh thanh tien cho cac san pham da chon
          async tinhThanhTien() {
               this.thanhTien = 0;
               this.sanphamChon.forEach(element => {
                    this.thanhTien += element.SP_GiaBanRa * element.CTGH_SoLuong;
               });
          },

          // Dat hang
          async datHang() {
               console.log(this.dondathang.DH_DiaChiGiaoHang + "ncka")
               if (this.dondathang.DH_DiaChiGiaoHang != null) {
                    let tongsoluong = 0;
                    this.sanphamChon.forEach(element => {
                         tongsoluong += element.CTGH_SoLuong;
                    });

                    this.dondathang.DH_TongSoLuong = tongsoluong;
                    this.dondathang.KH_Ma = this.currentUser.KH_Ma;
                    this.dondathang.DH_TongTien = this.thanhTien;
                    this.dondathang.DH_TrangThai = "Mới";
                    this.dondathang.DH_NgayDat = new Date().toLocaleDateString();
                    console.log(this.dondathang);
                    const [error, response] = await this.handle(
                         DonHangService.create(this.dondathang)
                    );
                    if (error) {
                         console.log(error);
                    } else {
                         console.log(response.data)
                         this.createCTDH(response.data.id);
                         this.updateGioHangXoa();
                         this.thanhTien = 0;
                    }
               }
          },

          //tao chi tiet don hang

          async createCTDH(maDH) {
               this.sanphamChon.forEach(element => {
                    let temp = {};
                    temp.DH_Ma = maDH;
                    temp.CTDH_SoLuong = element.CTGH_SoLuong;
                    temp.SP_Ma = element.SP_Ma;
                    temp.CTDH_Gia = element.SP_GiaBanRa
                    console.log(this.temp);
                    this.saveCTDH(temp, element.id);
               })

          },

          async saveCTDH(ctdh, id) {
               const [error, response] = await this.handle(
                    CTDHService.create(ctdh)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data);
                    this.chonSP(ctdh);
                    this.deleteCTGH(id);
                    this.isOpenThongBao = true;
                    this.retrieveGioHang();
               }
          },

          async checkSLSP() {
               if (this.chitietgiohang == 0) {
                    this.SLSPTrongGioHang = true;
               }
               else {
                    this.SLSPTrongGioHang = false;
               }
          },

          async gotoHomePage() {
               this.$router.push({ name: 'HomePage' });
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
                         console.log(this.sanpham)
                    }
               }
          },
     },

     mounted() {
          this.initCustomerState();
          if(this.currentUser) {
               this.retrieveGioHang();
               this.retrieveCTGH();
          }
          this.retrieveSanPham();

     }

}
</script>
     
<style>
@import '../../../assets/GioHangStyle.css';
</style>