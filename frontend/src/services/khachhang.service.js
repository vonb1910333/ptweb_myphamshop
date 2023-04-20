import http from "../common/http";

class KhachHangService {
    getAll() { return http.get("/khachhang"); }
    getByID(KH_Ma) { return http.get(`/khachhang/${KH_Ma}`); }
    create(data) { return http.post("/khachhang", data); }
    update(id, data) { return http.put(`khachhang/${id}`, data); }
    delete(KH_Ma) { return http.delete(`/khachhang/${KH_Ma}`); }
    //Timk kiem khach hang theo sdt
    findByName(KH_SDT) { return http.get(`/khachhang?name=${KH_SDT}`); }
}

export default new KhachHangService();