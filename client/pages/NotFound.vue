<template>
	<v-container>
		<div style="text-align: center; color:rgb(70, 77, 92); max-width: 400px; margin: 100px auto">
			<a href="/" class="logo"></a>
			<p class="my-5">
				페이지를 찾을 수 없습니다.
			</p>
			<v-btn text href="/" style="color:rgb(252, 77, 77);">
				<v-icon left medium>mdi-home</v-icon> 메인으로
			</v-btn>
		</div>

	</v-container>
</template>

<script>
export default {};
</script>

<style>
.logo {
  position: relative;
  background: url(~/thumbnail.jpg) top center no-repeat;
  border-radius: 50%;
  background-size: contain;
  display: inline-block;
  width: 60px;
  height: 60px;
}
</style>
