
<template>
    <div class="">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
        <div class="container frameDangky">
            <div class="row formDangky">
                <div class="col-md-4 leftForm" style="height:100%">
                    <div class="row">
                        <img src="../../../images/logoDanhNhap.png" class="img-fluid mx-auto d-block imgLogo" width="269px"
                            height="222px" alt="Logo" style="border-radius: 15px;">
                    </div>
                    <div class="row" style="margin-top:44.1%">
                        <img src="../../../images/ImageDangNhap.png" class="img-fluid imgHinh" width="464px" height="466px"
                            alt="Image" style="border-radius: 15px; position: relative; bottom: -34px;">
                    </div>
                </div>
    
                <div class="col-md-8 rightForm" style="height:98%;">
                    <div style="margin-top: 10%">
                        <h2 style="text-align:center" class="labelDangKy">ĐĂNG KÝ TÀI KHOẢN</h2>
                    </div>
                    <div class="row">
                        <Form @submit="handleRegister" :validation-schema="schema" v-slot="{ isSubmitting }">
                            <div class="form-group">
                                <label for="KH_Ten">Tên tài khoản</label>
                                <Field name="KH_Ten" type="text" class="form-control" placeholder="Nhập tên tài khoản"
                                    v-model="khachhang.KH_Ten" />
                                <ErrorMessage name="KH_Ten" class="error-feedback" />
    
                            </div>
                            <div class="form-group">
                                <label for="KH_SDT">Số điện thoại</label>
                                <Field name="KH_SDT" type="text" class="form-control" placeholder="Nhập số điện thoại "
                                    v-model="khachhang.KH_SDT" />
                                <ErrorMessage name="KH_SDT" class="error-feedback" />
    
                            </div>
    
    
                            <div class="form-group">
                                <label for="KH_MatKhau">Mật khẩu</label>
                                <div class="row" style="background-color: #F5F4F4; border-radius: 15px; margin: 0 0 0 0%;">
    
                                    <Field v-if="!isOpenPassword" name="KH_MatKhau" type="password" class="form-control col-md-10"
                                        placeholder="Nhập mật khẩu" v-model="khachhang.KH_MatKhau" />
    
                                    <Field v-if="khachhang.KH_MatKhau=='' && isOpenPassword" name="KH_MatKhau" type="text"
                                        class="form-control col-md-10" placeholder="Nhập mật khẩu" v-model="khachhang.KH_MatKhau" />
    
                                    <Field v-if="khachhang.KH_MatKhau!='' && isOpenPassword" name="KH_MatKhau" type="text"
                                        class="form-control col-md-10" placeholder="{{KH_MatKhau}}" v-model="khachhang.KH_MatKhau" />
    
                                    <span v-if="!isOpenPassword" class="btn far fa-eye btnHienMatKhau col-md-2"
                                        @click="isOpenPassword=!isOpenPassword"></span>
                                    <span v-else class="btn far fa-eye-slash btnAnMatKhau col-md-2"
                                        @click="isOpenPassword=!isOpenPassword"></span>
                                </div>
                                <ErrorMessage name="KH_MatKhau" class="error-feedback" />
                            </div>
    
                            <div class="form-group">
                                <label for="xacNhanMatKhau">Nhập lại mật khẩu</label>
                                <div class="row" style="background-color: #F5F4F4; border-radius: 15px; margin: 0 0 0 0;">
    
                                    <Field v-if="!isOpenconfirmPassword" name="xacNhanMatKhau" type="password"
                                        class="form-control col-md-10" placeholder="Nhập lại mật khẩu" v-model="confirmPassword" />
    
                                    <Field v-if="confirmPassword=='' && isOpenconfirmPassword" name="xacNhanMatKhau"
                                        type="text" class="form-control col-md-10" placeholder="Nhập lại mật khẩu" v-model="confirmPassword" />
    
                                    <Field v-if="confirmPassword!='' && isOpenconfirmPassword" name="xacNhanMatKhau"
                                        type="text" class="form-control col-md-10" placeholder="{{confirmPassword}}" v-model="confirmPassword" />
    
                                    <span v-if="!isOpenconfirmPassword" class="btn far fa-eye btnHienMatKhau col-md-2"
                                        @click="isOpenconfirmPassword=!isOpenconfirmPassword"></span>
                                    <span v-else class="btn far fa-eye-slash btnAnMatKhau col-md-2"
                                        @click="isOpenconfirmPassword=!isOpenconfirmPassword"></span>
                                </div>
                                <ErrorMessage name="xacNhanMatKhau" class="error-feedback" />
                            </div>
                            <p style="text-align:center; color:red">{{message}}</p>
                            <div class="form-group my-3 btn-login" style="margin-bottom:0%">
                                <button class="btn btn-sm btn-outline-secondary btn-block btnDangKy"
                                    :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <span>Đăng Ký</span>
                                </button>
                            </div>
                            <div class="textDangNhap" >
                                <p class="labelCoTaiKhoan">Bạn đã có tài khoản?<button @click="goToDangNhap" href="" class="btnDangNhap"> Đăng Nhập</button></p>
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
import GioHangService from '../../../services/giohang.service';
import KhachHangService from '../../../services/khachhang.service'
import { mapGetters } from "vuex";
export default {
    name: `QLDangNhap`,
    components: { Form, Field, ErrorMessage },
    data() {

        const schema = yup.object().shape({
            KH_Ten: yup
                .string()
                .required("Tên đăng nhập phải có giá trị"),
            KH_SDT: yup
                .string()
                .matches(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,'Số điện thoại không hợp lệ')
                .required("Số điện thoại phải có giá trị"),
                
            KH_MatKhau: yup
                .string()
                .required("Mật khẩu phải có giá trị")
                .min(8, "Mật khẩu tối thiểu 8 ký tự")
                .max(30, "Mật khẩu tối đa 30 ký tự"),
            xacNhanMatKhau: yup
                .string()
                .required("Nhập lại mật khẩu phải có giá trị")
        });

        return {
            loading: false,
            message: "",
            schema,
            isOpenPassword: false,
            isOpenconfirmPassword: false,
            khachhang: {},
            khachhangcheck: {},
            confirmPassword: "",
            giohang: {},
            maKH: "",
        };
    },
    computed: {
        ...mapGetters([
            "khachhangLoggedIn"
        ]),
    },
    mounted() {
        this.khachhang.KH_MatKhau = "";
        if (this.khachhangLoggedIn) {
            this.$router.push("/");
        }
    },

    methods: {
        async handleRegister(khachhang) {
            this.message = "";
            if(this.confirmPassword == khachhang.KH_MatKhau) { 
                this.successful = false;
                this.loading = true;

                const [error, data] = await this.handle(
                    this.$store.dispatch("register", khachhang)
                );
                if (error) {
                    this.message = error.response.data.message;
                    this.successful = false;
                    this.loading = false;
                }
                else {
                    this.message = data.message;
                    this.successful = true;
                    this.loading = false;
                    this.TaoGioHang();
                }
            }
            else {
                this.message = "Mật khẩu và mật khẩu nhập lại không trùng khớp"
            }

        },

        async TaoGioHang(){
            console.log(this.khachhang.KH_SDT);
            const [error, response] = await this.handle(
                    KhachHangService.findByName(this.khachhang.KH_SDT)
                );
            if(error){
                console.log("Khong tim thay");
            }
            else{
                console.log(response.data[0].id)
                this.giohang.KH_Ma = response.data[0].id;
                
                this.giohang.GH_TongSoLuong = "0";console.log(this.giohang);
                const [errors, responses] = await this.handle(
                    GioHangService.create(this.giohang)
                );
                if (errors) {
                    console.log("Khong the tao gio hang")
                }
                else {
                    console.log(responses.data);
                    this.khachhang.GH_Ma = responses.data.id;
                    const [errorss, responsess] = await this.handle(
                        KhachHangService.update(this.giohang.KH_Ma,this.khachhang)
                );
                if(errorss){
                    console.log("Loi roi");
                }
                else{
                    console.log(responsess.data);
                }
                }
            }

            
        },

        async goToDangNhap() {
            this.$router.push("/DangNhap");
        }
    },

}
</script>

<style>
@import "../../../assets/QLTaiKhoanStyle.css";

.textDangNhap {
    font-size:18px;
    font-weight: 500;
    color: #515151;
}

.btnDangNhap{
    border: none;
    font-size: 20px;
    font-weight: 600;
    color: #515151;
    background-color:unset;
}

.btnDangNhap:hover{
    border: none;
    color: black;
    background-color:unset;
}

</style>