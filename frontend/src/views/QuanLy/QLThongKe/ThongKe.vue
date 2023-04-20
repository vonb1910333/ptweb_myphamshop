<template>
     <div>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
          <div class="container-fluid frameQLThongKe">
               <div class="row list">
                    <div class="col-md-2 dschucNang">
                         <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
                    </div>
                    <div class="col-md-10">
                         <QLHeader :maNV="localNhanVien.NV_Ma" />
                         <div class="row content">
                              <div class="col-md-12">
                                   <!-- Hang dau -->
                                   <div class="row rowContent">
                                        <!-- Thong ke don hang -->
                                        <div class="col-md-3 donhang">
                                             <div class="row">
                                                  <div class="col-md-3 icon">
                                                       <span class="fa fa-receipt"></span>
                                                  </div>
                                                  <div class="col-md-6 tongso">
                                                       <p class="number">{{ donhang.length }}</p>
                                                       <p class="name"> Đơn Hàng</p>
                                                  </div>
                                                  <div class="col-md-3 themmoi">
                                                       <p class="labelSoLuongMoi">
                                                            <span class="borderstyle">+{{ trangthaidonhang.moi.soluong }}
                                                            </span>
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>
                                        <div class="col-md-1"></div>
                                        <!-- Thong ke tai khoan khach hang -->
                                        <div class="col-md-3 khachhang">
                                             <div class="row">
                                                  <div class="col-md-3 icon">
                                                       <span class="fas fa-user-check"></span>
                                                  </div>
                                                  <div class="col-md-9 tongso">
                                                       <p class="number">{{ khachhang.length }}</p>
                                                       <p class="name">Tài Khoản</p>
                                                  </div>
                                             </div>
                                        </div>
                                        <div class="col-md-1"></div>
                                        <!-- Thong ke doanh thu -->
                                        <div class="col-md-4 doanhthu">
                                             <div class="row">
                                                  <div class="col-md-3 icon">
                                                       <span class="fa fa-dollar-sign"></span>
                                                  </div>
                                                  <div class="col-md-9 tongso">
     
                                                       <p class="name"> Doanh Thu</p>
                                                       <p class="number">{{ formatMoney(tongdoanhthu) }}đ</p>
     
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
     
                                   <div class="row rowContent" style=" margin-bottom: 2px;">
                                        <div class="col-md-7 bieuDoDoanhThu">
                                             <!-- <div class="row">
                                                  <td class="tdChucNang nav-item dropdown">
                                                       <a class="nav-link " href="#" id="navbardrop" data-toggle="dropdown"
                                                            style="color:#515151">
                                                            {{ year }}
                                                            <span class="fas fa-angle-down"></span>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                 <a class="dropdown-item icon" href="#"
                                                                      @click="setYear('2022')">
                                                                      2022</a>
                                                                 <a class="dropdown-item icon" href="#"
                                                                      @click="setYear('2023')">
                                                                      2023</a>
                                                                 <a class="dropdown-item icon" href="#"
                                                                      @click="setYear('2024')">
                                                                      2024</a>
                                                            </div>
                                                       </a>
                                                  </td> 
                                             </div> -->
                                             <!-- <div class="row" style="width:100%;"> -->
                                                  <Line :chart-options="chartOptions" :chart-data="chartData"
                                                       :chart-id="chartId" :dataset-id-key="datasetIdKey" :plugins="plugins"
                                                       :css-classes="cssClasses" :styles="styles" :width="690"
                                                       :height="500" ref="line" id="linechart"/>
                                             <!-- </div> -->
                                        </div>
                                        <div class="col-md-1"></div>
                                        <div class="col-md-4 sanPhamBanChay" @scroll="handleScroll">
                                             <div class="row">
                                                  <p class="labelSPBanChay col-md-12">Sản Phẩm Bán Chạy</p>
                                             </div>
                                             <table class="row">
                                                  <tbody clas="col-md-12">
                                                       <tr v-for="(sanpham, i) in sanphambanchay" :key="i"
                                                            class="row sanpham" @click="goToCTSP(sanpham)">
                                                            <td class="col-md-4 khungAnhSanPham">
                                                                 <img :src="require(`@/images/${sanpham.SP_HinhAnh}`)"
                                                                      class="img-fluid">
                                                            </td>
                                                            <td class="col-md-8 thongTinSP">
                                                                 <div class="row">
                                                                      <p class="col-md-6 tenTH">{{ sanpham.TH_Ten }}</p>
                                                                      <p class="col-md-6 giaban">
                                                                           {{ formatMoney(sanpham.SP_GiaBanRa) }}đ</p>
                                                                 </div>
                                                                 <div class="row">
                                                                      <p class=" col-md-12 tenSP">{{ sanpham.SP_TenSanPham }}
                                                                      </p>
                                                                 </div>
                                                                 <div class="row">
                                                                      <div class="col-md-12">
                                                                           <span class="fas fa-star danhgia"
                                                                                v-for="(sao, i) in sanpham.SP_DanhGia"
                                                                                :key="i"></span>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  </tbody>
                                             </table>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          
     </div>
