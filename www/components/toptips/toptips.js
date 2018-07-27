import Toptips from './toptips.vue';
import Vue from 'vue';

Toptips.newInstance = properties => {
    function destroy() {
        let dom = document.getElementById('toptips');
        dom && document.body.removeChild(dom);
    }
    destroy();

    const _props = properties || {};

    const Instance = new Vue({
        data: _props,
        render (h) {
            return h(Toptips, {
                props: _props
            });
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const toptips = Instance.$children[0];

    return {
        component: toptips,
        hide() {
            toptips.show = false;
            clearTimeout(toptips.timer);
            return this;
        },
        show() {
            toptips.show = true;
            return this;
        },
        timeout(t) {
            if (toptips.timer) {
                clearTimeout(toptips.timer);
                toptips.timer = null;
            }
            toptips.timer = setTimeout(this.hide, t);
        },
        destroy
    };
};

export default Toptips;
