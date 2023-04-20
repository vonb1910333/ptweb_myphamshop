
<template>
    <div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
        <div class="container frameDangNhap">
            <div class="row formDangNhap">
                <div class="col-md-4 leftForm">
                    <div class="row">
                        <img src="../../../images/logoDanhNhap.png" class="img-fluid imgHinh mx-auto d-block" width="269px"
                            height="222px" alt="Logo" style="border-radius: 15px;">
                    </div>
                    <div class="row" style="margin-top:20%">
                        <img src="../../../images/ImageDangNhap.png" class="img-fluid imgLogo" width="464px" height="466px"
                            alt="Image" style="border-radius: 15px; position: relative; bottom: -40px;">
                    </div>
                </div>
    
                <div class="col-md-8 rightForm">
                    <div style="margin-top: 10%">
                        <h2 style="text-align:center" class="labelDangNhap">ĐĂNG NHẬP</h2>
                    </div>
                    <div class="row">
                        <Form @submit="findNhanVien()" :validation-schema="schema" v-slot="{ isSubmitting }">
                            <div class="form-group">
                                <label for="username">Tên đăng nhập</label>
                                <Field name="username" type="text" class="form-control" placeholder="Nhập tên đăng nhập"
                                    v-model="nhanvien.NV_Ma"/>
                                <ErrorMessage name="username" class="error-feedback"  />
    
                            </div>
    
                            <div class="form-group" style="margin-top:10%">
                                <label for="password">Mật khẩu</label>
                                <div class="row" style="background-color: #F5F4F4; border-radius: 15px; margin: 0 0 0 0.1%;">
                                    <Field v-if="!isOpenPassword" name="password" type="password" class="form-control col-md-10"
                                        placeholder="Nhập mật khẩu" v-model="nhanvien.NV_MatKhau" />
    
                                    <Field v-if="nhanvien.NV_MatKhau=='' & isOpenPassword" name="password" type="text"
                                        class="form-control col-md-10" placeholder="Nhập mật khẩu" v-model="nhanvien.NV_MatKhau" />
    
                                    <Field v-if="nhanvien.NV_MatKhau!='' & isOpenPassword" name="password" type="text"
                                        class="form-control col-md-10" placeholder="{{nhanvien.NV_MatKhau}}" v-model="nhanvien.NV_MatKhau" />
    
                                    <span v-if="!isOpenPassword" class="btn far fa-eye btnHienMatKhau col-md-2 btnMK"
                                        @click="isOpenPassword=!isOpenPassword"></span>
                                    <span v-if="isOpenPassword" class="btn far fa-eye-slash btnAnMatKhau col-md-2 btnMK"
                                        @click="isOpenPassword=!isOpenPassword"></span>
                                </div>
                                <a href="#" @click="goToQuenMatKhau" class="quenMatKhau">Quên mật khẩu?</a>
                                <ErrorMessage name="password" class="error-feedback" />
                            </div>
    
                            
                            <p v-if="message" style="display: inline; color: red; float:right">
                                {{ message }}
                            </p>
    
                            <div class="form-group my-3 btn-login">
                                <button class="btn btn-sm btn-outline-secondary btn-block btnDangNhap"
                                    :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <span>Đăng Nhập</span>
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
// import NhanVienService from "../../../services/nhanvien.service";
import { mapGetters } from "vuex";
import nhanvienService from '../../../services/nhanvien.service'

export default {
    name: `QLDangNhap`,
    components: { Form, Field, ErrorMessage },
    data() {

        const schema = yup.object().shape({
            username: yup.string().required("Tên đăng nhập phải có giá trị"),
            password: yup.string().required("Mật khẩu phải có giá trị"),
        });

        return {
            loading: false,
            message: "",
            schema,
            isOpenPassword: false,
            nhanvien: {},
            nhanviencheck: {},
            check: false,
        };
    },

    computed: {
        ...mapGetters([
            "nhanvienLoggedIn"
        ]),
    },

    created() {
        if (!this.nhanvienLoggedIn) {
            console.log(this.nhanvienLoggedIn)
            this.$router.push({ name: 'QLThongKe', params: { id: this.nhanviencheck.NV_Ma } });
        }
    },

    methods: {
        async handleLogin() {
            this.loading = true;
            const [error,data] = await this.handle(
                this.$store.dispatch("loginEmloyee", this.nhanvien)
            );
            if (error) {
                console.log(error);
                this.loading = false;
                this.message = "Tên đăng nhập hoặc mật khẩu đăng nhập sai";
            } else {
                console.log(data);
                    this.$router.push({ name: 'QLThongKe', params: { id: this.nhanvien.NV_Ma } });
                
            }
        },

        async findNhanVien(){
            const [error, response] = await this.handle(
                nhanvienService.getByID(this.nhanvien.NV_Ma)
            );
            console.log(response.data.NV_KhoaTaiKhoan)
            if (error) {
                console.log(error)
            } else {
                if(response.data.NV_KhoaTaiKhoan==true){
                    this.message = "Tài khoản đã bị vô hiệu hóa";
                }
                else{
                    this.handleLogin();
                }
            }
        },

        async goToQuenMatKhau() {
            this.$router.push("/QLQuenMatKhau");
        }
    },
    mounted() {
        this.nhanvien.NV_MatKhau = "";
    }
}
</script>

<style>
@import "../../../assets/QLTaiKhoanStyle.css"
</style>