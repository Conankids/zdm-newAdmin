<template>
<div>
  <el-form :inline="true" :rules="rules" :label-position="labelPosition" ref="form" :model="form" label-width="100px">
      <!-- 基本信息 -->
      <BlockBox :blockTitle='`基本信息`'>
            <el-form-item label="姓名" prop="username">
                <el-input v-model="form.username" placeholder="请输入姓名" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="form.sex" placeholder="请选择性别" style="width:260px;">
                    <el-option label="暂无" value="0">暂无</el-option>
                    <el-option label="女" value="1">女</el-option>                    
                    <el-option label="男" value="2">男</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" @change="getBirthday" style="width:260px;"></el-date-picker>
            </el-form-item>
                
             <el-form-item label="年龄">
                <el-input v-model="form.age" placeholder="请输入年龄" style="width:260px;"></el-input>
            </el-form-item>
          
            <el-form-item label="公司" prop="company">
                <el-input v-model="form.company" placeholder="请输入公司信息" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="position">
                <el-select v-model="form.position" placeholder="请选择职位" style="width:260px;">
                    <el-option label="创始人高管VP" value="创始人高管VP"></el-option>
                    <el-option label="中层负责人" value="中层负责人"></el-option>
                    <el-option label="普通员工" value="普通员工"></el-option>
                    <el-option label="自由职业" value="自由职业"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="手机" prop="tel">
                <el-input v-model="form.tel" placeholder="请输入你的手机号" style="width:260px;"></el-input>
            </el-form-item>
             <el-form-item label="微信">
                <el-input v-model="form.weixin" placeholder="请输入你的微信号" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="体验师类型" prop="vip_type">
                    <el-select v-model="form.vip_type" placeholder="选择体验师类型" style="width:260px;">
                        <el-option label="首席体验师" value="2"></el-option>
                        <el-option label="见习体验师" value="3"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="个人介绍" prop="userinfo">
                <el-input type="textarea" :rows='3' v-model="form.userinfo" placeholder="请输入个人介绍" style="width:708px;"></el-input>
            </el-form-item>
    </BlockBox>
      <!-- 领域 -->
      <BlockBox :blockTitle='`领域`'>
        <el-form-item label="主打领域" prop="main_area">
            <el-select v-model="form.main_area" multiple placeholder="请选择主打领域">
                <el-option
                   v-for="item in initAllArea"
                    :key="item.areaid"
                    :label="item.area_name"
                    :value="item.areaid">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="跨界领域">
            <el-select v-model="form.minor_area" multiple placeholder="请选择跨界领域">
                <el-option
                    v-for="item in initAllArea"
                    :key="item.areaid"
                    :label="item.area_name"
                    :value="item.areaid">
                </el-option>
            </el-select>
        </el-form-item>
    </BlockBox>
    
    <!-- 影响力 -->
      <BlockBox :blockTitle='`渠道信息`'>
        <div class="bbtd platform-item space-btn" v-for='(item,index) in form.influence' :key='index'>
            <el-form-item label="平台">
                <el-cascader
                    expand-trigger="hover"
                    :options="InfluenceOptions"
                    v-model="platform[index]"
                    style="width:260px;"
                    @change="platformChange(index)">
                </el-cascader>
            </el-form-item>
           
            <el-form-item label="地址/账号名">
                <el-input v-model="item.address" placeholder="请输入地址/账号名" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="粉丝/浏览量">
                <el-input v-model="item.fans_num" placeholder="请输入粉丝/浏览量" style="width:260px;" type="number"></el-input>
            </el-form-item>
            <el-form-item label="媒体报价">
                <el-input v-model="item.offer" placeholder="请输入媒体报价" style="width:260px;"></el-input>
            </el-form-item>
            <a class="del-platform-btn icon-del" href="javascript:;" v-if="index>0" @click="delItem(form.influence,index)"></a>
        </div>
        <div class="add-platform blue tc cp">
            <span class="icon-add" @click="addPlatform()">添加平台信息</span>
        </div>
    </BlockBox>

    <!-- 家居信息 -->
      <BlockBox :blockTitle='`家居信息`'>
        <el-form-item label="家庭信息">
            <el-select v-model="form.home_info" :placeholder='`请选择家庭信息`'>
                <el-option
                    v-for="item in homeOptions.home_info"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="家居大小">
            <el-select v-model="form.home_size" :placeholder='`请选择家居大小`'>
                <el-option
                    v-for="item in homeOptions.home_size"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="装修风格">
            <el-select v-model="form.home_style" :placeholder='`请选择装修风格`'>
                <el-option
                    v-for="item in homeOptions.home_style"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="客厅大小">
            <el-select v-model="form.parlor_size" :placeholder='`请选择客厅大小`'>
                <el-option
                    v-for="item in homeOptions.other_size"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="厨房大小">
            <el-select v-model="form.kitchen_size" :placeholder='`请选择厨房大小`'>
                <el-option
                    v-for="item in homeOptions.other_size"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主卧大小">
            <el-select v-model="form.room_size" :placeholder='`请选择主卧大小`'>
                <el-option
                    v-for="item in homeOptions.other_size"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="子女信息">
            <el-radio-group v-model="form.home_has_child">
                <el-radio label="0">未知</el-radio>
                <el-radio label="1">有</el-radio>
                <el-radio label="2">没有</el-radio>
            </el-radio-group>
            <el-input v-model="form.child_info" placeholder="描述一下子女信息吧~" style="width:480px;margin-left:62px;"></el-input>
        </el-form-item>
        <el-form-item label="宠物信息">
            <el-radio-group v-model="form.home_has_pet">
                <el-radio label="0">未知</el-radio>
                <el-radio label="1">有</el-radio>
                <el-radio label="2">没有</el-radio>
            </el-radio-group>
            <el-input v-model="form.pet_info" placeholder="描述一下宠物信息吧~" style="width:480px;margin-left:62px;"></el-input>
        </el-form-item>
    </BlockBox>
  
     <!-- 能力体现 -->
     <BlockBox :blockTitle='`能力体现`'>
     <el-row class="title-show">
     <el-form-item label="配合度（一个选项一分、总共3分）"  label-width="300px">
    </el-form-item>
    </el-row>
    <el-form-item>
    
      <el-checkbox label="外围渠道能否同步" @change="countNum" v-model="formData.ability.cooperate.synchronize" true-label='1' false-label='0' name="type"></el-checkbox>
      <el-checkbox label="改稿件和标题" @change="countNum" v-model="formData.ability.cooperate.revision_title" true-label='1' false-label='0' name="type"></el-checkbox>
      <el-checkbox label="按时交稿、按要求改稿" @change="countNum" v-model="formData.ability.cooperate.submit_blog" true-label='1' false-label='0' name="type"></el-checkbox>
    </el-form-item>

     <el-row class="title-show">
     <el-form-item label="专业度（一个选项一分、总共3分）"  label-width="300px">
    </el-form-item>
    </el-row>
    <el-form-item>
      <el-checkbox label="账号原创能力" @change="countNum" v-model="formData.ability.professionalism.original" true-label='1' false-label='0' name="type"></el-checkbox>
      <el-checkbox label="相关邻域的职业" @change="countNum" v-model="formData.ability.professionalism.area_title" true-label='1' false-label='0' name="type"></el-checkbox>
      <el-checkbox label="跨领域的合作内容产出质量" @change="countNum" v-model="formData.ability.professionalism.area_content" true-label='1' false-label='0' name="type"></el-checkbox>
    </el-form-item>
    
     <el-row class="title-show">
     <el-form-item label="摄影水平（一个选项一分、总共2分）"  label-width="300px">
    </el-form-item>
    </el-row>
    <el-form-item>
      <el-checkbox label="拍照技术和成像作品" @change="countNum" v-model="formData.ability.photography.technology" true-label='1' false-label='0' name="type"></el-checkbox>
      <el-checkbox label="专业的拍摄设备情况" @change="countNum" v-model="formData.ability.photography.device" true-label='1' false-label='0' name="type"></el-checkbox>
    </el-form-item>

     <el-row class="title-show">
     <el-form-item label="摄像水平（一个选项一分，总共2分）"  label-width="300px">
    </el-form-item>
    </el-row>
    <el-form-item>
      <el-checkbox label="视频拍摄及剪辑能力" @change="countNum" v-model="formData.ability.camera.technology" true-label='1' false-label='0' name="type"></el-checkbox>
      <el-checkbox label="专业的拍摄设备情况"  @change="countNum" v-model="formData.ability.camera.device" true-label='1' false-label='0' name="type"></el-checkbox>
    </el-form-item>
    

    </BlockBox>
      <div class="tc sub-box">
      </div> 
    <div class="footer" v-if="vipInfoData">
    <div class="footer-other" v-if="(vipInfoData.data.type=='1'&&vipInfoData.data.status=='2')">
    <el-button style="width:180px;" type="primary" @click="SubmitToVipCheck()" :loading="submitLoading">打回到体验师审核</el-button>
    <el-button style="margin-left:20px;width:180px" @click="PassEditVipUserInfo('form')" type="primary" :loading="submitLoading">通过入库</el-button>
    </div>
     <div class="footer-sub" v-else>
    <el-button style="width:180px;"  type="primary" @click="submitForm('form')" :loading="submitLoading">提交</el-button>
    </div>
    </div>
  </el-form>
 </div>
