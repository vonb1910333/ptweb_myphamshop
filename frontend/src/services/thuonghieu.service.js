import http from "../common/http";

class ThuongHieuService {
    getAll() { return http.get("/thuonghieu"); }
    get(TH_Ma) { return http.get(`/thuonghieu/${TH_Ma}`); }
    create(data) { return http.post("/thuonghieu", data); }
    update(TH_Ma, data) { return http.put(`thuonghieu/${TH_Ma}`, data); }
    delete(TH_Ma) { return http.delete(`/thuonghieu/${TH_Ma}`); }
    findByName(name) { return http.get(`/thuonghieu?name=${name}`); }
    //deleteAll() { return http.delete("/thuonghieu"); }
}

export default new ThuongHieuService();