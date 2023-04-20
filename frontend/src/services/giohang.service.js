import http from "../common/http";

class GioHangService {
    getAll() { return http.get("/giohang"); }
    getByID(GH_Ma) { return http.get(`/giohang/${GH_Ma}`); }
    create(data) { return http.post("/giohang", data); }
    update(GH_Ma, data) { return http.put(`giohang/${GH_Ma}`, data); }
    delete(GH_Ma) { return http.delete(`/giohang/${GH_Ma}`); }
    
}

export default new GioHangService();