</template>

<script >
import moment from 'moment';
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DonHangService from '../../../services/donhang.service';
import KhachHangService from '../../../services/khachhang.service';
import SanPhamService from '../../../services/sanpham.service';
import CTDHService from '../../../services/chitietdonhang.service';
import ThuongHieuService from '../../../services/thuonghieu.service';
import { Line } from "vue-chartjs"
import { Chart, registerables } from "chart.js";

Chart.register(...registerables)

export default {
     
     name: `ThongKe`,
     components: { DanhSachChucNang, QLHeader, Line },
     // extends: Bar,
     
     props: {
          chartId: {
               type: String,
               default: 'bar-chart'
          },
          datasetIdKey: {
               type: String,
               default: 'label',
               color: "yellow"
          },
          cssClasses: {
               default: '',
               type: String
          },
          styles: {
               type: Object,
               default: () => { }
          },
          plugins: {
               type: Object,
               default: () => { }
          }
     },
     data() {

          return {
               year: "2022",
               localNhanVien: {},
               donhang: [],
               khachhang: [],
               tongdoanhthu: 0,
               doanhthu: "",
               sanpham: [],
               sanphambanchay: [],
               chitietdonhang: [],
               thuonghieu: [],
               trangthaidonhang: {
                    "moi": {
                         name: "Mới",
                         soluong: 0,
                    },

                    "xacnhan": {
                         name: "Đã xác nhận",
                         soluong: 0,
                    },

                    "vanchuyen": {
                         name: "Đã vận chuyển",
                         soluong: 0,
                    },

                    "nhanhang": {
                         name: "Đã nhận hàng",
                         soluong: 0,
                    },

                    "huy": {
                         name: "Đã hủy",
                         soluong: 0,
                    },
               },

               thang: [
                    {
                         name: '01',
                         doanhthu: 0
                    },

                    {
                         name: '02',
                         doanhthu: 0
                    },

                    {
                         name: '03',
                         doanhthu: 0
                    },

                    {
                         name: '04',
                         doanhthu: 0
                    },

                    {
                         name: '05',
                         doanhthu: 0
                    },

                    {
                         name: '06',
                         doanhthu: 0
                    },

                    {
                         name: '07',
                         doanhthu: 0
                    },

                    {
                         name: '08',
                         doanhthu: 0
                    },

                    {
                         name: '09',
                         doanhthu: 0
                    },

                    {
                         name: '10',
                         doanhthu: 0
                    },

                    {
                         name: '11',
                         doanhthu: 0
                    },

                    {
                         name: '12',
                         doanhthu: 0
                    },
               ],
               chartData: {
                    labels: [],
                    datasets: [{
                         label: "Doanh Thu",
                         data: [],
                         backgroundColor: "rgb(227, 227, 227)",
                         borderColor: "#858282",
                         pointBackgroundColor: "#515151",
                         color: "Chart.defaults.color"
                    }]
               },
               chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                         display: true,
                         text: "Doanh Thu"
                    }
               },
          }

     },


     created() {
          this.localNhanVien.NV_Ma = this.$route.params.id;
     },

     methods: {
          async getDonHang() {
               const [error, response] = await this.handle(
                    DonHangService.getAll()
               );
               if (error) {
                    console.log(error);
               } else {
                    this.donhang = response.data;
                    this.donhang.forEach(element => {
                         if (element.DH_TrangThai == this.trangthaidonhang.moi.name) {
                              this.trangthaidonhang.moi.soluong++;
                         }
                         if (element.DH_TrangThai == this.trangthaidonhang.xacnhan.name) {
                              this.trangthaidonhang.xacnhan.soluong++;
                         }
                         if (element.DH_TrangThai == this.trangthaidonhang.vanchuyen.name) {
                              this.trangthaidonhang.vanchuyen.soluong++;
                         }
                         if (element.DH_TrangThai == this.trangthaidonhang.nhanhang.name) {
                              this.trangthaidonhang.nhanhang.soluong++;
                         }
                         if (element.DH_TrangThai == this.trangthaidonhang.huy.name) {
                              this.trangthaidonhang.huy.soluong++;
                         }
                    });
                    this.doanhthutheothang();
               }
          },

          // async setYear(year) {
          //      this.year = year;
               
          //      this.tongdoanhthu = 0;
          //      this.doanhthutheothang.forEach(element => {
          //           element.doanhthu = 0;
          //      });
          //      this.chartData.update();
          //      this.doanhthutheothang();
          //      this.$refs.line.updateChart()
          // },

          async doanhthutheothang() {
               this.donhang.forEach(element => {
                    if (element.DH_TrangThai == this.trangthaidonhang.nhanhang.name) {
                         this.tongdoanhthu = this.tongdoanhthu + element.DH_TongTien;
                         if (element.DH_NgayDat) {
                              element.DH_Thang = moment(String(element.DH_NgayDat)).format("MM / DD / YYYY hh: mm").substring(0, 2);
                              // element.DH_Nam = moment(String(element.DH_NgayDat)).format("MM / DD / YYYY hh: mm").substring(10, 14);
                              // if (element.DH_Nam == this.year) {
                                   this.thang.forEach(t => {
                                        if (t.name == element.DH_Thang) {
                                             t.doanhthu = t.doanhthu + element.DH_TongTien;
                                        }
                                   });
                              // }
                         }
                    }

               });
               let i = 0;
               
               this.thang.forEach(element => {
                    this.chartData.labels[i] = element.name;
                    // this.chartData.datasets[0].data[i] = 0;
                    this.chartData.datasets[0].data[i] = element.doanhthu;
                    i++;
               });

          },
          
          formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },

          async retrieveKhachHang() {
               const [error, response] = await this.handle(
                    KhachHangService.getAll()
               );
               if (error) {
                    console.log(error);
               } else {

                    this.khachhang = response.data;
               }
          },

          async retrieveThuongHieu() {
               const [error, response] = await this.handle(
                    ThuongHieuService.getAll()
               );
               if (error) {
                    console.log(error);
               } else {
                    this.thuonghieu = response.data;
                    this.retrieveSanPham();
               }
          },

          async retrieveSanPham() {
               const [error, response] = await this.handle(
                    SanPhamService.getAll()
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    this.sanPhamBanChay();
               }
          },

          async retrieveCTDH() {
               const [error, response] = await this.handle(
                    CTDHService.getAll()
               );
               if (error) {
                    console.log(error);
               } else {
                    this.chitietdonhang = response.data;
               }
          },

          async sanPhamBanChay() {
               console.log("fcsa");
               this.sanpham.forEach(sp => {
                    sp.SP_SoLuongBan = 0;
                    console.log("vrfegr")
                    this.chitietdonhang.forEach(ctdh => {
                         if (sp.SP_Ma == ctdh.SP_Ma) {
                              sp.SP_SoLuongBan += ctdh.CTDH_SoLuong;
                         }
                    });
               });
               this.sanpham.sort((x, y) => (x["SP_SoLuongBan"] > y["SP_SoLuongBan"] ? -1 : 1)); console.log(this.sanpham);
               let i = 0;
               for (i; i < 5; i++) {
                    this.sanphambanchay[i] = this.sanpham[i];
                    this.thuonghieu.forEach(element => {
                         console.log(element)
                         if (this.sanphambanchay[i].TH_Ma == element.TH_Ma) {
                              this.sanphambanchay[i].TH_Ten = element.TH_Ten;
                         }
                    });
                    this.sanphambanchay[i].SP_DanhGia = 5;
               }
               this.sanphambanchay[2].SP_DanhGia = 4;
          },

          async goToCTSP(data) {
               this.$router.push({ name: 'QLDonHang', params: { id: this.nhanviencheck.NV_Ma, sp: data.SP_Ma } });
          }
     },
     mounted() {
          this.getDonHang();
          this.retrieveKhachHang();
          this.retrieveCTDH();
          this.retrieveThuongHieu();
          // const chartInstance = this.$refs.line.chart;
     },

}
</script>

<style>
@import '../../../assets/QLThongKeStyle.css';
</style>