<template>
    <div class="container frameQLThuongHieu">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang />
            </div>
            <div class="col-md-10">
                <div class="row topHeader">
                    <QLHeader />
                </div>
                <div class="row bottomHeader">
                    <div class="col-md-12">
                        <p>Danh sách danh mục</p>
                    </div>
                </div>
                <div class="row timkiem">
                    <div class="col-md-5 input-group">
                        <input type="text" class="form-control" placeholder="Tìm theo tên" v-model="nameToSearch" />
                        <div class="input-group-append">
                            <button class="btn btn-sm btn-outline-secondary" type="button" @click="searchName">
                                <span class="fa fa-search" style="font-size:18px"></span>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-5">
                    </div>
                    <div class="col-md-2">
                        <button class=" btn btn-sm btn-outline-secondary" @click="goToThemDanhMuc">
                            Thêm Danh Mục
                        </button>
                    </div>
                </div>
                <div class="row dsDanhMuc">
                    <table id="secondTable">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <!-- <th v-for="(col,i) in columns" :key="i">{{col}}</th> -->
                                <th>Mã</th>
                                <th>Tên</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row,i) in danhmuc" :key="i">
                                <td>{{i}}</td>
                                <!-- <td v-for="(col,i) in columns" :key="i">{{row[col]}}</td> -->
                                <td>{{row.DM_Ma}}</td>
                                <td>{{row.DM_Ten}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DanhMucService from '../../../services/danhmuc.service';
export default {
    name: `QLHomePage`,
    // props: ["nhanvien"],
    components: { DanhSachChucNang, QLHeader },
    data() {

        return {
            danhmuc: [],
        }

    },
    computed: {
        "columns": function columns() {
            if (this.danhmuc.length == 0) {
                return [];
            }
            return Object.keys(this.danhmuc[0])
        }
    },
    methods: {
        async retrieveDanhMuc() {

            const [error, response] = await this.handle(
                DanhMucService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.danhmuc = response.data;
                console.log(response.data);
            }

        },
    },
    mounted() {
        this.retrieveDanhMuc();
        // this.retrieveThuongHieu();
        // this.retrieveKhuyenMai();
    }
};
</script>

<style>
.frameQLThuongHieu .dschucNang .navigationBar .dsChucNang .btnThuongHieu{
    background-color: #FFFFFF;
    color: #515151;
    }
    .frameQLThuongHieu {
    background-color: #EAEAEA;
    border-radius: 30px;
    width: 100%;
}
.frameQLThuongHieu .dschucNang{
    background-color: #515151;
    border-radius: 30px;
}
.frameQLThuongHieu .bottomHeader {
    margin-bottom: 2px;
    text-align: center;
    font-size: 20px;
}

/* .dsDanhMuc{
    width: 100%;
} */
.frameQLThuongHieu table {
    font-family: 'Open Sans', sans-serif;
    width: 100%;
    /* border-collapse: collapse; */
    /* border: 3px solid #44475C; */
    margin: 10px 10px 0 10px;
    /* margin-top: 10px; */
    border-radius: 10px;
}

.frameQLThuongHieu  table th {
    text-align: left;
    color: #000000;
    padding: 8px;
    min-width: 30px;
}
.frameQLThuongHieu  table td {
    text-align: left;
    padding: 8px;
    color: #000000;
    font-size: 14px;
}
table tbody tr {
    background: #FFFFFF;
    border-radius: 7px;
    margin-top: 3px;
}

</style>