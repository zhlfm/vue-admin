"use strict";
import moment from 'moment';
import Schema from 'async-validator';
const Common = {
    /**
     * 获取浏览器高度
     * @returns {number}
     */
    getWindowHeight() {
        let winHeight = 0;
        if (window.innerHeight){
            winHeight = window.innerHeight;
        }else if ((document.body) && (document.body.clientHeight)){
            winHeight = document.body.clientHeight;
        }
        return winHeight;
    },
    valid: {
        ip(rule, value, callback) {
            if (rule.required && (value === undefined || value === '' || value.length <= 0)) {
                callback(new Error(`不能为空`));
                return;
            }
            if (value) {
                value = Array.isArray(value) ? value : value.split(',');
                for (let val of value) {
                    let split = val.split('.');
                    if (split.length < 4 && !val.endsWith('*')) {
                        callback(new Error(`${val} 不是正确的IP地址`));
                        return;
                    }
                    for (let s of split) {
                        if (!/1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d\*\d|\*\d|\d\*|\d|\*/.test(s) || s.length > 3) {
                            callback(new Error(`${val} 不是正确的IP地址`));
                            return;
                        }
                    }
                }
            }
            callback();
        }
    },
    fieldValidate(vo, rule, error) {
        return new Promise(ok => {
            let validate = new Schema(rule);
            validate.validate(vo, errors => {
                if (error) {
                    Reflect.ownKeys(error).forEach(key => error[key] = !!(errors || []).find(value => value.field === key));
                } else {
                    Reflect.ownKeys(rule).forEach(key => rule[key].error = !!(errors || []).find(value => value.field === key));
                }
                ok(errors);
            });
        });
    },
    dateFormat(val, format = 'YYYY-MM-DD HH:mm:ss') {
        return val ? moment(Number(val)).format(format) : '-';
    },
    statusFormat(val, trueTxt = '启用', falseTxt = '禁用') {
        return `<span class="${val === true ? 'text-green' : 'text-muted'}">${val === true ? trueTxt : falseTxt}</span>`;
    },
    emailFormat(val) {
        return `<a href="mailto:${val}">${val}</a>`;
    },
    RENDER: {
        DATE(h, params) {
            return h('span', Common.dateFormat(params.row[params.column.key]));
        },
        DATE_RANGE(h, params) {
            return function (start, end) {
                return h('span', `${Common.dateFormat(params.row[start])}~${Common.dateFormat(params.row[end])}`);
            };
        },
        APPEND(h, params) {
            return function (append) {
                return h('span', `${params.row[params.column.key]}${append}`);
            };
        },
        STATUS(h, params) {
            let status = params.row[params.column.key];
            return h('span', {class: status === true ? 'text-green' : 'text-muted'}, status === true ? '启用' : '禁用');
        },
        STATUS_DIY(h, params) {
            let status = params.row[params.column.key];
            return function (trueTxt = '启用', falseTxt = '禁用') {
                return h('span', {class: status === true ? 'text-green' : 'text-muted'}, status === true ? trueTxt : falseTxt);
            };
        }
    },
    clearVo(vo) {
        let keys = Reflect.ownKeys(vo);
        for (let key of keys) {
            if (key === '__ob__') continue;
            let type = typeof vo[key];
            if (type === 'object' && vo[key]) {
                this.clearVo(vo[key]);
            }
            Reflect.set(vo, key, type === 'boolean' ? false : type === 'number' ? 0 : null);
        }
    },
    renderTree(data, fn) {
        if (Array.isArray(data)) {
            data.forEach(item => {
                Reflect.apply(fn, data, [item]);
                if (item.children && Array.isArray(item.children)) {
                    this.renderTree(item.children, fn);
                }
            });
        }
    },
    voNumberToChar(vo) {
        let keys = Reflect.ownKeys(vo);
        for (let key of keys) {
            if (!isNaN(vo[key]) && vo[key]) {
                Reflect.set(vo, key, `${vo[key]}`);
            }
        }
    },
    makeTree(array, pid, prop_parent, prop_id, prop_child, renderer) {
        let result = [] , temp;
        for(let item of array){
            if(item[prop_parent] === pid){
                result.push(item);
                temp = Common.makeTree(array, item[prop_id], prop_parent, prop_id, prop_child);
                if(temp.length > 0){
                    item[prop_child] = temp;
                }
            }
            if (typeof renderer === 'function') {
                renderer(item);
            }
        }
        return result;
    }
};
export default Common;