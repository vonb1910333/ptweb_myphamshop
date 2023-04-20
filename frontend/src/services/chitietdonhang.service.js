import http from "../common/http";

class ChiTietDonHangService {
    getAll() { return http.get("/chitietdonhang"); }

    create(data) { return http.post("/chitietdonhang", data); }

    // tim kiem cac chi tiet don hang theo ma
    findByMaDH(DH_Ma) { return http.get(`/chitietdonhang?name=${DH_Ma}`); }

    // update(id, data) { return http.put(`chitietdonhang/${id}`, data); }
    // delete(DM_Ma) { return http.delete(`/chitietdonhang/${DM_Ma}`); }
    //deleteAll() { return http.delete("/sanpham"); }  
    get(SP_Ma) { return http.get(`/chitietdonhang/${SP_Ma}`); }
}

export default new ChiTietDonHangService();