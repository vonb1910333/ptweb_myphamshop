import http from "../common/http";

class SanPhamService {
    getAll() { return http.get("/sanpham"); }
    getByID(SP_Ma) { return http.get(`/sanpham/${SP_Ma}`); }
    create(data) { return http.post("/sanpham", data); }
    update(SP_Ma, data) { return http.put(`/sanpham/${SP_Ma}`, data); }
    delete(SP_Ma) { return http.delete(`/sanpham/${SP_Ma}`); }
    findByName(name) { return http.get(`/sanpham?name=${name}`); }
     //deleteAll() { return http.delete("/sanpham"); }
}

export default new SanPhamService();