</template>
<script>
import Bus from '@/pages/info/bus.js'
import BlockBox from 'components/block-box/block-box'
import { provinceAndCityData, CodeToText, TextToCode } from 'element-china-area-data'
import WinHistory from 'components/win-history/win-history'
import BlogList from 'components/blog-list/blog-list'
import qs from 'qs'

//平台信息
const platform_item = () => ({
    address: '',
    fans_num: '',
    platform_id:'',
    offer:''
})
export default {
    props: {
        formData: {
            type: Object,
            default: null   
        },
         vipInfoData: {
            type:Object,
            default: null
        },
    },
    data () {
        return {
            //添加loading
            submitLoading:false,
            //所有的领域数据
            initAllArea:[],
            img_preview_list: [],
            labelPosition: 'left',
            //vip数据信息
            uidInfo: {},
            platform:[],
            rules: {
                username: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                birthday: [{
                    required: true,
                    message: '请输入出生日期',
                    trigger: 'blur'
                }],
                main_area: [{
                    type: 'array',
                    required: true,
                    message: '请至少选择一个主打领域',
                    trigger: 'change'
                }],
                company:[{
                    required: true,
                    message: '请输入公司名称',
                    trigger: 'blur'
                }],
                position:[{
                    required: true,
                    message: '请选择职位',
                    trigger: 'change'
                }],
                tel: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }],
                userinfo:[{
                    required: true,
                    message: '请输入个人介绍',
                    trigger: 'blur'
                }],
                vip_type:[{
                    required: true,
                    message: '请选择体验师类型',
                    trigger: 'blur'
                }],
            },
            InfluenceOptions:[],
            homeOptions: {
                home_info: [{
                    value: '0',
                    label: '未知'
                }, {
                    value: '1',
                    label: '已婚'
                },{
                    value: '2',
                    label: '单身'
                }],
                home_size: [{
                    value: '0',
                    label: '未知'
                }, {
                    value: '1',
                    label: '100平米以内'
                }, {
                    value: '2',
                    label: '100-150'
                }, {
                    value: '3',
                    label: '150-200'
                },{
                    value: '4',
                    label: '200平米以上'
                }],
                home_style: [{
                    value: '0',
                    label: '未知'
                }, {
                    value: '1',
                    label: '欧式'
                }, {
                    value: '2',
                    label: '中式'
                }, {
                    value: '3',
                    label: '美式混搭'
                }, {
                    value: '4',
                    label: '日式'
                }, {
                    value: '5',
                    label: '其他'
                }],
                other_size: [{
                    value: '0',
                    label: '未知'
                }, {
                    value: '1',
                    label: '100平米以内'
                }, {
                    value: '2',
                    label: '100-150'
                }, {
                    value: '3',
                    label: '150-200'
                },{
                    value: '4',
                    label: '200平米以上'
                }]
            },
          
          
        }
    },
    computed: {
        
    },
    created () {
        this.initFormData()
        //获取平台所有信息方法
        this.GetAllPlaform()
        //获取主打领域所有信息方法
         this.GetAllArea()
         //发送总分数据
         this.initTotal();
    },
    methods: {
        //获取平台所有信息方法
        GetAllPlaform(){
            this.$http({
                method: 'get',
                url: '/admin/vip/GetAllPlaform',
            })
            .then((res)=>{
              this.InfluenceOptions=res.data.result;
            })
        },
        //获取主打领域所有信息方法
         GetAllArea(){
            this.$http({
                method: 'get',
                url: '/admin/vip/GetAllArea',
            })
            .then((res)=>{
            this.initAllArea=res.data.result;
            })
        },
        // 打回到体验师审核
         SubmitToVipCheck(){
            this.submitLoading=true;
            this.$http({
                method: 'get',
                url: '/admin/vip/SubmitToVipCheck',
                 params: {
                    id: window.vipUid
                 }
            })
            .then((res)=>{
            this.submitLoading=false;
             if(res.data.resultCode==0){
              this.$message.success(res.data.errorMsg);
                    setTimeout(function () {
                    window.location.href='/admin/GetVipUserCheckList?status=2'
                    }, 500)
              }else{
                  this.$message.error(res.data.errorMsg);
              }
            })
        },
        //通过入库
         PassEditVipUserInfo(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                let data=qs.stringify({data:this.form,id:window.vipUid});
                 this.submitLoading=true;            
                    this.$http({
                        method: 'post',
                        url: 'admin/vip/PassEditVipUserInfo',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        },
                        data:data
                    }).then(res => {
                       this.submitLoading=false; 
                       if(res.data.resultCode==0){
                          this.$message.success(res.data.errorMsg)
                               setTimeout(function () {
                               window.location.href='/admin/GetVipUserCheckList?status=2'
                                }, 500)
                          }else{
                            this.$message.error(res.data.errorMsg);
                           }
                    })
                }
            })
        },
        //遍历plaform值
        influenceMap(){
        let arr=[];
         this.form.influence.map((item)=>{
         arr.push([item.f_platform_id,item.platform_id])
        })
         this.platform=arr;
        },
        initFormData () {
            this.form = this.formData
            this.initTotal();
        },
        platformChange (index) {
            this.form.influence[index].platform_id=this.platform[index][1];
        },
        //转换时间格式
         getBirthday(){
	        var start =this.form.birthday;
	        var spaceMark = "-";
	        var year = start.getFullYear();
	        var month = start.getMonth() + 1;
	        var today = start.getDate();
	        if (month >= 1 && month <= 9) {
	          month = "0" + month;
	        }
	        if (today >= 0 && today <= 9) {
	          today = "0" + today;
	        }
	        var birthday = year + spaceMark + month + spaceMark + today;
	        this.form.birthday=birthday;
        },
        //添加平台信息
        addPlatform () {
            this.form.influence.push(platform_item())
        },
        delItem (content, index) {
            content.splice(index, 1)
        },
        delBlockBox (i) {
            this.form.other.splice(i, 1)
        },
         //计算change事件的方法
         countNum(val){
            this.initTotal();
         },
         //获取当前的选中数目
         initTotal(){
         let ability=this.formData.ability;
         let countNum=0;
         Object.keys(ability).forEach((item)=>{
          Object.keys(ability[item]).forEach((info)=>{
              countNum+=Number(ability[item][info])
          })
         })
           Bus.$emit("myTotal",countNum)
         },
        //提交
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                let data=qs.stringify({data:this.form,id:window.vipUid});
                    this.submitLoading=true; 
                    this.$http({
                        method: 'post',
                        url: 'admin/vip/EditVipUserInfo',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        },
                        data:data
                    }).then(res => {
                        this.submitLoading=false; 
                        if(res.data.resultCode==0){
                          this.$message.success(res.data.errorMsg)
                            setTimeout(function () {
                                 window.location.href='/admin/vip/GetVipUserList'
                            }, 500)
                          }else{
                            this.$message.error(res.data.errorMsg);
                          }
                    })
                }
            })
        }
    },
    components: {
        BlockBox,
        WinHistory,
        BlogList
    },
    watch: {
        formData (val) {
                this.initFormData()
                this.influenceMap();
        }
    }
}
</script>
<style lang="less" scoped>
.Z-row {
  margin: 20px 0;
}
.bbtd {
  width: 100%;
  border-bottom: 1px dashed #f0f0f0;
}
.platform-item {
  padding: 30px 30px 0 0;
  position: relative;
}
.del-platform-btn {
  position: absolute;
  right: 0;
  top: 10px;
}
.add-platform {
  margin: 20px 0;
  width: 100%;
}
.add-block-box {
  margin: 20px 0;
  .add-block-box-btn {
    width: 240px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #fc6b6b;
    text-align: center;
    margin: 0 auto;
  }
}
.sub-box {
  padding: 20px 0;
  border-top: 1px solid #f0f0f0;
}
.title-show{
    width: 100%;
}
.footer{
    margin:40px 0 60px 0;
    width: 100%;
    .footer-sub,.footer-other{
     display: flex;
    justify-content: center;
    align-items: center;
    }
    .footer-other{
        margin-top: 20px;
    }
    
}

</style>


