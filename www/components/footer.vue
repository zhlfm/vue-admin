<template>
	<div id="app">
		<div class="weui-footer weui-footer_fixed-bottom">
			  <p class="weui-footer__links">
			    <a href="javascript:void(0);" class="weui-footer__link">新奥服务</a>
			  </p>
			  <p class="weui-footer__text">Copyright © 2008-2016 weui.io</p>
			</div>
	</div>
</template>

<script>
	export default {
		name: 'my-footer',
		props: {
			name: {
				type: String
			}
		},
        data () {
            return {}
        }
    }
</script>

<style>
</style>