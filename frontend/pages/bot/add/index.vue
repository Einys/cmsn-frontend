<template>
  <v-container>
    <v-col>
      <form class="login" method="get" action="/auth/twitter">
        <h1 class="login-title">Simple Login</h1>
        <button type="submit" value="Lets Go" class="login-button">
          <img
            src="/Twitter_Logo_Black.svg"
            style="display: inline-block; height: 14px"
          />
        </button>
        <p class="login-lost"><a href="">Need Help?</a> </p>
      </form>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class App extends Vue {}
</script>

    <style scoped>
body {
  background: #2d343d;
}

.login {
  margin: 20px auto;
  width: 300px;
  padding: 30px 25px;
  background: white;
  border: 1px solid #c4c4c4;
}

h1.login-title {
  margin: -28px -25px 25px;
  padding: 15px 25px;
  line-height: 30px;
  font-size: 25px;
  font-weight: 300;
  color: #adadad;
  text-align: center;
  background: #f7f7f7;
}

.login-input {
  width: 285px;
  height: 50px;
  margin-bottom: 25px;
  padding-left: 10px;
  font-size: 15px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.login-input:focus {
  border-color: #6e8095;
  outline: none;
}
.login-button {
  width: 100%;
  height: 50px;
  padding: 0;
  font-size: 20px;
  color: #fff;
  text-align: center;
  background: #50b0e7;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  outline: 0;
}

.login-lost {
  text-align: center;
  margin-bottom: 0px;
}

.login-lost a {
  color: #666;
  text-decoration: none;
  font-size: 13px;
}
</style>
