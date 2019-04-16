<template>
  <div id="app">
    <Title :titleText='titleText'></Title>
    <Form :formData='formData' :uidInfoData='uidInfoData'/>
  </div>
</template>

<script>
import 'base/less/reset.less'
import Title from 'components/title/title'
import Form from 'components/form-info/form'

export default {
  data() {
    return {
      titleText: '体验师详情/用户名',
      formData: {
        username: '',
        sex: '男',
        age:'',
        province: '',
        city: '',
        company: '',
        position: '',
        introduction: '',
        user_img: [],
        tel: '',
        weixin: '',
        address: '',
        influence: [
          {
            parent_platform: '',
            child_platform: '',
            address: '',
            fans_num: '500',
            media_price: '',
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
          home_style: '中式',
          room_size: '',
          kitchen_size: '',
          bedroom_size: '',
          home_has_child: '2',
          home_has_pet: '2',
          child_info: '小学',
          pet_info: '有，黄喉龟'
        },
        //能力体现
          coordinate:{
          title:'配合度（一个选项一分，总共3分)',
          abInfo:['地推活动','线下主题活动','单纯品牌曝光']
          },
         major:{
          title:'专业度（一个选项一分，总共3分)',
          abInfo:['账号原创能力','相关邻域的职业','跨领域的合作内容产出质量']
         },
         photography:{
          title:'摄影水平（一个选项一分，总共3分)',
          abInfo:['拍照技术和成像水平','专业的拍摄设备情况']
         },
         cameraShooting:{
          title:'摄像水平（一个选项一分，总共3分)',
          abInfo:['视频拍摄及剪辑能力','专业的拍摄设备情况']
         },
         Ability:{
           coordinate:[],
           major:[],
           photography:[],
           cameraShooting:[]
         }

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
