<template>
     <div class="chitietNhanVien container" style="text-align:center">
          <div class="row" style="margin-top:15px"></div>
          <div clas="col-md-12">
               <h4 style="text-align:center">THÔNG TIN NHÂN VIÊN </h4>
          </div>
          <div class="row">
               <table class="bangTT">
                    <tr>
                         <td>Mã: {{ nhanvienActive.NV_Ma }}</td>

                         <td v-if="nhanvienActive.NV_LoaiNV=='1'"> <span class="fas fa-user-alt"></span> Quản lý</td>
                         <td v-else><span class="fas fa-user-alt"></span> Nhân viên</td>
                    </tr>
                    <tr>
                         <td>Họ và Tên: {{ nhanvienActive.NV_Ho + " "+ nhanvienActive.NV_Ten }}</td>
                         <td><span class="fas fa-phone-square-alt"></span> &nbsp;{{ nhanvienActive.NV_SDT }}</td>

                    </tr>
                    <tr>
                         <td>Số CMND/CCCD: {{ nhanvienActive.NV_CCCD }}</td>
                         <td><span class="fas fa-envelope"></span> &nbsp;{{nhanvienActive.NV_Email}}</td>
                    </tr>
                    <tr>
                         <td>Ngày Sinh: {{ nhanvienActive.NV_NgaySinh }} </td>
                         <td><span class="fas fa-map-marker-alt"></span> &nbsp; {{ nhanvienActive.NV_DiaChi }}</td>
                    </tr>
               </table>
          </div>
     </div>
</template>
<script>
export default {
     name: `NhanVienFormChiTiet`,
     props: ["nhanvienActive"],

     data() {
          return {

          }
     },

}
</script>
 
<style>
.chitietNhanVien {
     width: 99%;
     background-color: #FFFFFF;
     border-radius: 15px;
     border-color: #BABABA;
     position: absolute;
     background-color: #F9F9F9;
     top: calc(33%);
     left: 50%;
     transform: translateX(-50%);
     border-radius: 16px;
     border: 1px solid #515151;
     display: block;
     color: #515151;
     margin-bottom: 20px;
     font-family: Inter;
     font-size: 20px;
}

.chitietNhanVien .bangTT {
     background-color: #FFFFFF;
}

.chitietNhanVien table tr td {
     margin-top: 15px;
     font-size: 18px;
     font-family: Inter;
}
.chitietNhanVien table tr td  .fas{
     font-size: 22px;
}
</style>