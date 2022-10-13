import { createStore } from 'vuex';

export const store = createStore({
    state: { userInfo: { username: 'test name' } },
    getters: {
        nowBizVal: () => {
            return 1 // TODO: 暂未解耦业务方逻辑 
        }
    },
    mutations: {},
    actions: {},
})
