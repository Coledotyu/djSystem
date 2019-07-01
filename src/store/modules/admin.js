import {
  Message
} from 'element-ui';
import router from '@/router';

const admin = {
  state: {
    login: false,
    adminInfo: {},
  },
  mutations: {
    SAVEADMININFO(state, adminInfo) {
      state.adminInfo = adminInfo;
    },
    SAVESTATUS(state) {
      state.login = !state.login;
    },
  },
  actions: {
    // 管理员登录
    AdminLogin({ commit }, data) {},

    // 获取管理员信息
    GetAdminInfo({ commit }) {},

    // 退出
    AdminSignOut({commit}) {
      commit('SAVEADMININFO', null);
      commit('SAVESTATUS');
      router.push({
        name: 'Login',
      });
      Message({
        type: "success",
        message: "退出成功！"
      });
    }
  },
};

export default admin;
