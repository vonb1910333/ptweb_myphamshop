<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="container-fluid frameQLThemSanPham">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
            </div>
            <div class="col-md-10">
                    <QLHeader :maNV="localNhanVien.NV_Ma" />
                <div class="row bottomHeader" style="width:96%; margin-left: 2%;">
                    <div class="col-md-12 font-weight-bold" style="color:#515151; font-size: 25px;">
                        <p class="lableName">THÊM SẢN PHẨM</p>
                    </div>
                </div>
                <div class="row timkiem">
                    <div class="col-md-5 col-sm-1 input-group">
                        <div class="row" style="margin-left:0.01%">
                            <input type="text" class="form-control col-md-10" placeholder="Tìm theo tên"
                                v-model="nameToSearch" @keyup.enter="searchName" @click="goToQLSanPham" />
                            <button class="btn btn-sm btn-outline-secondary btnTimKiem" type="button" 
                                @click="searchName" style="border:none">
                                <span class="fa fa-search" style="font-size:18px"></span>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-4"></div>
                    <div class="col-md-3 col-sm-11">
                        <button class=" btn btn-sm btn-outline-secondary btnXem font-weight-bold"
                            @click="goToQLSanPham">
                            <span class="fa fa-list-ol" style="font-size:20px"></span>
                            Xem danh sách
                        </button>
                    </div>

                </div>
                <div class="row frameThem">
                    <div class="col-md-12 col-sm-12">
                        <SanPhamThem :newsanpham="newsanpham" @themSanPham-submit="findSanPham" :danhmuc="danhmuc"
                            :thuonghieu="thuonghieu" :message1="message1" :message2="message2" />
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import SanPhamService from '../../../services/sanpham.service';
import DanhMucService from '../../../services/danhmuc.service';
import ThuongHieuService from '../../../services/thuonghieu.service';
import SanPhamThem from '../../../components/QuanLy/SanPhamFormThem.vue'
import ImageService from '../../../services/image';

export default {
    name: `QLSanPhamThem`,

    components: { DanhSachChucNang, QLHeader, SanPhamThem },

    data() {

        return {
            sanpham: [],
            isOpen: false,
            newsanpham: {},
            message1: "",
            message2: "",
            localNhanVien: {},
            danhmuc: [],
            thuonghieu: [],
            fileName: "",
        }

    },

    created() {
        this.localNhanVien.NV_Ma = this.$route.params.id;
    },

    computed: {
        "columns": function columns() {
            if (this.sanpham.length == 0) {
                return [];
            }
            return Object.keys(this.sanpham[0])
        }
    },

    methods: {
        async retrieveSanPham() {
            const [error, response] = await this.handle(
                SanPhamService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.sanpham = response.data;
                console.log(response.data);
            }
        },

        async createSanPham(data) {
            data.SP_HinhAnh = this.fileName;
            const [error, response] = await this.handle(
                SanPhamService.create(data)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.message2 = "Thêm thành công";
                console.log(response.data)
            }
        },

        async retrieveThuongHieu() {
            const [error, response] = await this.handle( ThuongHieuService.getAll() );
            if (error) {
                console.log(error);
            } else {
                this.thuonghieu = response.data;
                console.log(response.data);
            }
        },

        async findSanPham(data) {
            this.message1 = "";
            this.message2 = "";
            console.log(data);
            const [error, response] = await this.handle(
                SanPhamService.getByID(data.SP_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                if (response.data == "Khong tim thay") {
                    this.saveImge(data.Image);
                    this.createSanPham(data);
                }
                else {
                    this.message1 = "Mã đã tồn tại";
                    this.message2 = "Thêm không thành công"
                }
            }
        },
        async retrieveDanhMuc() {
            const [error, response] = await this.handle(
                DanhMucService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.danhmuc = response.data;
                console.log(response.data);
            }
        },

        async saveImge(data) {
            const formData = new FormData();
            formData.append("image", data);
            const response = await ImageService.create(formData);
            this.fileName = response.data.filename;
            console.log(response.data)

        },

        async goToQLSanPham() {
            this.$router.push({ name: 'QLsanpham', params: { id: this.localNhanVien.NV_Ma } });
        }
    },

    mounted() {
        this.retrieveSanPham();
        this.retrieveDanhMuc();
        this.retrieveThuongHieu();
    }
};
</script>

<style>
@import '../../../assets/QLSanPhamStyle.css';
</style>