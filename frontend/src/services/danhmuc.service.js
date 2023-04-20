import http from "../common/http";

class DanhMucService {
    getAll() { return http.get("/danhmuc"); }
    get(DM_Ma) { return http.get(`/danhmuc/${DM_Ma}`); }
    create(data) { return http.post("/danhmuc", data); }
    update(DM_Ma, data) { return http.put(`danhmuc/${DM_Ma}`, data); }
    delete(DM_Ma) { return http.delete(`/danhmuc/${DM_Ma}`); }
    findByName(DM_Ten) { return http.get(`/danhmuc?name=${DM_Ten}`); }
    //deleteAll() { return http.delete("/sanpham"); }
}

export default new DanhMucService();