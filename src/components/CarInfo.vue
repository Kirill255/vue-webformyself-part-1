<template>
  <div>
    <div>Car name {{ carName }}</div>
    <div>Car year {{ carYear }}</div>

    <div class="scroll"></div>

    <h6 id="scroll">Hello from the bottom!</h6>

    <div class="scroll"></div>
  </div>
</template>

<script>
export default {
  name: "CarInfo",
  computed: {
    carName() {
      return this.$route.query.name;
    },
    carYear() {
      return this.$route.query.year;
    }
  }
};
</script>

<style scoped>
.scroll {
  width: 100px;
  height: 1000px;
  background: #ccc;
}
</style>

/*
div.scroll - сдесь нужны что бы показать работу вью-роутера со скролом
*/
