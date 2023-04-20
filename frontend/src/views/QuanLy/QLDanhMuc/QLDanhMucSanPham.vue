<template>
    <div class="container-fluid frameQLDanhMuc">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
            </div>
            <div class="col-md-10">
                <QLHeader :maNV="localNhanVien.NV_Ma" />
                <div class="row bottomHeader">
                    <div class="col-md-12" style="color:#515151">
                        <p class="lableName">DANH SÁCH DANH MỤC</p>
                    </div>
                </div>
                <div class="row timkiem" style="margin-left:2%">
                    <div class="col-md-7 input-group">
                        <div class="row">
                            <input type="text" class="form-control col-md-10 inputSearch" placeholder="Tìm theo tên"
                                v-model="nameToSearch"  @keyup.enter="searchName"/>
                                <button class="btn btn-sm btn-outline-secondary btnTimKiem" type="button" style="border:none"
                                    @click="searchName">
                                    <span class="fa fa-search" style="font-size:18px"></span>
                                </button>
                        </div>
                    </div>
                    <!-- danh sach trang hien thi -->
                    <div class="col-md-2">
                    </div>
                    <div class="col-md-3">
                        <button class=" btn btn-sm btn-outline-secondary btnThem" @click="gotoTaoDanhMuc">
                            <span class="fa fa-plus-circle"></span>
                            Tạo Danh Mục
                        </button>

                    </div>
                </div>
                <!-- <Danh sach danh muc san pham-->
                <div class="row dsDanhMuc">
                    <table>
                        <thead style="text-align:center">
                            <tr>
                                <th>STT</th>
                                <th :sortKey="DM_Ma" :hideSortIcons="true">Mã danh mục</th>
                                <th>Tên danh mục</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i ) in get_rows()" :key="i">
                                <td v-if="currentPage > 1">{{ i + ((currentPage - 1) * 9) }}</td>
                                <td v-else>{{ i }}</td>
                                <td>{{ row.DM_Ma }}</td>
                                <td>{{ row.DM_Ten }}</td>
                                <td class="tdChucNang nav-item dropdown" @click="setDanhmucActive(row.DM_Ma)">
                                    <a class="nav-link  fas fa-ellipsis-v" href="#" id="navbardrop"
                                        data-toggle="dropdown" style="color:#515151">
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item" href="#" @click="gotoSua"><span
                                                class="fas fa-edit"></span> Sửa</a>
                                        <a class="dropdown-item" href="#" @click="isOpenXacNhan = !isOpenXacNhan"><span
                                                class="fas fa-trash-alt" style="color:red"></span> Xóa</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- danh sach so trang hien thi -->
                <div class="row" style="width: 100%;" v-if="!isOpenChoosePage && danhmuc.length>9">
                    <div class="btnChonTrang">
                        <p style="display: inline-block; padding-top: 4px;text-align: right;">Trang &nbsp;</p>
                        <div class="numberPage">
                            <div class="dropup">
                                <button class="dropbtn">{{ currentPage }}
                                <span class="fas fa-chevron-up"></span></button>
                                <div class="dropup-content">
                                    <a class="dropdown-item" v-for="(i, j) in num_pages() " :key="j"
                                        v-bind:class="[i == currentPage ? 'active' : '']" v-on:click="change_page(i)"
                                        aria-controls="my-table"> {{ i }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ------------------------------Bang xac nhan xoa danh muc ----------------------------- -->
    <div class="dialogXacNhan" v-if="isOpenXacNhan">
        <p style="color: #515151; text-align:center; margin-top: 50px; font-size: 18px;">
            <span class="fas fa-trash-alt" style="color:red"></span> Bạn chắc chắn muốn xóa?
        </p>
        <button class="btnYes btn btn-sm btn-outline-secondary"
            @click="deleteDanhMuc(), isOpenXacNhan = !isOpenXacNhan, isOpenThongBao = !isOpenThongBao">Xóa</button>
        <button class="btnNo btn btn-sm btn-outline-secondary" @click="isOpenXacNhan = !isOpenXacNhan">Hủy</button>
    </div>
    <div class="dialogThongBao" v-if="isOpenThongBao">
        <p style="color:#515151; text-align:center; margin-top: 50px; font-size: 18px;">
            <span v-if="message == 'Đã xóa danh mục đã chọn'" class="fas fa-check-circle"
                style="color:#00BA13; text-align: center;"></span>
            <span v-else class="fas fa-exclamation-circle" style="color:red; text-align: center;"></span>
            {{ message }}
        </p>
        <button class="btnOK btn btn-sm btn-outline-secondary" @click="isOpenThongBao = !isOpenThongBao">OK</button>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DanhMucService from '../../../services/danhmuc.service';
import SanPhamService from '../../../services/sanpham.service';

export default {
    name: `QLHomePage`,
    // props: ["nhanvien"],
    components: { DanhSachChucNang, QLHeader },
    data() {
        return {
            danhmuc: [],
            message: "",
            currentPage: 1,
            elementsPerPage: 9,
            ascending: false,
            danhmucActive: "",
            isOpenXacNhan: false,
            isOpenThongBao: false,
            localNhanVien: {},
            sanpham: [],
            nameToSearch: "",
            isOpenChoosePage: false,
        }

    },

    created() {
        this.localNhanVien.NV_Ma = this.$route.params.id;
    },
    methods: {
        // Lay danh sach danh muc
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

        //  so hang của danh sach danh muc
        get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.danhmuc.slice(start, end);
        },

        // So trang cua danh sach danh muc
        num_pages() {
            return Math.ceil(this.danhmuc.length / this.elementsPerPage);

        },
        
        async change_page(page) {
            this.currentPage = page;
        },
        
        async gotoTaoDanhMuc() {
            this.$router.push({ name: 'TaoDanhMuc', params: { id: this.localNhanVien.NV_Ma } });
        },


        // Set danh muc duoc chon
        async setDanhmucActive(danhmucActive) {
            console.log(danhmucActive);
            this.danhmucActive = danhmucActive;
        },

        //Xoa danh muc duoc chon
        async deleteDanhMuc() {
            let check = 0;
            const [error, response] = await this.handle(
                SanPhamService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.sanpham = response.data;
            }
            this.sanpham.forEach(element => {
                if (element.DMSP_Ma == this.danhmucActive) {
                    this.message = "Không thể xóa danh mục đã chọn";
                    check = 1;
                }
            });

            if (check == 0) {
                const [errors, responses] = await this.handle(
                    DanhMucService.delete(this.danhmucActive)
                );
                if (errors) {
                    console.log(errors);
                } else {
                    this.refreshList();
                    console.log("xoa thanh cong" + responses);
                    this.message = "Đã xóa danh mục đã chọn"
                }
            }

        },

        // Tim danh muc theo ten

        async searchName(){
            console.log(this.nameToSearch)
            const [error, response] = await this.handle(
                    DanhMucService.findByName(this.nameToSearch)
                );
                if (error) {
                    console.log(error);
                } else {
                    if(response.data!=null){
                        this.danhmuc = response.data
                        console.log(response.data)
                    }
                }
        },

        async gotoSua() {
            this.$router.push({ name: 'SuaDanhMuc', params: { id: this.localNhanVien.NV_Ma, user: this.danhmucActive } })
        },

        //Tai lai danh sach danh
        async refreshList() {
            this.retrieveDanhMuc();
            this.danhmucActive = "";
        },
    },

    mounted() {
        this.retrieveDanhMuc();
    }
};
</script>

<style>
@import "../../../assets/QLDanhMucStyle.css";

.frameQLDanhMuc .dschucNang .navigationBar .dsChucNang .btnDanhMuc {
    background-color: #FFFFFF;
    color: #515151;
}
</style>