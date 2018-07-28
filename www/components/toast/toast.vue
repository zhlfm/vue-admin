<template>
    <transition name="fade">
        <div id="toast" v-show="show">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i :class="typeClasses"></i>
                <p class="weui-toast__content">{{msg}}</p>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'icon-success-no-circle'
            },
            msg: {
                type: String,
                default: '操作成功'
            }
        },
        data () {
            return {
                 show: false
            };
        },
        computed: {
            typeClasses () {
                return [
                    `weui-icon_toast`, `weui-${this.type}`
                ];
            }
        }
    };
</script>
<style scoped>
</style>