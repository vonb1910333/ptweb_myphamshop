<template>
     <div class="container-fluid footer-home">
       <div class="row pt-5 justify-content-md-center">
           <div class="col col-lg-3" style="font-size: 14px;">
               <img :src="require(`@/images/logo_footer.png`)" alt="" class="img-fluid">
               <p class="p-0 pt-5 mt-2 text-left textfooter" >Chúng tôi cam kết kinh doanh mỹ phẩm chất lượng </p>
               <p class="p-0 mt-2 text-left textfooter" >Sử dụng sản phẩm của chúng tôi tạo nên sự xinh đẹp của bạn</p>
           </div>
           <div class="col-md-auto">
               <p class="p-0 mt-2 textKetNoi" >KẾT NỐI VỚI CHÚNG TÔI</p>
               <div class="row p-0 pt-5 mt-2" style="color: #000000">
                   <span class="col "><i class="fab fa-lg fa-facebook iconfooter" ></i> </span> 
                   <span class="col "><i class="fab fa-lg fa-instagram iconfooter" ></i> </span>
                   <span class="col "><i class="fab fa-lg fa-twitter iconfooter" ></i> </span> 
               </div>
               <div class="row">
                <img :src="require(`@/images/image_footer.png`)" alt="" class="img-fluid">
                
               </div>
           </div>            
       </div>
       <div class="row pt-3 justify-content-md-center container-fluid">
           <p class="textfooter">Copyright © 2022 - All rights reserved | Sweet Cosmetic</p>
       </div>
   </div>
</template>

<script>
//import 
export default {
name: `Footer`,
props: ["footer"],
};
</script>

<style>
.footer-home {
    color: black;
   background-color: #676767;
    border-color: #515151;
   padding: 1px;
   border-radius: 20px;
   margin-top: 2%;
}
.footer-home .textfooter{
    font-family: Inter;
    font-size: 17px;
    text-align: center;
    color: white;
}

.footer-home .iconfooter{
    font-size: 35px;
    color: white;
}

.footer-home .textKetNoi{
    font-family: Inter;
    font-size: 18px;
    font-weight: 600;
    color: white;
}
</style>