<template>
    <Form @submit="$emit('themDanhMuc-submit', danhmucLocal)" :validation-schema="schema">
        <div class="functionName">
            <span class="fa fa-plus-circle"> </span>
            <p style="display:inline"> Thêm danh mục mới </p>
        </div>

        <div class="form-group">
            <label for="ma">Mã danh mục</label>
            <Field name="ma" type="name" class="form-control" v-model="danhmucLocal.DM_Ma" placeholder="Nhập mã danh mục" />
            <ErrorMessage name="ma" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="profile">Tên danh mục</label>
            <Field name="profile" class="form-control" v-model="danhmucLocal.DM_Ten" placeholder="Nhập tên danh mục" />
            <ErrorMessage name="profile" class="error-feedback" />
        </div>

        <div class="form-group">
            <span v-if="message2=='Thêm thành công'" class="fas fa-check-circle" style="color:#00BA13; text-align: center; margin-left: 32%;"></span>
            <span v-if="message2=='Thêm không thành công'" class="fas fa-times-circle" style="color:red; text-align: center;  margin-left: 30%;"></span>
            <p v-if="message2=='Thêm thành công'" class="textMessage2" style="color:#00BA13">{{message2}}</p>
            <p v-else class="textMessage2" >{{message2}}</p><br>
            <p v-if="message2=='Thêm không thành công'" class="textMessage1">{{message1}}</p>
            <button class="btn btn-outline-secondary btnLuu">Lưu</button>
        </div>



    </form>

</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    name: "ThemDanhForm",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["themDanhMuc-submit"],
    props: ["newdanhmuc", "message1", "message2"],
    data() {

        const schema = yup.object().shape({
            ma: yup
                .string()
                .required("Mã danh mục phải có giá trị.")
                .min(10, "Mã danh mục phải gồm 10 ký tự.")
                .max(10, "Mã danh mục phải gồm 10 ký tự."),
            profile: yup

                .string()
                .required("Tên danh mục phải được nhập")
        });
        return {
            danhmucLocal: this.newdanhmuc,
            schema,
        };
    },
    methods: {
        goToQLDanhMuc() {
            this.$router.push("/QLDanhMuc");
        }
    }
};
</script>

<style>
@import "../../assets/QLDanhMucStyle.css"
</style>