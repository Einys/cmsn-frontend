<template>
	<div class="contact">

		<div class="sub">
			<router-link to="/terms">이용약관</router-link>
			<router-link to="/privacy">개인정보 보호방침</router-link>
			<p>
				<br>
				<v-icon size="13">mdi-email</v-icon> : cmsn.service@gmail.com<br>
                <a href="https://twitter.com/cms_env" target="_blank">
					<v-icon size="13">mdi-twitter</v-icon> : @cms_env
				</a>
                <br><br>
                ⓒ CMSN <br>
                사이트 내 게시된 예술 작품의 저작권은 해당 작품의 작가에게 있습니다. 무단 복제는 금지되어 있습니다.
			</p>
			<p>

			</p>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.contact {
  margin: 6px;
  margin-top: 10px;
  text-align: center;
  position: absolute;
  bottom: 0;
  h3 {
    font-weight: normal;
    color: #9b968f;
    margin-bottom: 10px;
  }
  p {
    color: rgb(169, 172, 177);
    font-size: 14px;
  }
  a {
    font-size: 12px;
    padding: 0px 10px;
    color: #5294d1;
  }
}

.sub p {
  font-size: 13px;
}
</style>
