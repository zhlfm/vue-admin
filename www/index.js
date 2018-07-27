"use strict";
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Routers from './script/router.js'; // 路由列表
import axios from 'axios';
import moment from 'moment';
import LoadingBar from './components/loading-bar';
import Toptips from './components/toptips';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

const BASE_URL = config.baseURL;
Vue.use(VueRouter);
Vue.use(iView);
Vue.prototype.Toptips = Toptips;
Vue.config.productionTip = false;
/**
 * 拉取服务器信息
 * @param url
 * @param error
 * @param showError
 * @param config
 * @returns {Promise.<*>}
 */
 Vue.prototype.fetch = async (url, config, showError = true, error) => {
    LoadingBar.start();
    let response = null, result = null;
    try {
        let token = sessionStorage.getItem('token');
        if (token) {
            if (config && config.method && config.method.toUpperCase() === 'POST') {
                config = config || {};
                config.data = config.data || {};
                config.data.token = token;
            } else {
                url = url.includes('?') ? `${url}&token=${token}` : `${url}?token=${token}`;
            }
        }
        response = await axios(url, Object.assign({
            baseURL: BASE_URL,
            withCredentials: false
        }, config));
        result = response ? response.data : null;
        if (!response || response.status !== 200 || !result || !result.success) {
            throw new Error(`fetch ${url} data ${JSON.stringify(config)} error`);
        }
        // LoadingBar.finish();
        return result;
    } catch (err) {
        // LoadingBar.error();
        if (result && result.code && result.code === 500) {
            app.$router.replace('/login');
            return false;
        }
        showError && Toptips.show({msg: result ? result.msg : '操作失败', type: 'error'}).timeout(1500);
        console.log(err.stack);
        if (typeof error === 'function') {
            Reflect.apply(error, response, [result]);
        }
        return false;
    }
};
Vue.prototype.compile = (template, option) => {
    let res = Vue.compile(template);
    option = option || {};
    option.data = option.data || {};
    let component = new Vue(Object.assign(option, {
        render: res.render,
        staticRenderFns: res.staticRenderFns
    }));
    return component.$mount().$el;
};
Vue.prototype.dateFormat = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
	return moment(Number(time)).format(format);
}

const app = new Vue({
    el: '#app',
    router: new VueRouter({
        routes: Routers
    }),
    render: h => h(App)
});