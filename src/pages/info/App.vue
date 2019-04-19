<template>
  <div id="app">
    <Title :titleText='titleText'></Title>
    <Form :formData='formData' :uidInfoData='uidInfoData' :vipInfoData='vipInfoData'/>
  </div>
</template>

<script>
import 'base/less/reset.less'
import Title from 'components/title/title'
import Form from 'components/form-info/form'

export default {
  data() {
    return {
      vipInfoData:null,
      titleText: '体验师详情/',
      uid: window.vipUid,
      uidInfoData: {},
      formData: {
        username: '',
        birthday:'',
        sex: '2',
        age:'',
          //公司
        company: '',
         //职位
        position: '',
        tel: '',
        weixin: '',
        //用户介绍
        userinfo:'',
        //体验师类型
        vip_type:'',
        //领域
        main_area:[],
        minor_area:[],
        influence: [
          {
            address: '',
            fans_num: '',
            platform_id:'',
            offer:''
          },
        ],
         //家庭信息
          home_info: '',
          //厨房风格
          home_style: '2',
          //客厅
          parlor_size:'',
          //家居
          home_size: '',
          //主卧
          room_size: '',
          //厨房
          kitchen_size: '',
          //是否有孩子
          home_has_child: '1',
          // 是否有宠物
          home_has_pet: '1',
          //子女信息
          child_info: '',
          // 宠物信息
          pet_info: '',

        //能力体现
         ability:{
           cooperate:{
             synchronize:'0',
             revision_title:'0',
             submit_blog:'0'
           },
            professionalism:{
                original:'0',
                area_title:'0',
                area_content:'0',
            },
            photography:{
             technology:'0',
             device:'0',
            },
            camera:{
             technology:'0',
             device:'0',
            }
         },
      },
    }
  },
  created() {
    //获取体验师详情
    this.GetVipUserInfo()
  },
  methods: {
    //获取体验师详情
      GetVipUserInfo(){
          this.$http({
              method: 'get',
              url: '/admin/vip/GetVipUserInfo',
              params:{
                  id:window.vipUid
              }
          })
          .then((res)=>{
            if(res.data.resultCode==0){
            let resData=res.data.result.data;
             let formData = {}
              Object.keys(this.formData).forEach(item=>{
                if(resData[item]){
                  formData[item] = resData[item]
                  if(item=='main_area'){
                    formData[item] = resData['main_area_id']
                  }
                  if(item=='minor_area'){
                    formData[item] = resData['minor_area_id']
                  }
                }else{
                  formData[item]=this.formData[item]
                }
              })
              this.formData=formData;
              this.vipInfoData=res.data.result;
              this.titleText=`编辑信息/ ${this.formData.username}`;
            }else{
              this.$message.error(res.data.errorMsg);
            }
          })
      },
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
