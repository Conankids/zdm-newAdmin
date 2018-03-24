<template>
  <div id="app">
    <Title :titleText='titleText'></Title>
    <Content :userData='userData'/>
  </div>
</template>

<script>
import 'base/less/reset.less'
import qs from 'qs'
import Title from 'components/title/title'
import Content from './module/content'

export default {
  data() {
    return {
      titleText: '查看详情',
      uid: window.vipUid,
      userData: {}
    }
  },
  created() {
    this.getUserData()
  },
  methods: {
    getUserData() {
      this.userData = window.vip_user
      this.titleText = `查看信息/${this.userData.username}`
    }
  },
  components: {
    Title,
    Content
  }
}
</script>

<style lang="less">

#app {
  font-family: Helvetica Neue, Helvetica, STHeiTi, sans-serif;
  font-size: 14px;
  color: #595959;
  margin: auto;
  background: #fff;
  padding: 30px;
  padding-top: 10px;
  margin-bottom: 20px;
  width: 910px;
  margin: 0 auto;
}
</style>
