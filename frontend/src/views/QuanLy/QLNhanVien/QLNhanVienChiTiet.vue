<template>
     <div>
          
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
               integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <div class="container frameQLNhanVien">
               <div class="row list">
                    <div class="col-md-2 dschucNang">
                         <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
                    </div>
                    <div class="col-md-10">
                         <div class="row topHeader">
                              <QLHeader :maNV="localNhanVien.NV_Ma" />
                         </div>
                         <div class="row bottomHeader">
                              <div class="col-md-12 font-weight-bold" style="color:#515151; font-size: 25px;">
                                   <p class="lableName">Danh sách nhân viên</p>
                              </div>
                         </div>
                         <div class="row timkiem">
                              <div class="col-md-9 col-sm-1">
                              </div>
                              <div class="col-md-3 col-sm-11">
                                   <button class=" btn btn-sm btn-outline-secondary btnXem font-weight-bold"
                                        @click="goToQLNhanVien">
                                        <span class="fa fa-list-ol" style="font-size:20px"></span>
                                        Xem danh sách
                                   </button>
                              </div>
     
                         </div>
                         <div class="row frameChiTiet">
                              <div class="col-md-12 col-sm-12">
                                   <NhanVienFormThem :newnhanvien="newnhanvien" @themNhanVien-submit="findNhanVien"
                                        :message1="message1" :message2="message2" />
                              </div>
                         </div>
     
                    </div>
               </div>
          </div>
     </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import NhanVienFormChiTiet from '../../../components/QuanLy/NhanVienFormChiTiet.vue';
import NhanVienService from '../../../services/nhanvien.service'
export default {
     name: `QLHomePage`,
     components: { DanhSachChucNang, QLHeader, NhanVienFormChiTiet },
     data() {

          return {
               activeNhanVien: {},
               isOpen: false,
               message1: "",
               message2: "",
               check: 0,
               localNhanVien: {},
          }

     },
     created() {
          this.localNhanVien.NV_Ma = this.$route.params.id;
     },

     methods: {


          async createNhanVien(data) {
               if (data.NV_LoaiNV == "Quản lý") {
                    data.NV_LoaiNV = 1;
               }
               else {
                    data.NV_LoaiNV = 2;
               }
               const [error, response] = await this.handle(
                    NhanVienService.create(data)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data);
                    this.message2 = "Thêm thành công";
               }
          },

          async findNhanVien() {
               const [error, response] = await this.handle(
                    NhanVienService.getByID(this.localNhanVien.NV_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response)
               }
          },

          async goToQLNhanVien() {
               this.$router.push("/QLNhanVien");
          }
     },
     mounted() {
          this.retrieveNhanVien();
     }
};
</script>
 
<style>
@import "../../../assets/QuanLyStyle.css";
@import "../../../assets/QLNhanVienStyle.css";

.frameQLNhanVien .frameThem {
     background-color: #D9D9D9;
     border-radius: 15px;
     margin: 8px 1px 1px 0px;
}
</style>