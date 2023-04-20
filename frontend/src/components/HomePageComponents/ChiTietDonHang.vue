<template v-if="isOpen">
     <div class="chitietdonhang container-fluid" style="text-align:center">
          <div class="row" style="margin-top:15px"></div>
          <div clas="col-md-12">
               <h4 style="text-align:center">CHI TIẾT ĐƠN HÀNG #{{ activeDonHang.id }}</h4>
          </div>
          <div class="row">
               <table class="bangTT">
                    <tr>
                         <td>Ngày đặt: {{ activeDonHang.DH_Ngay }}</td>
                         <td>Trạng thái: {{ activeDonHang.DH_TrangThai }}</td>
                    </tr>
                    <tr>
                         <td>Khách hàng: {{ khachhang.KH_Ten }}</td>
                         <td>Nhân viên: {{ nhanvien.NV_Ma + nhanvien.NV_Ten }}</td>

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
                         <tr style="width:100%" class="row">
                              <th class="col-md-1 column"> <p class="title">STT</p></th>
                              <th style="text-align:left" class="col-md-1 column"><p class="textMaSP">Mã</p></th>
                              <th style="text-align:left" class="col-md-4 column"><p class="title">Tên sản phẩm</p></th>
                              <th class="col-md-2 column"><p class="title">Số lượng</p></th>
                              <th class="col-md-2 column"><p class="title">Giá</p></th>
                              <th class="col-md-2 column"><p class="title">Thành tiền</p></th>
                         </tr>
                    </thead>
                    <tbody>
                         <tr v-for="(row, i) in chitietdonhang" :key="i" style="width:100%" class="row">
                              <td class="col-md-1 column"><p class="text">{{ i }}</p></td>
                              <td style="text-align:left" class="col-md-1 column"><p class="text">{{ row.SP_Ma }}</p></td>
                              <td style="text-align:left" class=" col-md-4 column" > <p class="textTenSP">{{ row.SP_TenSanPham }}</p></td>
                              <td class="col-md-2 column"><p class="text">{{ row.CTDH_SoLuong }}</p></td>
                              <td class="col-md-2 column"><p class="text">{{ formatMoney(row.CTDH_Gia) }}đ</p></td>
                              <td class="col-md-2 column"><p class="text">{{ formatMoney(row.CTDH_SoLuong * row.CTDH_Gia) }}đ</p></td>
                         </tr>
                    </tbody>
               </table>
               <div class="col-md-12">
                    <h5 class="thanhtien">Thành tiền:
                         {{ formatMoney(activeDonHang.DH_TongTien) }}đ</h5>
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
               chitietdonhangNew: this.chitietdonhang,
          }
     },

     created() {

     },
     methods: {
          async findSanPham(ctdh, index) {
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctdh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.chitietdonhangNew[index].SP_TenSanPham = response.data.SP_TenSanPham
               }
          },

          formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },

          async findTenSP() {
               let i = 0;
               this.chitietdonhangNew.forEach(element => {
                    this.findSanPham(element, i);
                    i++;
               });
          }
     },

     mounted(){
          
     }


}


</script>
 
<style>
.chitietdonhang .dschucNang .navigationBar .dsChucNang .btnDonHang {
     background-color: #FFFFFF;
     color: #515151;
}

.chitietdonhang {
     width: 100%;
     background-color: #FFFFFF;
     border-radius: 15px;
     border-color: #BABABA;
     background-color: #F9F9F9;
     border-radius: 16px;
     border: 1px solid #515151;
     display: block;
     color: #515151;
     margin-bottom: 20px;

}

.chitietdonhang .bangTT {
     background-color: #FFFFFF;
     width: 90%;
     margin-left: 5%;
}

.chitietdonhang .bangTT td {
     text-align: left;
     font-family: Inter;
     font-size: 17px;
     padding-bottom: 1%;
}

.chitietdonhang .bangTT tr {
     margin-bottom: 3%;
}

.chitietdonhang .bangCTDH {
     border-radius: 15px;
     border-bottom: 1px solid #BABABA;
     width: 92%;
     margin-left: 4%;
     margin-top: 2%;
}

.chitietdonhang .bangCTDH th {
     font-family: Inter;
     font-size: 18px;
     font-weight: 500;
}

.chitietdonhang .bangCTDH th {
     font-family: Inter;
     font-size: 18px;
     font-weight: 500;
     background-color: #a2a2a2;
     padding-bottom: 1%;
     padding-top: 1%;
     color: #3e3e3e;
}


.chitietdonhang .bangCTDH td {
     font-family: Inter;
     font-size: 17px;
     font-weight: 400;
     padding-bottom: 1%;
     padding-top: 1%;
     color: #3e3e3e;
}

.chitietdonhang .thanhtien {
     font-family: Inter;
     margin-top: 2%;
     margin-right: 3%;
     text-align: right;
     margin-bottom: 2%;

     color: black;
}

.chitietdonhang .textMaSP{
     word-wrap: break-word;
     position: absolute;
     top: 50%;
     left: 48%;
     transform: translate(-45%, -50%);
     font-family: Inter;
     font-size: 17px;
}

.chitietdonhang .column {
     position: relative;
     /* margin-top: 1%; */
     /* margin-bottom: 1%; */
     width: max-content;
     
}
.chitietdonhang .text {
     word-wrap: break-word;
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-45%, -50%);
     font-family: Inter;
     font-size: 17px;
}
.chitietdonhang .textTenSP {
     word-wrap: break-word;
     /* position: absolute; */
     /* top: 50%; */
     /* left: 5%; */
     /* transform: translate(10%, -50%); */
     font-family: Inter;
     margin-left: 2%;
     margin-right: -22%;
     font-size: 17px;
}
.chitietdonhang .title{
     word-wrap: break-word;
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-45%, -50%);
     font-family: Inter;
     font-size: 18px;
     font-weight: 500;
}
</style>