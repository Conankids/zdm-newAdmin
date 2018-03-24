<template>
  <div id="app">
    <Title :titleText='titleText'></Title>
    <Form :formData='formData' :uidInfoData='uidInfoData'/>
  </div>
</template>

<script>
import 'base/less/reset.less'
import qs from 'qs'
import Title from 'components/title/title'
import Form from 'components/form/form'

export default {
  data() {
    return {
      titleText: '编辑信息/',
      uid: window.vipUid,
      formData: {},
      uidInfoData: {}
    }
  },
  created() {
    this.getFormData()
  },
  methods: {
    getFormData() {
      const vip_user = window.vip_user
      this.formData = vip_user
      this.uidInfoData = {
        groupname: vip_user.jiguo_groupname,
        blog_avg_time: vip_user.blog_avg_time,
        blog_avg_score: vip_user.blog_avg_score,
        win_num: vip_user.win_num,
        apply_num: vip_user.apply_num
      }
      this.titleText = `编辑信息/${this.formData.username}`
    }
  },
  components: {
    Title,
    Form
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
