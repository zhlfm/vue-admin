import Toast from './toast.vue';
import Vue from 'vue';

Toast.newInstance = properties => {
    function destroy() {
        let dom = document.getElementById('toast');
        dom && document.body.removeChild(dom);
    }
    destroy();

    const _props = properties || {};

    const Instance = new Vue({
        data: _props,
        render (h) {
            return h(Toast, {
                props: _props
            });
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const toast = Instance.$children[0];

    return {
        component: toast,
        hide() {
            toast.show = false;
            clearTimeout(toast.timer);
            return this;
        },
        show() {
            toast.show = true;
            return this;
        },
        timeout(t) {
            if (toast.timer) {
                clearTimeout(toast.timer);
                toast.timer = null;
            }
            toast.timer = setTimeout(this.hide, t);
        },
        destroy
    };
};

export default Toast;
