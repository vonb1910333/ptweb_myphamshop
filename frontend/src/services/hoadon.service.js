import http from "../common/http";

class HoaDonService {
    getAll() { return http.get("/hoadon"); }
    getByID(id) { return http.get(`/hoadon/${id}`); }
    getByIDMaDH(DH_Ma) { return http.get(`/hoadon/hoadon/${DH_Ma}`); }
    create(data) { return http.post("/hoadon", data); }
    // update(id, data) { return http.put(`hoadon/${id}`, data); }
    // delete(id) { return http.delete(`/hoadon/${id}`); }
    findByMaDH(DH_Ma) { return http.get(`/hoadon?name=${DH_Ma}`); }
}

export default new HoaDonService();