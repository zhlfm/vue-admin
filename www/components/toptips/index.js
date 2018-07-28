import Toptips from './toptips';

let toptipsInstance;

function getToptipsInstance (prop) {
    toptipsInstance = toptipsInstance || Toptips.newInstance(prop);

    return toptipsInstance;
}

export default {
    show(prop) {
        return getToptipsInstance(prop).show();
    },
    destroy () {
        let instance = getToptipsInstance();
        toptipsInstance = null;
        instance.destroy();
    }
};
