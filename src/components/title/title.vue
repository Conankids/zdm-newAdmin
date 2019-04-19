<template>
  <div class="title">
      <h3 class="title-left">{{titleText}}</h3>
      <h3 class="count">总分：{{total}}</h3>
  </div>
</template>

<script>
import Bus from '@/pages/info/bus.js'

export default {
    props: {
        titleText: {
            type: String,
            default: ''
        }
    },
    data() {
      return {
        total:''
      }
    },
    created() {
      this.getCount();
    },
    methods: {
        getCount(){
            Bus.$on("myTotal",(message)=>{   //这里最好用箭头函数，不然this指向有问题
                 this.total= message      
            })
       }
    },
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


