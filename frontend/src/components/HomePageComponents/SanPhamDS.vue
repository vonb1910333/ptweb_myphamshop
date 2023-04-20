<template>
    <div class="list container-fuild">
        <div class="row sanpham-khung bg-light">
            <div v-for="product in this.sanphams" :key="product.SP_Ma" class="col-md-2">
                <SanPham :sanpham="product" />
            </div>
        </div>
    </div>
</template>
 
<script>
import SanPham from "../HomePageComponents/SanPham.vue";
// import SanPhamService from "../../services/sanpham.service"
// import ThuongHieuService from "../../services/thuonghieu.service"

export default {
    name: "SanPhamDS",
    props:["sanphams"],
    components: {
        SanPham,
    },
    data() {
        return {
            
            sohang: 0,
        };
    },
    methods: {

        // async retrieveSanPhams() {
        //     const [error, response] = await this.handle(
        //         SanPhamService.getAll()
        //     );
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         this.sanphams = response.data;
        //         let i = 0;
        //         this.sanphams.forEach(element => {
        //             this.findThuongHieu(element, i);
        //             i++;
        //         });
        //         console.log(this.sanphams)
        //     }
        // },


        // async findThuongHieu(sp, i) {
        //     const [error, response] = await this.handle(
        //         ThuongHieuService.get(sp.TH_Ma)
        //     );
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         this.sanphams[i].TH_Ten = response.data.TH_Ten;
        //     }
        // },
        // refreshList() {
        //     this.retrieveSanPhams();
        //     this.getSoHang();
        // },

        async getSoHang() {
            this.sohang = this.sanphams / 4;
        }


    },
    beforeUpdate() {
        // console.log(this.sanphams)
    },
};
</script>
 
<style>
.list {
    margin-top: 2px;
    margin-left: 1%;
    margin-right: -1%;

}

.list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: #76575727;
    border-color: #968080ab;
}

.list-group-item:hover {
    color: #fff;
    background-color: #76575727;
}

.btn:hover {
    color: #756262;
    background-color: #76575727;
    border-color: #968080ab;
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #968080ab;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(94, 74, 44, 0.315);
}

.sanpham-khung {
    background-color: #d0cfcf;
    font-size: 12px;
    margin-top: 5px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    width: 100%;
}
</style>