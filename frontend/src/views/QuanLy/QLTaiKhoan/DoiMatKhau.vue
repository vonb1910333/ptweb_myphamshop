<template>
    <div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
        <div class="container frameDoiMatKhau">
            <div class="row formDoiMatKhau">
                <div class="col-md-4 leftForm">
                    <div class="row">
                        <img src="../../../images/logoDanhNhap.png" class="img-fluid  mx-auto d-block" width="269px"
                            height="222px" alt="Logo" style="border-radius: 15px;">
                    </div>
                    <div class="row" style="margin-top:41%">
                        <img src="../../../images/ImageDangNhap.png" class="img-fluid" width="464px" height="466px"
                            alt="Image" style="border-radius: 15px; position: relative; bottom: -40px;">
                    </div>
                </div>
    
                <div class="col-md-8 rightForm" style="height:98%;">
                    <div style="margin-top: 7%">
                        <h2 style="text-align:center">ĐỔI MẬT KHẨU</h2>
                    </div>
                    <div class="row">
                        <Form @submit="handleLogin" :validation-schema="schema" v-slot="{ isSubmitting }" >
                            <div class="form-group">
                                <label for="username">Tên đăng nhập</label>
                                <Field name="username" type="text" class="form-control" placeholder="{{maNhanVien}}"
                                    v-model="maNhanVien" :disabled="true" />
                                <ErrorMessage name="username" class="error-feedback" style="color:red; font-size: 17px;" />
    
                            </div>
                            <!-- ----------------------------------------------NHAP MAT KHAU CU---------------------------------------------------------- -->
                            <div class="form-group" style="margin-top:6%">
                                <label for="currentPassword">Mật khẩu cũ</label>
                                <div class="row"
                                    style="background-color: #F5F4F4; border-radius: 15px; margin: 0 0 0 0.1%;">
                                    <Field v-if="!isOpenCurrentPassword" name="currentPassword" type="password"
                                        class="form-control col-md-10" placeholder="Nhập mật khẩu hiện tại" v-model="nhanvien.NV_MatKhau" />
    
                                    <Field v-if="nhanvien.NV_MatKhau == '' & isOpenCurrentPassword" name="password"
                                        type="text" class="form-control col-md-10" placeholder="Nhập mật khẩu hiện tại" v-model="nhanvien.NV_MatKhau" />
    
                                    <Field v-if="nhanvien.NV_MatKhau != '' & isOpenCurrentPassword" name="currentPassword"
                                        type="text" class="form-control col-md-10" placeholder="{{nhanvien.NV_MatKhau}}" v-model="nhanvien.NV_MatKhau" />
    
                                    <span v-if="!isOpenCurrentPassword" class="btn far fa-eye btnHienMatKhau col-md-2"
                                        @click="isOpenCurrentPassword = !isOpenCurrentPassword"></span>
                                    <span v-else class="btn far fa-eye-slash  btnAnMatKhau col-md-2"
                                        @click="isOpenCurrentPassword = !isOpenCurrentPassword"></span>
                                </div>
                                <ErrorMessage name="currentPassword" class="error-feedback"/>
                            </div>
                            <p v-if="message" style="display: inline; color: red; float:right">
                                {{ message }}
                            </p>
                            <!-- ------------------------------------------NHAP MAT KHAU MOI------------------------------------------------------------ -->
                            <div class="form-group" style="margin-top:6%">
                                <label for="newPassword">Mật khẩu mới</label>
                                <div class="row"
                                    style="background-color: #F5F4F4; border-radius: 15px; margin: 0 0 0 0.1%;">
                                    <Field v-if="!isOpenNewPassword" name="newPassword" type="password" class="form-control col-md-10"
                                        placeholder="Nhập mật khẩu mới" v-model="newPassword" />
                                    <Field v-if="newPassword == '' & isOpenNewPassword" name="password" type="text"
                                        class="form-control col-md-10" placeholder="Nhập mật khẩu mới" v-model="newPassword" />
    
                                    <Field v-if="newPassword != '' & isOpenNewPassword" name="newPassword" type="text"
                                        class="form-control col-md-10" placeholder="{{newPassword}}" v-model="newPassword" />
    
                                    <span v-if="!isOpenNewPassword" class="btn far fa-eye btnHienMatKhau col-md-2"
                                        @click="isOpenNewPassword = !isOpenNewPassword"></span>
                                    <span v-else class="btn  far fa-eye-slash btnAnMatKhau col-md-2"
                                        @click="isOpenNewPassword = !isOpenNewPassword"></span>
                                </div>
                                <ErrorMessage name="newPassword" class="error-feedback" />
                            </div>
                            <!-- ------------------------------------NHAP XAC THUC MAT KHAU MOI------------------------------------------------ -->
                            <div class="form-group" style="margin-top:5%">
                                <label for="confirmPassword">Xác nhận mật khẩu mới</label>
                                <div class="row"
                                    style="background-color: #F5F4F4; border-radius: 15px; margin: 0 0 0 0.1%;">
                                    <Field v-if="!isOpenConfirmPassword" name="confirmPassword" type="password"
                                        class="form-control col-md-10" placeholder="Nhập lại mật khẩu mới" v-model="confirmPassword" />
    
                                    <Field v-if="confirmPassword == '' & isOpenConfirmPassword" name="password" type="text"
                                        class="form-control col-md-10" placeholder="Nhập lại mật khẩu mới" v-model="confirmPassword" />
    
                                    <Field v-if="confirmPassword != '' & isOpenConfirmPassword" name="confirmPassword"
                                        type="text" class="form-control col-md-10" placeholder="{{confirmPassword}}" v-model="confirmPassword" />
    
                                    <span v-if="!isOpenConfirmPassword" class="btn far fa-eye btnHienMatKhau col-md-2"
                                        @click="isOpenConfirmPassword = !isOpenConfirmPassword"></span>
                                    <span v-else class="btn far fa-eye-slash btnAnMatKhau col-md-2"
                                        @click="isOpenConfirmPassword = !isOpenConfirmPassword"></span>
                                </div>
                                <ErrorMessage name="confirmPassword" class="error-feedback"/>
                            </div>
                            <p v-if="message2" style="display: inline; color: red; float:right">
                                {{ message2 }}
                            </p>
    
                            <div class="form-group my-3" style="padding-top: 6%;">
                                <button class="btn btn-sm btn-outline-secondary btn-block btnDangNhap"
                                    :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <span>Đổi Mật Khẩu</span>
                                </button>
                                <button class="btn btn-sm btn-outline-secondary btn-block btnTroVe" @click="goToQL">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <span>Trở Về</span>
                                </button>
                            </div>
                        </Form>
    
                    </div>
                </div>
    
            </div>
        </div>

    </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import NhanVienService from "../../../services/nhanvien.service"
