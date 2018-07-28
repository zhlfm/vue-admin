<template>
    <div>
        <button @click="post">登录</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            async post() {
                let result = await this.fetch('/permissions/user/login', {method: 'post', data: this.login});
                console.log(result);
            },
        }
    };
</script>
<style scoped lang="less">
</style>