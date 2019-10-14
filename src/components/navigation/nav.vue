<template>
  <div class="nav">
    {{ title }}
    <img v-if="showBack" @click="handleBack" class="img" src="../../../static/img/back.png" />
  </div>
</template>

<script>
export default {
  name: 'navigation',
  props: {
    title: {
      type: String
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
  .nav {
    position: relative;
    width: 100%;
    height: 4rem;
    text-align: center;
    line-height: 4rem;
    background: #FC3B40;
    font-size: 1.2rem;
    color: #FFF;

    .img {
      position: absolute;
      top: 1rem;
      left: 1.2rem;
      width: 2rem;
      height: 2rem;
    }
  }
</style>
