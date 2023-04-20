<template>
    <!-- Cot ben trai -->
    <div class="navigationBar container-fuild" >
        <div class="logo">
            <img src="../../images/LogoQL.png" class="img-fluid">
        </div>
        <div class="dsChucNang">
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnThongKe" @click="goToQLThongKe"><span
                    class="fa fa-line-chart " aria-hidden="true"> &nbsp;</span> Thống Kê</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnDonHang" @click="goToQLDonHang"><span
                    class="fa fa-receipt" aria-hidden="true"> &nbsp;&nbsp;</span> Đơn Hàng</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnSanPham" @click="goToQLSanPham"><span
                    class="fa fa-spray-can" aria-hidden="true"> &nbsp;</span> Sản Phẩm</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnNhanVien" @click="goToQLNhanVien" :disabled=disabledQLNV><span class="fa fa-users"
                    aria-hidden="true"> &nbsp;</span>Nhân Viên</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnThuongHieu" @click="goToQLThuongHieu" :disabled=true><span class="fa fa-tag"
                    aria-hidden="true"> &nbsp;</span>Thương Hiệu</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnDanhMuc" @click="goToQLDanhMuc"><span class="fa fa-shapes"
                    aria-hidden="true"> &nbsp;</span> Danh Mục</button>
        </div>
        <div class="null" ></div>
        <div class="moreInformation">
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnCaiDat" @click="goToCaiDat" ><span class="fa fa-cog"
                    aria-hidden="true"> &nbsp;</span> Cài Đặt</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnThongTin" @click="goToThongTin"
                style=" margin-right:10px"><span class="fa fa-info-circle" aria-hidden="true">
                    &nbsp;</span> Thông Tin</button>
        </div>
        <!-- Cot ben phai -->
    </div>
</template>
<script>
import NhanVienService from "../../services/nhanvien.service";
export default {
    name:  `DanhSachchucNang`,

    props: [
      "maNV", 
    ],
    data(){
        return {
            maNhanVien: this.maNV,
            localNhanVien: {},
            disabledQLNV:true,
        }
    },
    methods: {

        goToQLDanhMuc() {
            this.$router.push({name: 'QLDanhMucSanPham', params: { id: this.maNhanVien }});
        },
        goToQLSanPham() {
            this.$router.push({name: 'QLsanpham', params: { id: this.maNhanVien }});
        },
        goToQLThongKe() {
            this.$router.push({name: 'QLThongKe', params: { id: this.maNhanVien }});
        },
        goToQLDonHang() {
            this.$router.push({name: 'QLDonHang', params: { id: this.maNhanVien }});
        },
        goToQLKhuyenMai() {
            this.$router.push({name: 'QLDonHang', params: { id: this.maNhanVien }});
        },
        goToQLThuongHieu() {
            this.$router.push({name: 'QLthuonghieu', params: { id: this.maNhanVien }});
        },
        goToQLNhanVien() {
            this.$router.push({name: 'QLNhanVien', params: { id: this.maNhanVien }});
        },

        async PhanQuyenNhanVien(){
            const [error, response] = await this.handle(
                NhanVienService.getByID(this.maNhanVien)
            );
            if (error) {
                console.log(error);
            } else {
                this.localNhanVien = response.data;
                if(this.localNhanVien.NV_LoaiNV==1){
                    this.disabledQLNV = false;

                }
                else{
                    this.disabledQLNV = true;
                }
                console.log(this.disabledQLNV)
            }
        }
    },

    mounted(){
        this.PhanQuyenNhanVien();
    }
    
};
</script>

<style>
.navigationBar {
    background-color: #515151;
    font-family: Inter;
    height:100vmin;
    font-size: 18px;
    display: inline-block;
    margin-left: 0px;
    width:100%;
}
 .navigationBar .null{
    height: 19%;
 }
.dsChucNang {
    margin-top: 20px;
    display: inline-block;
    width: 100%;
    padding-right: 0px;
    padding-left: 0px;  
}
.dsChucNang .btn-outline-secondary,
.moreInformation .btn-outline-secondary {
    font-size: 18px;
    text-align: left;
    width: 100%;
    display: block;
    background-color: #515151;
    color: #FFFFFF;
    border: none;
    font-family: Inter;
    padding-left: 15px;
}

.dsChucNang .btn-outline-secondary:hover,
.moreInformation .btn-outline-secondary:hover {
    display: block;
    width: 100%;
    font-size: 18px;
    background-color: #FFFFFF;
    color: #515151;
    border: none;
}

.dsChucNang .fas,
.dsChucNang .fa,
.moreInformation .fas,
.moreInformation .fa {
    font-size: 20px;
}
</style>