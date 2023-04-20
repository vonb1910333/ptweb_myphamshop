<template>
  <div class="container-fluid header">
    <header class="align-items-center">
      <div class="row  justify-content-between align-items-center">
        <div class="col-md-1 logo-image pl-0 pr-0">
          <img class="img-fluid" src="../../images/Logo.png">
        </div>
        <div class="col-sm-11">
          <div class="row search">
            <div class="col-sm-10 pt-2 pb-1 pl-1">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Tìm kiếm" v-model="nameToSearch"
                  style="font-size: 18px;" />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="searchName"
                    style="border: none; font-size: 18px;">
                    <span class="fa fa-search" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-2 align-items-center pt-0 pl-0 pr-0">
              <div v-if="currentUser" class="justify-content-end align-items-center headerKhachHang">
                <router-link to="/profile" class="nav-link" style="color: #756262; display: inline;text-align: right;">
                  {{ currentUser.KH_Ten }}
                  <div class="nav-item dropdown justify-content-center" style="display:inline; ">
                    <button class="btn btnTaiKhoan btn-default"><span class="fas fa-user-circle iconTaiKhoan"></span>
                      <a class="nav-link " href="#" id="navbardrop">
                        <div class="dropdown-menu right">
                          <a class="dropdown-item" href="#" @click="goToQLDangNhap">Đăng xuất</a>
                          <a class="dropdown-item" href="#" @click="goToDoiMatKHau">Đổi mật khẩu</a>
                        </div>
                      </a>
                    </button>
                  </div>


                  


                </router-link>
                
                <router-link :to="{ name: 'GioHang' }" class="btn btnGioHang">
                  <span class="fas fa-shopping-cart iconGioHang">
                  </span>
                  <button class="soluongsanpham">{{giohang.GH_TongSoLuong}}</button>
                </router-link>
              </div>
              <div v-if="!currentUser" class="align-items-center headerKhachHang">
                <router-link to="./DangKy">
                  <button class="btn btn-secondary pl-1 pr-1 btnDangKy">Đăng ký</button>
                </router-link>
                <div class="nav-item dropdown justify-content-center" style="display:inline; ">
                  <button class="btn btnTaiKhoan btn-default"><span class="fas fa-user-circle iconTaiKhoan"></span>
                    <a class="nav-link " href="#" id="navbardrop">
                      <div class="dropdown-menu right">
                        <a class="dropdown-item" href="#" @click="goToQLDangNhap">Đăng xuất</a>
                        <a class="dropdown-item" href="#" @click="goToDoiMatKHau">Đổi mật khẩu</a>
                      </div>
                    </a>
                  </button>
                </div>

                <router-link :to="{ name: 'GioHang' }" class="btn btnGioHang">
                  <span class="fas fa-shopping-cart iconGioHang">
                  </span>
                  <button class="soluongsanpham">{{giohang.GH_TongSoLuong}}</button>
                </router-link>
              </div>
            </div>
          </div>
          <div class="row pt-1">
            <div class="col-12"><img src="../../images/Cosmetic.png" class="img-fluid"></div>
          </div>
        </div>
      </div>

    </header>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    name: `Header`,
    props:["giohang"],
    data(){
      return{
  
      }
    },
    computed: {
          ...mapGetters({
               currentUser: "loggedInKhachHang",
          }),
     },
     methods: {
          ...mapMutations([
               "initCustomerState"
          ]),

     },
     mounted(){
          this.initCustomerState();
     }
}
</script>
<style>
.header {
  margin-top: 1%;
  margin-left: 2%;
  margin-right: 2%;
}

.header .search {
  text-align: center;
  background-color: #E9E8E8;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 1%;
}

.header .btnDangKy {
  border: none;
  color: white;
  background-color: #929292;
  border-radius: 5px;
  font-size: 18px;
  margin-top: -5%;

}

.header .btnGioHang {
  border: none;
  background-color: none;
  color: #929292;
  margin-top: -5%;
}

.header .btnGioHang:hover {
  border: none;
  color: #929292;
}

.header .iconGioHang {
  border: none;
  background-color: none;
  font-size: 32px;
  color: #929292;
}

.header .iconGioHang:hover {
  border: none;
  background-color: none;
  color: #515151;
}

.header .btnTaiKhoan {
  background-color: #E9E8E8;
  border: none;
   margin-top: 3%;
   color: #929292;
  /* position: relative;
  top:-40% */
}

.header .iconTaiKhoan{
  font-size: 38px;
  color: #929292;
}
.header .navbar-expand-lg {
  color: #515151;
  font-size: 20px;

}

.headerKhachHang .nav-item {
  color: #515151;
  font-size: 20px;
}

.headerKhachHang .soluongsanpham {
  position: absolute;
  top: 40%;
  left: 65%;
  font-size: 17px;
  border-radius: 50%;
  border: 0.1px solid #929292;
  background-color:  #929292;
  height: 30px;
  width: 30px;
  color: #FFFFFF;
}

.header .nav-link .dropdown-menu {
  background-color: #FFFFFF;
  width: max-content;
  border-radius: 0px 0px 10px 10px;
  display: none;
  text-align: left;
}

.header .nav-item .nav-link:hover .dropdown-menu {
  position: absolute;
  background-color: #FFFFFF;
  top: calc(97%);
  transform: translateX(-70%);
  left: 10%;
  width: max-content;
  border-radius: 0px 0px 10px 10px;
  display: block;
  text-align: left;
}
</style>