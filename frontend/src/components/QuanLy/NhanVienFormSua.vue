<template>
     <Form @submit="$emit('suaNhanVien-submit', nhanvienMoi)" :validation-schema="schema">
          <div class="functionName">
               <span class="fas fa-edit"> </span>
               <h3 style="display:inline"> Cập nhật thông tin nhân viên</h3>
          </div>
          <div class="row container-fluid content">
               <div class="col-md-6">
                    <div class="form-group">
                         <label for="maNV">Mã</label>
                         <Field name="maNV" type="name" class="form-control" v-model="nhanvienMoi.NV_Ma"
                              :disabled="true" />
                         <ErrorMessage name="maNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="hoNV">Họ nhân viên</label>
                         <Field name="hoNV" class="form-control" v-model="nhanvienMoi.NV_Ho" />
                         <ErrorMessage name="hoNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="tenNV">Tên</label>
                         <Field name="tenNV" class="form-control" v-model="nhanvienMoi.NV_Ten" />
                         <ErrorMessage name="tenNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="cccdNV">Số CMND/CCCD</label>
                         <Field name="cccdNV" class="form-control" v-model="nhanvienMoi.NV_CCCD" />
                         <ErrorMessage name="cccdNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="ngaysinhNV">Ngày sinh</label>
                         <Field name="ngaysinhNV" class="form-control" v-model="nhanvienMoi.NV_NgaySinh">
                              <datepicker :value="nhanvienMoi.NV_NgaySinh" v-model="nhanvienMoi.NV_NgaySinh">
                              </datepicker>
                         </Field>
                         <ErrorMessage name="ngaysinhNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="gioitinhNV">Giới tính: &nbsp;</label><br>
                         <Field name="gioitinhNV" class="form-control" placeholder="" v-model="nhanvienMoi.NV_GioiTinh">

                              <input v-if="nhanvienMoi.NV_GioiTinh" type="radio" id="one" value="true" v-model="nhanvienMoi.NV_GioiTinh"
                                   @click="setGioiTinh(true)" checked="true"/>
                              <input v-if="!nhanvienMoi.NV_GioiTinh" type="radio" id="one" value="true" v-model="nhanvienMoi.NV_GioiTinh"
                                   @click="setGioiTinh(true)" />
                              <label for="one">Nam &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

                              <input v-if="!nhanvienMoi.NV_GioiTinh" type="radio" id="two" value="false" v-model="nhanvienMoi.NV_GioiTinh"
                                   @click="setGioiTinh(false)" checked="true"/>
                              <input v-if="nhanvienMoi.NV_GioiTinh" type="radio" id="two" value="false" v-model="nhanvienMoi.NV_GioiTinh"
                                   @click="setGioiTinh(false)" />
                              <label for="two">Nữ</label>
                         </Field>
                         <ErrorMessage name="gioitinhNV" class="error-feedback" />
                    </div>
               </div>
               <div class="col-md-6">
                    <div class="form-group">
                         <label for="sdtNV">Số điện thoại</label>
                         <Field name="sdtNV" class="form-control" v-model="nhanvienMoi.NV_SDT" />
                         <ErrorMessage name="sdtNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="emailNV">Email</label>
                         <Field name="emailNV" class="form-control" v-model="nhanvienMoi.NV_Email" />
                         <ErrorMessage name="emailNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="diachiNV">Địa chỉ</label>
                         <Field name="diachiNV" class="form-control" v-model="nhanvienMoi.NV_DiaChi" />
                         <ErrorMessage name="diachiNV" class="error-feedback" />
                    </div>

                    <div class="form-group">
                         <label for="matkhauNV">Mật khẩu</label><br>
                         <div style="border: solid 0.1px #cecaca; border-radius: 5px;">
                              <Field name="matkhauNV" class="form-control" v-model="nhanvienMoi.password"
                                   type="password" style="width:95%; display: inline; border: none;" />
                         </div>
                         <ErrorMessage name="matkhauNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="loaiNV">Chức vụ &nbsp; </label><br>
                         <Field name="loaiNV" class="form-control" v-model="nhanvienMoi.NV_LoaiNV">
                              <select v-model="nhanvienMoi.NV_LoaiNV" class="selectBox">
                                   <option v-if="nhanvienMoi.NV_LoaiNV == '1'" :selected="true">Quản lý</option>
                                   <option v-else>Quản lý</option>
                                   <option v-if="nhanvienMoi.NV_LoaiNV == '2'" :selected="true">Nhân viên</option>
                                   <option v-else>Nhân viên</option>
                              </select>
                         </Field>
                         <ErrorMessage name="loaiNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="khoaTKNV">Tài khoản: &nbsp; </label><br>
                         <Field name="khoaTKNV" class="form-control" v-model="nhanvienMoi.NV_KhoaTaiKhoan">
                              <input v-if="!nhanvienMoi.NV_KhoaTaiKhoan" type="radio" id="one" value="false" name="khoaTKNV" v-model="nhanvienMoi.NV_KhoaTaiKhoan"
                                   @click="setKhoaTaiKhoan(false)" checked="true"/>
                              <input  v-if="nhanvienMoi.NV_KhoaTaiKhoan" type="radio" id="one" value="false" name="khoaTKNV" v-model="nhanvienMoi.NV_KhoaTaiKhoan"
                                   @click="setKhoaTaiKhoan(false)" />
                              <label for="one">Mở khóa &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

                              <input v-if="nhanvienMoi.NV_KhoaTaiKhoan" type="radio" id="two" value="true" name="khoaTKNV" v-model="nhanvienMoi.NV_KhoaTaiKhoan"
                                   @click="setKhoaTaiKhoan(true)" checked="true"/>
                              <input v-if="!nhanvienMoi.NV_KhoaTaiKhoan" type="radio" id="two" value="true" name="khoaTKNV"  v-model="nhanvienMoi.NV_KhoaTaiKhoan"
                                   @click="setKhoaTaiKhoan(true)" />
                              <label for="two">Khóa</label>
                         </Field>
                         <ErrorMessage name="khoaTKNV" class="error-feedback" />
                    </div>
               </div>
          </div>
          <div class="form-group">
               <span v-if="message1 == 'Cập nhật thành công'" class="fas fa-check-circle"
                    style="color:#00BA13; text-align: center; margin-left: 44%;"></span>
               <span v-if="message1 == 'Cập nhật không thành công'" class="fas fa-times-circle"
                    style="color:red; text-align: center;  margin-left: 41%;"></span>
               <p v-if="message1 == 'Cập nhật thành công'" class="textMessage2" style="color:#00BA13">&nbsp;{{ message1}}
               </p>
               <p v-else class="textMessage2"> &nbsp;{{ message1 }}</p><br>
               <p v-if="message1 == 'Cập nhật không thành công'" class="textMessage1" style="margin-left:4%">&nbsp; {{
                         message1
               }}</p>
               <button class="btn btn-outline-secondary btnCapNhat">Cập Nhật</button>
          </div>

     </form>
