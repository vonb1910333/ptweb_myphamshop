import http from "../common/http";

class ChiTietGioHangService {
    getAll() { return http.get("/chitietgiohang"); }

    create(data) { return http.post("/chitietgiohang", data); }

    // tim kiem cac chi tiet gio hang theo ma
    findByMaGH(GH_Ma) { return http.get(`/chitietgiohang?name=${GH_Ma}`); }

    update(GH_Ma, data) { return http.put(`chitietgiohang/${GH_Ma}`, data); }
    delete(id) { return http.delete(`/chitietgiohang/${id}`); }
    //deleteAll() { return http.delete("/sanpham"); }  
    get(SP_Ma) { return http.get(`/chitietgiohang/${SP_Ma}`); }
}

export default new ChiTietGioHangService();