export default {
    name: `QLDangNhap`,

    components: { Form, Field, ErrorMessage },

    created() {
        this.maNhanVien = this.$route.params.id;
    },

    data() {

        const schema = yup.object().shape({
            username: yup.string().required("Tên đăng nhập phải có giá trị"),

            currentPassword: yup
                .string()
                .required("Mật khẩu hiện tại phải có giá trị")
                .min(8, "Mật khẩu có ít nhất 8 ký tự")
                .max(30, "Mật khẩu có nhiều nhất 30 ký tự"),

            newPassword: yup
                .string()
                .required("Mật khẩu mới phải có giá trị.")
                .min(8, "Mật khẩu có ít nhất 8 ký tự")
                .max(30, "Mật khẩu có nhiều nhất 30 ký tự"),
            confirmPassword: yup
                .string()
                .required("Mật khẩu xác thực phải có giá trị")
                .min(8, "Mật khẩu có ít nhất 8 ký tự")
                .max(30, "Mật khẩu có nhiều nhất 30 ký tự"),
        });

        return {
            loading: false,
            message: "",
            message2: "",
            schema,
            isOpenCurrentPassword: false,
            isOpenNewPassword: false,
            isOpenConfirmPassword: false,
            nhanvien: {},
            nhanviencheck: {},
            newPassword: "",
            confirmPassword: "",
            maNhanVien: this.maNV,
        };
    },

    methods: {
        async handleLogin() {
            console.log(this.nhanvien.NV_Ma)
            const [error, response] = await this.handle(
                NhanVienService.getByID(this.maNhanVien)
            );
            if (error) {
                console.log(error);
                this.message = "Không tìm thấy tài khoản"
            } else {
                console.log(response.data);
                this.nhanviencheck = response.data;
                this.nhanviencheck.NV_MatKhau =  this.newPassword;
                this.checkAccount();
            }
        },

        async checkAccount() {
            console.log(this.nhanviencheck.NV_MatKhau)
            if (this.newPassword == this.confirmPassword) {
                this.nhanviencheck.curentPass  = this.nhanvien.NV_MatKhau;
                console.log(this.nhanviencheck.currentPass)
                const [error, response] = await this.handle(
                    NhanVienService.update(this.nhanviencheck.NV_Ma, this.nhanviencheck)
                );
                if (response.data == 'Sai mat khau') {
                    this.message = "Mật khẩu sai";
                    this.message2 = ""
                }
                else if (error) {
                    console.log(error);
                    this.message = "Không tìm thấy tài khoản"
                } else {
                    console.log(response.data);
                    this.nhanviencheck = response.data;
                    this.message2 = "Mật khẩu mới của bạn đã được đổi thành công!!!"
                    this.$router.push({ name: 'QLDonHang', params: { id: this.maNhanVien } })
                }
            }
            else {

                this.message2 = "Mật khẩu mới và mật khẩu xác thực không trùng  khớp";
                this.message = ""
            }

        
    },

    async goToQuenMatKhau() {
        this.$router.push("/QLQuenMatKhau");
    },

    async goToQL() {
        this.$router.push({ name: 'QLThongKe', params: { id: this.maNhanVien } });
    }
},
mounted() {
    this.nhanvien.NV_MatKhau = "";
}
}
</script>

<style>
@import "../../../assets/QLTaiKhoanStyle.css";
.frameDoiMatKhau .formDoiMatKhau .rightForm Form {
    width: 70%;
    margin: 5% 0% 0% 15%;
    background-color: none;
}
</style>