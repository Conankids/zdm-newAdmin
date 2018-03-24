<template>
  <div class="block-wrap">
      <div class="block-title">
          {{blockTitle}}
          <slot name="head"></slot>
      </div>
      <div class="block-content">
          <slot></slot>
      </div>
  </div>
</template>
<script>
export default {
  props: {
      blockTitle:{
         type: [Object,String],
         default: '' 
      }
  }
}
</script>
<style lang="less" scoped>
    .block-wrap{
        margin-top: 20px;
        border: 1px solid #f0f0f0;
        .block-title{
            height: 38px;
            line-height: 38px;
            padding: 0 10px;
            background-color: #f7f7f7;
            font-size: 16px;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .block-content{
            padding: 20px 15px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }
</style>


