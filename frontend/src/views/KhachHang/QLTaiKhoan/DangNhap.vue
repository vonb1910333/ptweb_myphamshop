
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
                        <h2 class="labelDangNhap" style="text-align:center; font-weight: 600;">ĐĂNG NHẬP</h2>
                    </div>
                    <div class="row">
                        <Form @submit="handleLogin" :validation-schema="schema" v-slot="{ isSubmitting }">
                            <div class="form-group">
                                <label for="KH_SDT">Số điện thoại</label>
                                <Field name="KH_SDT" type="text" class="form-control"
                                    placeholder="Nhập số điện thoại đã đăng ký tài khoản" v-model="khachhang.KH_SDT" />
                                <ErrorMessage name="KH_SDT" class="error-feedback" />
    
                            </div>
    
                            <div class="form-group" style="margin-top:10%">
                                <label for="KH_MatKhau">Mật khẩu</label>
                                <div class="row" style="background-color: #F5F4F4; border-radius: 15px; margin: 0 0 0 0">
                                    <Field v-if="!isOpenPassword" name="KH_MatKhau" type="password" class="form-control col-md-10"
                                        placeholder="Nhập mật khẩu" v-model="khachhang.KH_MatKhau" />
                                    <Field v-if="khachhang.KH_MatKhau=='' & isOpenPassword" name="KH_MatKhau" type="text"
                                        class="form-control col-md-10" placeholder="Nhập mật khẩu" v-model="khachhang.KH_MatKhau" />
    
                                    <Field v-if="khachhang.KH_MatKhau!='' & isOpenPassword" name="KH_MatKhau" type="text"
                                        class="form-control col-md-10" placeholder="{{khachhang.KH_MatKhau}}" v-model="khachhang.KH_MatKhau" />
    
                                    <span v-if="!isOpenPassword" class="btn far fa-eye btnHienMatKhau col-md-2"
                                        @click="isOpenPassword=!isOpenPassword"></span>
                                    <span v-else class="btn far fa-eye-slash btnAnMatKhau col-md-2"
                                        @click="isOpenPassword=!isOpenPassword"></span>
                                </div>
                                <a href="#" @click="goToQuenMatKhau" class="quenMatKhau">Quên mật khẩu?</a>
                                <ErrorMessage name="KH_MatKhau" class="error-feedback" />
                            </div>
    
                            
                            <p v-if="message" style=" color: red; text-align: center; font-size: 17px; margin-top: 4%;">
                                {{ message }}
                            </p>
    
                            <div class="form-group my-3 btn-login">
                                <button class="btn btn-sm btn-outline-secondary btn-block btnDangNhap"
                                    :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <span>Đăng Nhập</span>
                                </button>
                            </div>
                            <div class="botton-register">
                                <p>Bạn chưa có tài khoản? <button class="btnDangKy" @click="goTodangKy">Đăng ký</button></p>
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
import { mapGetters } from "vuex";
export default {
    name: `QLDangNhap`,
    components: { Form, Field, ErrorMessage },
    data() {

        const schema = yup.object().shape({
            KH_SDT: yup.string().required("Số điện thoại phải có giá trị"),
            KH_MatKhau: yup.string().required("Mật khẩu phải có giá trị"),
        });

        return {
            loading: false,
            message: "",
            schema,
            isOpenPassword: false,
            khachhang: {},
        };
    },
    computed: {
        ...mapGetters([
            "khachhangLoggedIn"
        ]),
    },
    created() {
        if (this.khachhangLoggedIn) {
            this.$router.push("/DangNhap");
        }
    },
    methods: {
        async handleLogin(khachhang) {
            this.loading = true;

            const [error,data] = await this.handle(
                this.$store.dispatch("login", khachhang)
            );
            if (error) {
                console.log(error);
                this.loading = false;
                this.message = "Số điện thoại hoặc mật khẩu đăng nhập sai";
            } else {
                this.$router.push("/");
                console.log(data)
            }
        },

        async goToQuenMatKhau() {
            this.$router.push("/QLQuenMatKhau");
        },

        async goTodangKy(){
            this.$router.push("DangKy");
        }
    },
    mounted(){
        this.khachhang.KH_MatKhau="";
    }

}
</script>

<style>
@import "../../../assets/QLTaiKhoanStyle.css";
.btnDangKy{
    border: none;
    background-color: unset;
    color: #515151;
    font-family: Inter;
    font-size: 20px;
    font-weight: 600;
}
.btnGoToDangKy:hover{
    color: black;
}
</style>