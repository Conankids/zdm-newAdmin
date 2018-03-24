<template>
  <div id="app">
    <Title :titleText='titleText'></Title>
    <Form :formData='formData' :uidInfoData='uidInfoData'/>
  </div>
</template>

<script>
import 'base/less/reset.less'
import Title from 'components/title/title'
import Form from 'components/form/form'

export default {
  data() {
    return {
      titleText: '新建商业体验师',
      formData: {
        username: '',
        sex: '',
        birthday: '',
        province: '',
        city: '',
        job: '',
        company: '',
        position: '',
        vip_type: '',
        juid: '',
        homepage: '',
        introduction: '',
        honor_information: '',
        user_img: [],
        overall_rating: '',
        recommend_info: '',
        tel: '',
        weixin: '',
        address: '',
        influence_price: '',
        influence: [
          {
            parent_platform: '',
            child_platform: '',
            address: '',
            fans_num: '',
            media_price: '',
            jiguo_price: ''
          }
        ],
        main_area: [],
        minor_area: [],
        content: [{
          title: '文字能力',
          en_title: 'content_write',
          content: ''
        }, {
          title: '拍照能力',
          en_title: 'content_pictures',
          content: ''
        }, {
          title: '视频能力',
          en_title: 'content_video',
          content: ''
        }, {
          title: '直播能力',
          en_title: 'content_live',
          content: ''
        }, {
          title: '',
          en_title: '',
          content: ''
        }],
        cooperate_urgent_draft: '',
        cooperate_edit_draft: '',
        business: [{
          title: '场景体验',
          en_title: 'business_tiyan',
          content: ''
        }, {
          title: '理性实验',
          en_title: 'business_shiyan',
          content: ''
        }, {
          title: '视频出境',
          en_title: 'business_chujing',
          content: ''
        }, {
          title: '直播口才',
          en_title: 'business_koucai',
          content: ''
        }, {
          title: '',
          en_title: '',
          content: ''
        }],
        home: {
          home_info: '',
          home_size: '',
          home_style: '',
          room_size: '',
          kitchen_size: '',
          bedroom_size: '',
          home_has_child: '2',
          home_has_pet: '1',
          child_info: '',
          pet_info: ''
        },
        other: []
      },
      uidInfoData: {
        groupname: '',
        blog_avg_time: '',
        blog_avg_score: '',
        win_num: '',
        apply_num: ''
      }
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
