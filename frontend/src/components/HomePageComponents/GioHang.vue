<template>
     <div class="giohang container-fuild">
          <div class="row titleRow" style="width:100%">
               <div class="col-md-5 title">Sản phẩm</div>
               <div class="col-md-2 title" style="text-align:center">Đơn giá</div>
               <div class="col-md-2 title" style="text-align:center">Số lượng</div>
               <div class="col-md-2 title" style="text-align:center">Số tiền</div>
               <div class="col-md-1 title">Thao tác</div>
          </div>
          <div v-for="(ctgh, i) in chitietgiohang" :key="i" class="row thongtinSP">
               <div class="sanpham col-md-5 column">
                    <div class="row">
                         <div class="col-md-1 column"><input class="form-check-input" type="checkbox" value=""
                                   id="flexCheckDefault" /></div>
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
                         <button v-if="ctgh.CTGH_SoLuong == 1" class="btn btngiam"><span
                                   class="fas fa-minus"></span></button>
                         <p class="text soluong">{{ ctgh.CTGH_SoLuong }}</p>
                         <button class="btn btntang" @click="tangSL(ctgh)"><span class="fas fa-plus"></span></button>
                    
               </div>
               <div class="col-md-2 column">
                    <p class="text">{{ formatMoney(ctgh.CTGH_SoLuong * ctgh.SP_GiaBanRa) }}đ</p>
               </div>
               <div class="col-md-1 column"><button @click="deleteSanPham(ctgh)" type="button" class="text btnXoa btn">Xóa</button></div>
          </div>

     </div>

</template>
     
<script>
import SanPhamService from "../../services/sanpham.service";
import CTGHService from "../../services/chitietgiohang.service";
import GioHangService from "../../services/giohang.service";

export default {
     name: `GioHang`,
     props: ["giohang", "currentUser", "chitietgiohang"],
     data() {
          return {
               sanpham: {},
               ctghActive: {},
               giohangActive: {},
          }
     },

     methods: {
          formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },


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
                         this.updateSanPham(ctgh);
                         this.updateCTGH(ctgh);
                         this.giohangActive.GH_TongSoLuong += 1;
                         this.updateGioHang();
                    }
               }
          },


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
                    this.updateSanPham(ctgh);
                    this.updateCTGH(ctgh)
                    console.log(this.giohangActive.GH_TongSoLuong)
                    this.giohangActive.GH_TongSoLuong -= 1;
                    this.updateGioHang();
               }
          },

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

          async updateCTGH(ctgh) {
               console.log(ctgh)
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

          
          async deleteSanPham(ctgh){
               this.findGioHang(this.currentUser.GH_Ma)
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctgh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;                    
                    this.sanpham.SP_SoLuong = this.sanpham.SP_SoLuong + ctgh.CTGH_SoLuong;
                    this.updateSanPham(ctgh);
                    this.giohangActive.GH_TongSoLuong -= ctgh.CTGH_SoLuong;
                    this.updateGioHang();
                    this.deleteCTGH();
               }

          },
          async deleteCTGH(){
               const [error, response] = await this.handle(
                    CTGHService.delete(this.sanpham.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data);
               }

          },

     },

}
</script>
     
<style>
@import '../../assets/GioHangStyle.css';
</style>