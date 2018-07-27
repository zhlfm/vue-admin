<template>
    <div v-show="show" id="toptips" :class="classes">{{msg}}</div>
</template>
<script>
    const types = {
        error: 'weui-toptips_error',
        warn: 'weui-toptips_warn',
        success: 'weui-toptips_success'
    };
    export default {
        props: {
            msg: {
                type: String,
                default: '操作成功'
            },
            css: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'warn'
            }
        },
        data () {
            return {
                 show: false
            };
        },
        computed: {
            classes () {
                return [
                    'weui-toptips', 'js_tooltips', this.css, types[this.type]
                ];
            }
        }
    };
</script>
<style scoped>
    .weui-toptips {
        display: block;
        opacity: 1;
    }
    .weui-toptips_success {
        background-color: green;
        color: white;
    }
    .weui-toptips_error {
        background-color: #E64340;
        color: white;
    }
    .weui-toptips_warn {
        background-color: yellow;
        color: #0d0d0d;
    }
</style>