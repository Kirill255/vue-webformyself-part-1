<template>
  <div id="app"
       class="container">
    <h1>{{ msg }}</h1>

    <!-- Можно итак юзать, но лучше с алиасами -->
    <!-- <img src="./assets/logo.png"> -->

    <!-- Вот с алиасом -->
    <img src="@/assets/logo.png">

    <!-- А это, если ~ в начале то как модуль будет подключаться -->
    <!-- <img src="~@/assets/logo.png"> -->

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav nav nav-pills">
          <router-link class="nav-item"
                       tag="li"
                       :to="{name: 'home'}"
                       exact>
            <a class="nav-link">Home</a>
          </router-link>
          <router-link class="nav-item"
                       tag="li"
                       :to="{name: 'cars'}">
            <a class="nav-link">Cars</a>
          </router-link>
          <router-link class="nav-item"
                       tag="li"
                       :to="{name: 'form'}">
            <a class="nav-link">Form</a>
          </router-link>
          <router-link class="nav-item"
                       tag="li"
                       :to="`/car/2`">
            <a class="nav-link">car2</a>
          </router-link>
          <router-link class="nav-item"
                       tag="li"
                       :to="`/car/3`">
            <a class="nav-link">car3</a>
          </router-link>
        </ul>
      </div>
    </nav>

    <hr>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style lang="scss">
</style>