</template>
 
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
     name: "NhanVienFormThem",
     components: {
          Datepicker,
          Form, Field, ErrorMessage
     },
     emits: ["suaNhanVien-submit"],
     props: ["newnhanvien", "message1"],
     data() {

          const schema = yup.object().shape({
               maNV: yup
                    .string()
                    .required("Mã nhân viên phải có giá trị")
                    .min(10, "Mã nhân viên phải gồm 10 ký tự")
                    .max(10, "Mã nhân viên phải gồm 10 ký tự"),
               hoNV: yup
                    .string()
                    .required("Họ nhân viên phải có giá trị"),
               tenNV: yup
                    .string()
                    .required("Tên nhân viên phải có giá trị"),
               cccdNV: yup
                    .string()
                    .required("Số CMND/CCCD phải được nhập"),
               ngaysinhNV: yup
                    .date()
                    .required("Ngày sinh phải có giá trị"),
               sdtNV: yup
                    .string()
                    .required("SDT phải có giá trị")
                    .matches(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/, 'Số điện thoại không hợp lệ'),
               emailNV: yup
                    .string()
                    .matches(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/, "Email phải đúng định dạng")
                    .required("Email phải có giá trị"),
               diachiNV: yup
                    .string()
                    .required("Địa chỉ phải có giá trị"),
               matkhauNV: yup
                    .string()
                    .min(0, "Mật khẩu phải có ít nhất 8 ký tự"),
               // .required("Mật khẩu tài khoản phải có giá trị")
               loaiNV: yup
                    .string()
                    .required("Loại nhân viên phải được chọn"),
               gioitinhNV: yup
                    .boolean()
                    .required("Giới tính nhân viên được yêu cầu"),
               khoaTKNV: yup
                    .boolean()
                    .required("Trạng thái tài khoản nhân viên được yêu cầu"),
          });
          return {
               nhanvienMoi: this.newnhanvien,
               schema,
          };
     },
     methods: {
          async setGioiTinh(data) {
               this.nhanvienMoi.NV_GioiTinh = data;
               console.log(this.nhanvienMoi.NV_GioiTinh);
          },

          async setKhoaTaiKhoan(data) {
               this.nhanvienMoi.NV_KhoaTaiKhoan = data;
               console.log(this.nhanvienMoi.NV_KhoaTaiKhoan);
          },
     },

     created() {
          this.nhanvienMoi.password = "";
          console.log(this.newnhanvien.NV_GioiTinh);
     }

};
</script>
 
<style>
@import '../../assets/QLNhanVienStyle.css';
@import '../../assets/QuanLyStyle.css';

.content {
     margin-top: 2%;
}

select {
     width: 200px;
     height: 35px;
     border-color: #cecaca;
     background-color: #FFFFFF;
}
</style>