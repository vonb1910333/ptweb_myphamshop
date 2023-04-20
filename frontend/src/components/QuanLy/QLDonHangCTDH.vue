<template v-if="isOpen">
    <div class="chitietDonHang container-fluid" style="text-align:center">
        <div class="row" style="margin-top:15px"></div>
        <div clas="col-md-12">
            <h4 style="text-align:center">CHI TIẾT ĐƠN HÀNG #{{ activeDonHang.id }}</h4>
        </div>
        <div class="row">
            <table class="bangTT">
                <tr>
                    <td>Ngày đặt: {{ activeDonHang.DH_NgayDat }}</td>
                    <td>Trạng thái: {{ activeDonHang.DH_TrangThai }}</td>
                </tr>
                <tr>
                    <td>Khách hàng: {{ khachhang.KH_Ten }}</td>
                    <td>Nhân viên: {{ nhanvien.NV_Ho + nhanvien.NV_Ten }}</td>
                </tr>
                <tr>
                    <td>SDT: {{ khachhang.KH_SDT }}</td>
                    <td>Số HD: {{ activeDonHang.HD_SoHD }}</td>
                </tr>
                <tr>
                    <td>Địa chỉ: {{ activeDonHang.DH_DiaChiGiaoHang }} </td>
                    <td>Ghi chú: {{ activeDonHang.DH_GhiChu }}</td>
                </tr>
            </table>
        </div>
        <div class=row>
            <table class="bangCTDH">
                <thead>
                    <tr style="width:100%">
                        <th>STT</th>
                        <th style="text-align:left">Mã sản phẩm</th>
                        <th style="text-align:left">Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, i) in chitietdonhang" :key="i" style="width:100%">
                        <td>{{ i }}</td>
                        <td style="text-align:left">{{ row.SP_Ma }}</td>
                        <td style="text-align:left">{{ tenSP[i] }}</td>
                        <td>{{ row.CTDH_SoLuong }}</td>
                        <td>{{ formatMoney(row.CTDH_Gia) }}</td>
                        <td>{{ formatMoney(row.CTDH_SoLuong * row.CTDH_Gia) }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="col-md-12">
                <h6 class="thanhtien">Thành tiền:
                    {{ formatMoney(activeDonHang.DH_TongTien) }}</h6>
            </div>
        </div>
    </div>
</template>
<script>
import SanPhamService from '../../services/sanpham.service';
export default {
    name: `QLDonHangCTDH`,
    props: ["chitietdonhang", "activeDonHang", "khachhang", "nhanvien"],

    data() {
        return {
            tenSP: [],
        }
    },

    created() {
        let i = 0;
        this.chitietdonhang.forEach(element => {
            this.findSanPham(element.SP_Ma, i);
            i++;
        });
        console.log(this.tenSP)
    },
    methods: {
        async findSanPham(maSP, index) {
            const [error, response] = await this.handle(
                SanPhamService.getByID(maSP)
            );
            if (error) {
                console.log(error);
            } else {
                this.tenSP[index] = response.data.SP_TenSanPham;
            }
        },

        formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
    }

}


</script>

<style>
.chitietDonHang .dschucNang .navigationBar .dsChucNang .btnDonHang {
    background-color: #FFFFFF;
    color: #515151;
}

.chitietDonHang {
    width: 93.8%;
    background-color: #FFFFFF;
    border-radius: 15px;
    border-color: #BABABA;
    background-color: #F9F9F9;
    top: calc(28%);
    left: 50.1%;
    transform: translateX(-50%);
    border-radius: 16px;
    border: 1px solid #515151;
    display: block;
    color: #515151;
    margin-bottom: 20px;
    position: absolute;
}

.chitietDonHang .bangTT {
    background-color: #FFFFFF;
}

.chitietDonHang .bangCTDH {
    border-radius: 15px;
    border-bottom: 1px solid #BABABA;
}

.chitietDonHang .thanhtien{
    font-size: 18px;
    font-family: Inter;
    margin-top: 10px;
    text-align: right;
    margin-bottom: 10px;
    color: black;
}
.chitietDonHang .bangCTDH th,
.chitietDonHang .bangCTDH td{
    text-align: center;
}
</style>