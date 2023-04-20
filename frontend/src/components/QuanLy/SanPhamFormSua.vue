<template>
    <Form @submit="$emit('suaSanPham-submit', sanphamLocal)" :validation-schema="schema" enctype="multipart/form-data">
        <div class="functionName">
            <span class="fa fa-plus-circle"> </span>
            <p style="display:inline"> Cập nhật thông tin sản phẩm </p>
        </div>
        <div class="row container-fluid">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="ma">Mã sản phẩm</label>
                    <Field name="ma" type="name" class="form-control" v-model="sanphamLocal.SP_Ma"
                        placeholder="Nhập mã sản phẩm" :disabled="true" />
                    <ErrorMessage name="ma" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="ID_Catalog">Mã danh mục sản phẩm</label><br>
                    <Field v-if="!chonDanhMuc" name="ID_Catalog" type="name" class="form-control"
                        v-model="sanphamLocal.DM_Ten" @click="chonDanhMuc = true" />
                    <Field v-if="chonDanhMuc" name="ID_Catalog" type="name" class="form-control"
                        v-model="sanphamLocal.DMSP_Ma">
                        <select v-model="danhmucActive" @click="setMaDanhMuc()" class="selectBox">
                            <option disabled="true">Danh mục</option>
                            <option v-for="(dm, i) in danhmuc" :key="i">{{ dm.DM_Ten }}</option>
                        </select>

                    </Field>
                    <ErrorMessage name="ID_Catalog" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="ID_Branch">Thương hiệu</label>
                    <Field v-if="!chonThuongHieu" name="ID_Branch" type="name" class="form-control"
                        v-model="sanphamLocal.TH_Ten" @click="chonThuongHieu = true" />
                    <Field v-if="chonThuongHieu" name="ID_Branch" type="name" class="form-control"
                        v-model="sanphamLocal.TH_Ma">
                        <select v-model="thuonghieuActive" @click="setMathuongHieu()" class="selectBox">
                            <option disabled="true">Thương Hiệu</option>
                            <option v-for="(data, i) in thuonghieu" :key="i">{{ data.TH_Ten }}</option>
                        </select>
                    </Field>
                    <ErrorMessage name="ID_Branch" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="name">Tên sản phẩm</label>
                    <Field name="name" class="form-control" v-model="sanphamLocal.SP_TenSanPham"
                        placeholder="Nhập tên sản phẩm" />
                    <ErrorMessage name="name" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="information">Thông tin</label>
                    <Field name="information" class="form-control" v-model="sanphamLocal.SP_ThongTin"
                        placeholder="Thông tin sản phẩm" as="textarea" style="height: 100px;"/>
                    <ErrorMessage name="information" class="error-feedback" />
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group">
                    <label for="quality">Số lượng nhập</label>
                    <Field name="quality" class="form-control" v-model="sanphamLocal.SP_SoLuong"
                        placeholder="Nhập số lượng sản phẩm nhập vào" />
                    <ErrorMessage name="quality" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="purchase_price">Giá mua vào</label>
                    <Field name="purchase_price" class="form-control" v-model="sanphamLocal.SP_GiaMuaVao"
                        placeholder="Nhập giá mua sản phẩm " />
                    <ErrorMessage name="purchase_price" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="saleprice">Giá bán ra</label>
                    <Field name="saleprice" class="form-control" v-model="sanphamLocal.SP_GiaBanRa"
                        placeholder="Giá bán sản phẩm" />
                    <ErrorMessage name="saleprice" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="image">Hình ảnh &nbsp; &nbsp;</label>
                    <Field name="image" class="form-control " v-model="sanphamLocal.SP_HinhAnh"
                                @click="chonHinhAnh = true" >
                                <input type="file" ref="file" name="image" @change="selectFile" accept="image/*"
                                    class="" v-bind:aria-disabled="true">
                            </Field>
                    <div class="row" >
                        <div class="col-md-5">
                            <img v-if="url == ''" :src=getURL() class="img-fluid">
                            <img v-if="url!=''" :src="url" class="img-fluid">
                        </div>
                        <div class="col-md-7">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <span v-if="message2 == 'Cập nhật thành công'" class="fas fa-check-circle"
                style="color:#00BA13; text-align: center; margin-left: 44%;"></span>
            <span v-if="message2 == 'Cập nhật không thành công'" class="fas fa-times-circle"
                style="color:red; text-align: center;  margin-left: 42%;"></span>
            <p v-if="message2 == 'Cập nhật thành công'" class="textMessage2" style="color:#00BA13">{{ message2 }}</p>
            <p v-else class="textMessage2">{{ message2 }}</p><br>
            <p v-if="message2 == 'Cập nhật không thành công'" class="textMessage1" style="margin-left: 4%;">{{ message1 }}
            </p>
            <button class="btn btn-outline-secondary btnLuu">Lưu</button>
        </div>
    </form>

</template>
 
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
// import ImageService from '../../services/image'

export default {
    name: "SanPhamFormSua",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["suaSanPham-submit", "author-delete"],
    props: ["sanpham", "message1", "message2", "danhmuc", "thuonghieu"],
    data() {

        const schema = yup.object().shape({
            ma: yup
                .string()
                .required("Mã sản phẩm phải có giá trị.")
                .min(10, "Mã sản phẩm phải gồm 10 ký tự.")
                .max(10, "Mã sản phẩm  phải gồm 10 ký tự."),
            ID_Catalog: yup
                .string()
                .required("Mã danh mục phải có giá trị."),
            ID_Branch: yup
                .string()
                .required("Thương hiệu phải có giá trị"),
            name: yup
                .string()
                .required("Tên sản phẩm phải được nhập"),
            information: yup
                .string()
                .required("Thông tin sản phẩm phải có giá trị"),
            quality: yup
                .number()
                .typeError("Số lượng sản phẩm phải là số nguyên")
                .required("Số lượng phải có giá trị"),
            purchase_price: yup
                .number()
                .typeError("Giá mua sản phẩm phải là kiểu số")
                .required("Giá mua vào phải có giá trị"),
            saleprice: yup
                .number()
                .typeError("Giá bán sản phẩm phải là kiểu số"),

        });
        return {
            sanphamLocal: this.sanpham,
            schema,
            danhmucActive: "",
            thuonghieuActive: "",
            fileImage: {},
            chonDanhMuc: false,
            chonThuongHieu: false,
            chonHinhAnh: false,
            nameImge: "",
            url: "",
        };
    },
    methods: {

        goToQLDanhMuc() {
            this.$router.push("/QLDanhMuc");
        },

        async selectFile(event) {
            this.fileImage = event.target.files[0];
            this.sanphamLocal.SP_HinhAnh = "image_" + this.fileImage.name;
            console.log(this.fileImage.name);
            this.sanphamLocal.Image = this.fileImage;
            this.url = URL.createObjectURL(this.fileImage);
        },

        async setMaDanhMuc() {
            this.danhmuc.forEach(element => {
                if (element.DM_Ten == this.danhmucActive) {
                    this.sanphamLocal.DMSP_Ma = element.DM_Ma;
                }
            });
        },

        async setMathuongHieu() {
            this.thuonghieu.forEach(element => {
                if (element.TH_Ten == this.thuonghieuActive) {
                    console.log(this.thuonghieuActive)
                    this.sanphamLocal.TH_Ma = element.TH_Ma;
                }
            });
        },

        getURL() {
            return this.sanpham.SP_HinhAnh;
        }

    },


};
</script>
 
<style>
@import '../../assets/QLSanPhamStyle.css'
</style>