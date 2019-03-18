<template>
  <div>
    <h2>Cars</h2>

    <ul>
      <router-link v-for="i in 5"
                   :key="i"
                   class="nav-item"
                   tag="li"
                   :to="{name: 'car', params: {id: i}}"
                   exact>
        <a class="nav-link">Car {{ i }}</a>
      </router-link>
    </ul>

  </div>
</template>

<script>
export default {
  name: "Cars"
};
</script>

<style scoped>
</style>
