import http from "../common/http";

class ImageService {
   getAll() { return http.get("/image"); }
//     getByID(id) { return http.get(`/hoadon/${id}`); }
    //getByIDMaDH(DH_Ma) { return http.get(`/hoadon/hoadon/${DH_Ma}`); }
    create(data) { return http.post("/image", data); }

}

export default new ImageService();