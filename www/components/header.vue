<template>
	<div class="" id="header">
		<div class="header">
			<a href="javascript:history.go(-1);">
				<i class="fa fa-angle-left"></i>
			</a>
			<h1>{{title}}</h1>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'my-header',
		props: {
			title: {
				type: String
			}
		},
        data () {
            return {
            	
            }
        }
    }
</script>
	
<style lang="less">
	#header{
		z-index: 999;
		background: #fff;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 44px;
		.header{
			position: relative;
			height: 44px;
			line-height: 44px;
			text-align: center;
			a{
				position: absolute;
				color: #333;
				width: 40px;
				height: 44px;
				left: 0;
				top: 0;
			}
			.fa{
				font-size: 22px;
			}
			h1{
				font-size: 17px;
				font-weight: 300;
				padding: 0 40px;
			}
			&:after{
				content: ' ';
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 1px;
				background: #CCCCCC;
				transform: scaleY(.5);
				-webkit-transform: scaleY(.3);
			}
		}
	}
</style>