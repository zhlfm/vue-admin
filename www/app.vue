<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data () {
            return {}
        },
        mounted () {
            this.$router.mode === 'abstract' && this.$router.push('/');
            let token = localStorage.getItem("token");
            if (!token) {
                this.$router.push('/login');
            }else{
            	this.$router.push('/')
            }
        },
        watch:{
            $route(to, from) {
                let matched = this.$router.getMatchedComponents(to.path);
                if (!matched.length) {
                    this.$router.replace(from.path);
                }
            }
        },
        methods: {
        }
    }
</script>
<style>
    body, html {
        height: 100%;
        -webkit-tap-highlight-color: transparent;
    }
    .container-text{}
</style>