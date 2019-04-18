<template>
  <div class="title">
      <h3 class="title-left">{{titleText}}</h3>
      <h3 class="count">总分：</h3>
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
  overflow: hidden;
  border-bottom: 1px solid #f0f0f0;
  h3 {
    font-size: 18px;
    height: 60px;
    line-height: 60px;
    font-weight: 900;
  }
  .title-left{
    float: left;
  }
  .count{
    float: right;
  }
}
</style>


