<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="container-fluid frameQLSuaDanhMuc">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
            </div>
            <div class="col-md-10">
                <QLHeader :maNV="localNhanVien.NV_Ma" />
                <div class="row bottomHeader">
                    <div class="col-md-12 font-weight-bold" style="color:#515151; font-size: 25px;">
                        <p class="lableName">CẬP NHẬP THÔNG TIN DANH MỤC</p>
                    </div>
                </div>
                <div class="row timkiem" style="margin-left:2%">
                    <div class="col-md-7 input-group">
                        <div class="row" style="margin-left:2px">
                            <input type="text" class="form-control col-md-10 inputSearch" placeholder="Tìm theo tên"
                                @click="goToQLDanhMuc" v-model="nameToSearch" @keyup.enter="searchName" />
                            <button class="btn btn-sm btn-outline-secondary btnTimKiem" type="button"
                                style="border:none" @click="searchName">
                                <span class="fa fa-search" style="font-size:18px"></span>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-md-3 col-sm-11">
                        <button class=" btn btn-sm btn-outline-secondary btnXem font-weight-bold"
                            @click="goToQLDanhMuc">
                            <span class="fa fa-list-ol" style="font-size:20px"></span>
                            Xem danh sách
                        </button>
                    </div>

                </div>
                <hr style="color:#515151">
                <div class="row frameSua">
                    <div class="col-md-2 col-sm-0"></div>
                    <div class="col-md-8 col-sm-12">
                        <DanhMucFromSua :newdanhmuc="newdanhmuc" @suaDanhMuc-submit="updateDanhMuc"
                            :message1="message1" />
                    </div>
                    <div class="col-md-2 col-sm-0"></div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DanhMucService from '../../../services/danhmuc.service';
import DanhMucFromSua from '../../../components/QuanLy/DanhMucFormSua.vue';
export default {
    name: `QLHomePage`,
    // props: ["nhanvien"],
    components: { DanhSachChucNang, QLHeader, DanhMucFromSua },
    data() {

        return {
            isOpen: false,
            newdanhmuc: {},
            message1: "",
            localNhanVien: {},
        }

    },

    created() {
        this.localNhanVien.NV_Ma = this.$route.params.id;

        console.log("1")
    },

    methods: {
        async updateDanhMuc(data) {
            this.message1 = "";
            const [error, response] = await this.handle(
                DanhMucService.update(data.DM_Ma, data)
            );
            if (error) {
                console.log(error);
                this.message1 = "Cập nhật không thành công";
            } else {
                console.log(response.data);
                this.message1 = "Cập nhật thành công";
            }
        },

        async findDanhMuc(data) {
            console.log("2")
            const [error, response] = await this.handle(
                DanhMucService.get(data)
            );
            if (error) {
                console.log(error);
            } else {
                this.newdanhmuc.DM_Ma = response.data.DM_Ma;
                this.newdanhmuc.DM_Ten = response.data.DM_Ten;
                console.log(response.data);
            }
        },

        async goToQLDanhMuc() {
            this.$router.push({ name: 'QLDanhMucSanPham', params: { id: this.localNhanVien.NV_Ma } });
        }
    },
    mounted() {
        this.findDanhMuc(this.$route.params.user)
        console.log("5")
    }
};
</script>

<style>
@import '../../../assets/QLDanhMucStyle.css';

.frameQLDanhMuc .dschucNang .navigationBar .dsChucNang .btnDanhMuc {
    background-color: #FFFFFF;
    color: #515151;
}
</style>