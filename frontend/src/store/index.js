import { createStore } from "vuex";
import { user } from "./khachhang.module";

const store = createStore({
    modules: {
        khachhang: user,
    },
});
export default store;