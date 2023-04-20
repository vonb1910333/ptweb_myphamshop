<template>
    <div>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <div class="container-fluid frameQLThemNhanVien">
            <div class="row list">
                <div class="col-md-2 dschucNang">
                    <DanhSachChucNang :maNV="localNhanVien.NV_Ma"/>
                </div>
                <div class="col-md-10">
                        <QLHeader  :maNV="localNhanVien.NV_Ma" />
                    <div class="row bottomHeader">
                        <div class="col-md-12 font-weight-bold" style="color:#515151; font-size: 25px;">
                            <p class="lableName">THÊM NHÂN VIÊN</p>
                        </div>
                    </div>
                    <div class="row timkiem" >
                       <div class="col-md-7 input-group">
                           <div class="row" >
                               <input type="text" class="form-control col-md-10 inputSearch" placeholder="Tìm theo tên"
                                  v-model="nameToSearch" @keyup.enter="searchName" @click="goToQLNhanVien"/>                           
                                   <button class="btn btn-sm btn-outline-secondary btnTimKiem" type="button" style="border:none"
                                       @click="searchName">
                                       <span class="fa fa-search" style="font-size:18px"></span>
                                  </button>                           
                           </div>
                       </div>
                       <div class="col-lg-2 "></div>
                       <div class="col-lg-3 ">
                            <button class=" btn btn-sm btn-outline-secondary btnXem font-weight-bold" @click="goToQLNhanVien">
                                <span class="fa fa-list-ol" style="font-size:20px; "></span>
                                Xem danh sách
                            </button>
                        </div>
    
                    </div>                    
                    <div class="row frameThem">
                        <div class="col-md-12 col-sm-12">
                            <NhanVienFormThem :newnhanvien="newnhanvien" @themNhanVien-submit="findNhanVien"
                                :message1="message1" :message2="message2"/>
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
 import NhanVienFormThem from '../../../components/QuanLy/NhanVienFormThem.vue';
 import NhanVienService from '../../../services/nhanvien.service'
 export default {
     name: `QLHomePage`,
     components: { DanhSachChucNang, QLHeader, NhanVienFormThem },
     data() {
 
         return {
             nhanvien: [],
             isOpen: false,
             newnhanvien: {},
             message1: "",
             message2:"",
             check: 0,
             localNhanVien:{},
         }
 
     },
     created(){
         this.localNhanVien.NV_Ma = this.$route.params.id;
     },
     computed: {
         "columns": function columns() {
             if (this.nhanvien.length == 0) {
                 return [];
             }
             return Object.keys(this.nhanvien[0])
         }
     },
     methods: {
          async retrieveNhanVien() {
             const [error, response] = await this.handle(
                 NhanVienService.getAll()
             );
             if (error) {
                 console.log(error);
             } else {
                 this.nhanvien= response.data;
                 console.log(response.data);
             }
         },
 
         async createNhanVien(data) {
            if(data.NV_LoaiNV=="Quản lý"){
                data.NV_LoaiNV = 1;
            }
            else{
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
 
         async findNhanVien(data) {
             const [error, response] = await this.handle(
                 NhanVienService.getByID(data.NV_Ma)
             );
             if (error) {
                 console.log(error);
             } else {
                 if (response.data == "Khong tim thay") {
                     this.createNhanVien(data);
                     this.message1 = "";
                 }
                 else {
                     this.message1 = "Mã đã tồn tại";
                     this.message2 = "Thêm không thành công"
 
                 }
             }
         },
 
         async goToQLNhanVien(){
            this.$router.push({name: 'QLNhanVien', params: { id: this.localNhanVien.NV_Ma }});
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
 .frameQLNhanVien .frameThem{
     background-color: #D9D9D9;
     border-radius: 15px;
     margin: 8px 1px 1px 0px;
 }

 .timkiem .form-control{
    border-radius: 10px;
 }

 </style>