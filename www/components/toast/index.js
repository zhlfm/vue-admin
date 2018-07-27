import Toast from './toast';

let toastInstance;

function getToastInstance (prop) {
    toastInstance = toastInstance || Toast.newInstance(prop);

    return toastInstance;
}

export default {
    show(prop) {
        return getToastInstance(prop).show();
    },
    destroy () {
        let instance = getToastInstance();
        toastInstance = null;
        instance.destroy();
    }
};
