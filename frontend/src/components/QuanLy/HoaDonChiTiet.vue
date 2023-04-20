<template>
    <div>
        <div class="row container-fluid hoadonchitiet">
            <div class="col-md-12">

                <h4 style="text-align:center; margin: 30px 0px 30px 0px;"> CHI TIẾT HÓA ĐƠN </h4>
                <div class="row">
                    <table class="bangTT">
                        <tr>
                            <td>Số HD: {{ hoadon.id }}</td>
                            <td>Ngày lập: {{ ngaylap + "   " +  hoadon.HD_ThoiGianLap}}</td>
                        </tr>
                        <tr>
                            <td>Khách hàng: {{ khachhang.KH_Ten }}</td>
                            <td>Mã DH: {{ hoadon.id }}</td>

                        </tr>
                        <tr>
                            <td>SDT: {{ khachhang.KH_SDT }} </td>
                            <td>Nhân viên: {{ nhanvien.NV_Ho + nhanvien.NV_Ten }} </td>
                        </tr>
                        <tr>
                            <td>Địa chỉ giao hàng: {{ donhang.DH_DiaChiGiaoHang }}</td>
                        </tr>
                    </table>
                </div>
                <div class="row"></div>
                <div class="row">
                    <table class="bangCTHD table-bordered">
                        <thead>
                            <tr style="width:100%">
                                <th>STT</th>
                                <th style="text-align:left">Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i) in chitietdonhang" :key="i" style="width:100%">
                                <td>{{ i + 1 }}</td>
                                <td style="text-align:left">{{ tenSP[i] }} </td>                             
                                <td>{{ formatMoney(row.CTDH_Gia)}}</td> 
                                 <td>{{ row.CTDH_SoLuong }}</td>
                                <td>{{ formatMoney(row.CTDH_SoLuong * row.CTDH_Gia) }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="col-md-12" style="text-align: right; margin-bottom: 15px;">
                        <h6 class="thanhtien">Thành tiền:
                            {{ formatMoney(hoadon.HD_TongTien) }}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SanPhamService from '../../services/sanpham.service';
import moment from 'moment';

export default {
    name: `HoaDonChiTiet`,
    props: ["khachhang", "nhanvien", "hoadon", "donhang", "chitietdonhang"],
    data() {
        return {
            tenSP:[],
            ngaylap: ""
        }
    },

    created() {
        let i = 0;
        this.chitietdonhang.forEach(element => {
            this.findSanPham(element.SP_Ma, i);
            i++;
        });
        this.formatDate();
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

        async formatDate(){
            this.ngaylap = moment(String(this.hoadon.HD_NgayLap)).format("MM/DD/YYYY");
        },

        formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
    }

}

</script>


<style>
@import "../../assets/QLDonHangStyle.css";

.hoadonchitiet .bangTT {
    background-color: #FFFFFF;
}

.hoadonchitiet .bangCTHD {
    border-radius: 15px;
    border-bottom: 1px solid #BABABA;
    border-top: none;
}

.hoadonchitiet .bangCTHD th,
.hoadonchitiet .bangCTHD td{
    text-align: center;
}

.hoadonchitiet .thanhtien{
    font-size: 18px;
    font-family: Inter;
    margin-top: 10px;
    text-align: right;
    margin-bottom: 10px;
    color: black;
}
</style>