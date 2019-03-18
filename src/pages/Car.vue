<template>
  <div>
    Car {{ id }}

    <router-link class="btn btn-sm btn-primary"
                 :to="{name: 'cars'}">
      Back
    </router-link>

    <br>

    <router-link class="btn btn-sm btn-primary"
                 :to="{name: 'carinfo', params: {id: id}, query: {name: 'Mazda', year: '2016'}, hash: '#scroll'}">
      Info
    </router-link>

    <hr>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Car",
  data: () => ({
    name: ""
  }),
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Вы хотите уйти? У вас есть несохранённые изменения!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  }
};
</script>

<style scoped>
</style>
