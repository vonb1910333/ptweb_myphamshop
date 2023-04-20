
<template>
  <div>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    <nav class="navbar navbar-expand-md navbar-light bg-white navbarrow">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
        aria-expanded="false"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbardrop"
              data-toggle="dropdown"
            >
              THƯƠNG HIỆU
            </a>
            <ul>
              <div class="dropdown-menu">
                <a
                  class="dropdown-item"
                  href="#"
                  v-for="(item, i) in thuonghieu"
                  :key="i"
                  >{{ item.TH_Ten }}</a
                >
              </div>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">BÁN CHẠY</a>
          </li>
          <ul class="navbar-nav" v-for="(danhmucs, i) in danhmuc" :key="i">
            <li class="nav-item">
              <a class="nav-link" href="#">{{ danhmucs.DM_Ten }}</a>
            </li>
          </ul>
          <li class="nav-item" style="text-align: right">
            <a class="nav-link" href="#" style="text-align: right">ƯU ĐÃI</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
    

<script>
export default {
  name: `Navbar`,
  props: ["danhmuc", "thuonghieu"],
};
</script>
     
<style>
.navbarrow .navbar-toggler {
  background-color: #ffffff;
  color: black;
  /* border: 1px #515151; */
}

.navbarrow {
  align-items: left;
  text-align: left;
  justify-content: center;
  float: right;
  color: #515151;
  margin-top: 0px;
}

.navbarrow .navbar-collapse .nav-item a {
  color: #515151;
  position: relative;
  text-align: center;
  display: inline-block;
  border-radius: 5px;
  font-size: 18px;
  padding-top: 0px;
  padding-bottom: 0px;
  font-family: Inter;
  font-size: 18px;
}

.navbarrow .navbar-collapse .nav-item {
  color: #515151;
  margin-left: 35px;
  position: relative;
  text-align: left;
  display: inline-block;
  transition: 0.4s;
  border-radius: 5px;
  font-size: 18px;
  font-family: Inter;
  font-weight: 600;
}

.navbarrow .navbar-collapse .nav-item.active,
.navbarrow .navbar-collapse .nav-item:hover {
  background-color: #e9e8e8;
  border-bottom-color: #515151;
}

.navbarrow .navbar-collapse .menu-item a {
  color: inherit;
  text-decoration: none;
}

.navbarrow .navbar-collapse .dropdown .dropdown-menu {
  background-color: #ffffff;
  top: calc(100%);
  left: 50%;
  transform: translateX(-70%);
  border-radius: 0px 0px 10px 10px;
  display: none;
}

.navbarrow .navbar-collapse .dropdown:hover .dropdown-menu {
  position: absolute;
  background-color: #ffffff;
  top: calc(100%);
  left: 70%;
  transform: translateX(-70%);
  width: max-content;
  border-radius: 0px 0px 10px 10px;
  display: block;
  text-align: left;
}

.navbarrow .navbar-collapse .dropdown .dropdown-menu .dropdown-item {
  display: block;
  text-align: left;
  margin-top: 10px;
}
</style>
