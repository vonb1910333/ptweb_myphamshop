import http from "../common/http";

class NhanVienService {
    getAll() { return http.get("/nhanvien"); }
    getByID(NV_Ma) { return http.get(`/nhanvien/${NV_Ma}`); }
    create(data) { return http.post("/nhanvien", data); }
    update(NV_Ma, data) { return http.put(`/nhanvien/${NV_Ma}`, data); }
    delete(NV_Ma) { return http.delete(`/nhanvien/${NV_Ma}`); }
    
    //Tim kiemnhan vien theo ten
    findByName(NV_Ten) { return http.get(`/nhanvien?name=${NV_Ten}`); }
     //deleteAll() { return http.delete("//nhanvien"); }
}

export default new NhanVienService();