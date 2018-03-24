<template>
  <div class="title">
      <h3>{{titleText}}</h3>
  </div>
</template>

<script>
export default {
    props: {
        titleText: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
.title {
  h3 {
    font-size: 18px;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #f0f0f0;
    font-weight: 900;
  }
}
</style>


