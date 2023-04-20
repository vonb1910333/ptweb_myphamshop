import http from "../common/http";

class DonHangService {
    getAll() { return http.get("/donhang"); }
    getByID(DH_Ma) { return http.get(`/donhang/${DH_Ma}`); }
    create(data) { return http.post("/donhang", data); }
    update(DH_Ma, data) { return http.put(`donhang/${DH_Ma}`, data); }
    delete(DH_Ma) { return http.delete(`/donhang/${DH_Ma}`); }
    findByStatus(DH_TrangThai) { return http.get(`/donhang?name=${DH_TrangThai}`); }
    findByMaKH(KH_Ma) { return http.get(`/donhang?name=${KH_Ma}`); }
}

export default new DonHangService();