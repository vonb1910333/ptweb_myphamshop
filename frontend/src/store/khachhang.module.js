import http from "../common/http";
import { handle } from "../common/promise";

const state = {
   khachhang: {
        KH_Ma: String,
        KH_Ten: String,
        KH_SDT: String,
        KH_MatKhau: String,
        GH_Ma: String,
    },
    status: {
        loggedIn: Boolean
    },
    nhanvien: {
        NV_Ma: String,
        NV_Ten: String,
        NV_MatKhau: String
    },
    statusEmployee: {
        loggedInNhanVien: Boolean
    }
};
const mutations = {
    initCustomerState(state) {
        state.khachhang = JSON.parse(localStorage.getItem("khachhang"));
        state.status.loggedIn = !!state.khachhang;
    },
    login(state, khachhang) {
        state.status.loggedIn = true;
        state.khachhang = khachhang;
        localStorage.setItem("khachhang", JSON.stringify(khachhang));
    },
    logout(state) {
        state.status.loggedIn = false;
        state.khachhang = null;
        localStorage.removeItem("khachhang");
    },
    clearLoginStatus(state) {
        state.status.loggedIn = false;
    },
    
    //employee
    initEmployeeState(state) {
        state.nhanvien = JSON.parse(localStorage.getItem("nhanvien"));
        state.statusEmployee.loggedInNhanVien = !!state.nhanvien;
    },
    loginEmployee(state, nhanvien) {
        state.statusEmployee.loggedInNhanVien = true;
        state.nhanvien = nhanvien;
        localStorage.setItem("nhanvien", JSON.stringify(nhanvien));
    },
    logoutEmployee(state) {
        state.statusEmployee.loggedInNhanVien = false;
        state.nhanvien = null;
        localStorage.removeItem("nhanvien");
    },
    clearLoginStatusEmployee(state) {
        state.status.loggedInNhanVien = false;
    },
};
const actions = {
    async login({ commit }, khachhang) {
        let [error, response] = await handle(
            http.post("/khachhang/signin", {
                KH_SDT: khachhang.KH_SDT,
                KH_MatKhau: khachhang.KH_MatKhau,
            })
        );
        if (error || !response.data.accessToken) {
            commit("logout");
            if (!error) {
                error = new Error("Whoops, no access token found!");
            }
            throw error;
        }
        commit("login", response.data);
        return response.data;
    },
    async register({ commit }, khachhang) {
        const [error, response] = await handle(
            http.post("/khachhang/signup", {
                KH_Ten: khachhang.KH_Ten,
                KH_SDT: khachhang.KH_SDT,
                KH_MatKhau: khachhang.KH_MatKhau,
            })
        );
        commit("clearLoginStatus");
        if (error) {
            throw error;
        }
        return response.data;
    },

    async loginEmloyee({ commit }, nhanvien) {
        console.log("Alo");
        let [error, response] = await handle(
            http.post("/nhanvien/signin", {
                NV_Ma: nhanvien.NV_Ma,
                NV_MatKhau: nhanvien.NV_MatKhau,
            })
        );
        if (error || !response.data.accessToken) {
            commit("logoutEmployee");
            if (!error) {
                error = new Error("Whoops, no access token found!");
            }
            throw error;
        }
        commit("loginEmployee", response.data);
        return response.data;
    },
};
const getters = {
    khachhangLoggedIn(state) {
        return state.status.loggedIn;
    },
    loggedInKhachHang(state) {
        return state.khachhang;
    },
    nhanvienLoggedIn(state) {
        return state.statusEmployee.loggedInNhanVien;
    },
    loggedInNhanVien(state) {
        return state.nhanvien;
    }
};
export const user = {
    state,
    mutations,
    actions,
    getters
};
