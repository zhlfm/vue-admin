<template>
    <div>
        <button @click="get">get请求</button>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                login: {
                    name: 'admin',
                    password: '888888'
                },
                query: {
                    "start_time": '',
                    "end_time": '',
                    "tws.to": ''
                }
            }
        },
        methods: {
            async get() {
                let result = await this.fetch('/wallet/serial/agent/transfer/page', {params: this.querys});
                console.log(result);
            }
        }
    }
</script>

<style scoped>

</style>