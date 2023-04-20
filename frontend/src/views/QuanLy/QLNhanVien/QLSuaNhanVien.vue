<template>
    <div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <div class="container-fluid frameQLSuaNhanVien">
            <div class="row list">
                <div class="col-md-2 dschucNang">
                    <DanhSachChucNang :maNV="localNhanVien.NV_Ma"/>
                </div>
                <div class="col-md-10">
                        <QLHeader  :maNV="localNhanVien.NV_Ma" />
                    <div class="row bottomHeader">
                        <div class="col-md-12 font-weight-bold">
                            <p class="lableName">CẬP NHẬT THÔNG TIN NHÂN VIÊN</p>
                        </div>
                    </div>
                    <div class="row timkiem">
                        <div class="col-md-7 input-group">
                            <div class="row" >
                                <input type="text" class="form-control col-md-10" placeholder="Tìm theo tên"
                                   v-model="nameToSearch" @keyup.enter="searchName" @click="goToQLNhanVien" style="border-radius: 10px;"/>                           
                                    <button class="btn btn-sm btn-outline-secondary btnTimKiem" type="button" style="border:none"
                                        @click="searchName">
                                        <span class="fa fa-search" style="font-size:18px"></span>
                                   </button>                           
                            </div>
                        </div>
                        <div class="col-md-2" ></div>
                        <div class="col-md-3 col-sm-11 ">
                            <button class=" btn btn-sm btn-outline-secondary btnXem font-weight-bold" @click="goToQLNhanVien">
                                <span class="fa fa-list-ol" style="font-size:20px"></span>
                                Xem danh sách
                            </button>
                        </div>
    
                    </div>                    
                    <div class="row frameSua">
                        <div class="col-md-12 col-sm-12">
                            <NhanVienFormSua :newnhanvien="newnhanvien"  @suaNhanVien-submit="updateNhanVien"
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
import NhanVienFormSua from '../../../components/QuanLy/NhanVienFormSua.vue';
import NhanVienService from '../../../services/nhanvien.service';

export default {
    name: `QLHomePage`,
    components: { DanhSachChucNang, QLHeader, NhanVienFormSua },
    data() {

        return {
            nhanvien: [],
            isOpen: false,
            newnhanvien: {},
            message1: "",
            check: 0,
            localNhanVien:{},
        }

    },
    created(){
        this.localNhanVien.NV_Ma = this.$route.params.id;
        this.newnhanvien.NV_Ma = this.$route.params.user;
    },

    methods: {

        async updateNhanVien(data) {
            this.message1 = "";
            console.log(data.NV_LoaiNV+"jfeqbf")
           if(data.NV_LoaiNV=="Quản lý" ||data.NV_LoaiNV=="1"  ){
               data.NV_LoaiNV = 1;
           }
           else{
               data.NV_LoaiNV = 2;
           }
           if(data.password!=""){
            data.NV_MatKhau = data.password;
            console.log("mk"+data.NV_MatKhau)
            data.curentPass = "";
           }
           else{
            data.NV_MatKhau = "";
            data.curentPass = "";
           }
            const [error, response] = await this.handle(
               NhanVienService.update(data.NV_Ma, data)
            );
            if (error) {
                console.log(error);
                this.message1 = "Cập nhật không thành công";
            } else {
                console.log(response.data);
                this.message1 = "Cập nhật thành công";
            }
        },

        async findNhanVien(data) {
            const [error, response] = await this.handle(
                NhanVienService.getByID(data)
            );
            if (error) {
                console.log(error);
            } else {
                this.newnhanvien.NV_Ma = response.data.NV_Ma;
                this.newnhanvien.NV_CCCD = response.data.NV_CCCD;
                this.newnhanvien.NV_Ho = response.data.NV_Ho;
                this.newnhanvien.NV_Ten = response.data.NV_Ten;
                this.newnhanvien.NV_NgaySinh = response.data.NV_NgaySinh;
                this.newnhanvien.NV_SDT = response.data.NV_SDT;
                this.newnhanvien.NV_Email = response.data.NV_Email;
                this.newnhanvien.NV_DiaChi = response.data.NV_DiaChi;
                this.newnhanvien.NV_LoaiNV = response.data.NV_LoaiNV ;
                this.newnhanvien.NV_MatKhau = response.data.NV_MatKhau;
                this.newnhanvien.NV_GioiTinh = response.data.NV_GioiTinh;
                this.newnhanvien.NV_KhoaTaiKhoan = response.data.NV_KhoaTaiKhoan;
                console.log(this.newnhanvien)
            }
        },
        async findLocalNhanVien(data) {
            const [error, response] = await this.handle(
                NhanVienService.getByID(data)
            );
            if (error) {
                console.log(error);
            } else {
                this.localNhanVien = response.data;
                console.log(this.localNhanVien)
            }
        },
        async goToQLNhanVien(){
           this.$router.push({name: 'QLNhanVien', params: { id: this.localNhanVien.NV_Ma }});
        },
        async indata(data){
           console.log(data);
        }, 

    },
    mounted() {
        this.findNhanVien(this.newnhanvien.NV_Ma);
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
</style>