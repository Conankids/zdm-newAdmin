<template>
  <el-form :inline="true" :rules="rules" :label-position="labelPosition" ref="form" :model="form" label-width="100px" v-if="form.content">
      <!-- 基本信息 -->
      <BlockBox :blockTitle='`基本信息`'>
            <el-form-item label="姓名" prop="username">
                <el-input v-model="form.username" placeholder="请输入姓名" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="form.sex" placeholder="请选择性别" style="width:260px;">
                    <el-option label="男" value="2"></el-option>
                    <el-option label="女" value="1"></el-option>
                    <el-option label="暂无" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="userage">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width:260px;"></el-date-picker>
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
             <el-form-item label="微信" prop="weixin">
                <el-input v-model="form.weixin" placeholder="请输入你的微信号" style="width:260px;"></el-input>
            </el-form-item>

            <el-form-item label="个人介绍" prop="introduction">
                <el-input type="textarea" :rows='3' v-model="form.introduction" placeholder="请输入个人介绍" style="width:708px;"></el-input>
            </el-form-item>
    </BlockBox>
      <!-- 领域 -->
      <BlockBox :blockTitle='`领域`'>
        <el-form-item label="主打领域" prop="main_area">
            <el-select v-model="form.main_area" multiple placeholder="请选择主打领域">
                <el-option
                    v-for="item in areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="跨界领域">
            <el-select v-model="form.minor_area" multiple placeholder="请选择跨界领域">
                <el-option
                    v-for="item in areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
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
                <el-input v-model="item.fans_num" placeholder="请输入粉丝/浏览量" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="媒体报价">
                <el-input v-model="item.media_price" placeholder="请输入媒体报价" style="width:260px;"></el-input>
            </el-form-item>
            <a class="del-platform-btn icon-del" href="javascript:;" v-if="index>0" @click="delItem(form.influence,index)"></a>
        </div>
        <div class="add-platform blue tc cp">
            <span class="icon-add" @click="addPlatform">添加平台信息</span>
        </div>
    </BlockBox>

    <!-- 家居信息 -->
      <BlockBox :blockTitle='`家居信息`'>
        <el-form-item label="家庭信息">
            <el-select v-model="form.home.home_info" :placeholder='`请选择家庭信息`'>
                <el-option
                    v-for="item in homeOptions.home_info"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="家居大小">
            <el-select v-model="form.home.home_size" :placeholder='`请选择家居大小`'>
                <el-option
                    v-for="item in homeOptions.home_size"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="装修风格">
            <el-select v-model="form.home.home_style" :placeholder='`请选择装修风格`'>
                <el-option
                    v-for="item in homeOptions.home_style"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="客厅大小">
            <el-select v-model="form.home.room_size" :placeholder='`请选择客厅大小`'>
                <el-option
                    v-for="item in homeOptions.other_size"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="厨房大小">
            <el-select v-model="form.home.kitchen_size" :placeholder='`请选择厨房大小`'>
                <el-option
                    v-for="item in homeOptions.other_size"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主卧大小">
            <el-select v-model="form.home.bedroom_size" :placeholder='`请选择主卧大小`'>
                <el-option
                    v-for="item in homeOptions.other_size"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="子女信息">
            <el-radio-group v-model="form.home.home_has_child">
                <el-radio label="1">无</el-radio>
                <el-radio label="2">有</el-radio>
            </el-radio-group>
            <el-input v-model="form.home.child_info" placeholder="描述一下子女信息吧~" style="width:550px;margin-left:48px;"></el-input>
        </el-form-item>
        <el-form-item label="宠物信息">
            <el-radio-group v-model="form.home.home_has_pet">
                <el-radio label="1">无</el-radio>
                <el-radio label="2">有</el-radio>
            </el-radio-group>
            <el-input v-model="form.home.pet_info" placeholder="描述一下宠物信息吧~" style="width:550px;margin-left:48px;"></el-input>
        </el-form-item>
    </BlockBox>
  
    <!-- 内容能力 -->
      <BlockBox :blockTitle='`内容能力`'>
        <el-form-item v-for='(item,index) in form.content' :key='index' :label='(index>3)?"":item.title' style="width:395px;">
            <el-input v-if='index>3' v-model="item.title" placeholder="信息名" style="width:90px;margin-right: 6px;"></el-input>
            <el-select v-model="item.content" :placeholder='`请选择${item.title}`'>
                <el-option
                    v-for="item in contentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <span v-if='index>3' class="icon-del" @click="delItem(form.content,index)"></span>
        </el-form-item>
        <el-form-item style="width:395px;">
            <span class="icon-add cp blue" @click="addItem(form.content)">添加信息</span>
        </el-form-item>  
    </BlockBox>
     <BlockBox :blockTitle='`能力体现`'>
     <el-row class="title-show">
    <el-form-item :label="formData.coordinate.title" label-width="225px">
    </el-form-item>
     </el-row>
    <el-form-item>
    <el-checkbox-group v-model="formData.Ability.coordinate">
      <el-checkbox :label="val" name="type" v-for="(val,index) in formData.coordinate.abInfo" :key='index'></el-checkbox>
    </el-checkbox-group>
    </el-form-item>

     <el-row class="title-show">
     <el-form-item :label="formData.major.title"  label-width="225px">
    </el-form-item>
    </el-row>
    <el-form-item>
    <el-checkbox-group v-model="formData.Ability.major">
      <el-checkbox :label="val" name="type" v-for="(val,index) in formData.major.abInfo" :key='index'></el-checkbox>
    </el-checkbox-group>
    </el-form-item>
    
     <el-row class="title-show">
    <el-form-item :label="formData.photography.title"  label-width="225">
    </el-form-item>
    </el-row>
    <el-form-item>
    <el-checkbox-group v-model="formData.Ability.photography">
      <el-checkbox :label="val" name="type" v-for="(val,index) in formData.photography.abInfo" :key='index'></el-checkbox>
    </el-checkbox-group>
    </el-form-item>

     <el-row class="title-show">
     <el-form-item :label="formData.cameraShooting.title"  label-width="225">
    </el-form-item>
    </el-row>
    <el-form-item>
    <el-checkbox-group v-model="formData.Ability.cameraShooting">
      <el-checkbox :label="val" name="type" v-for="(val,index) in formData.cameraShooting.abInfo" :key='index'></el-checkbox>
    </el-checkbox-group>
    </el-form-item>

    </BlockBox>
      <div class="tc sub-box">
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </div> 
    <div class="footer">
     <div class="footer-sub">
    <el-button style="width:180px;">提交</el-button>
    </div>

    <div class="footer-other">
    <el-button  style="width:180px;">打回到体验师审核</el-button>
    <el-button style="margin-left:20px;width:180px">通过入库</el-button>
    </div>
    </div>
  </el-form>
 
</template>
<script>
import BlockBox from 'components/block-box/block-box'
import { provinceAndCityData, CodeToText, TextToCode } from 'element-china-area-data'
import WinHistory from 'components/win-history/win-history'
import BlogList from 'components/blog-list/blog-list'
import qs from 'qs'

//平台信息
const platform_item = () => ({
    platform: [],
    username: '',
    fans: '',
    media_price: '',
    jiguo_discount: ''
})
//能力信息
const content_item = () => ({
    title: '',
    en_title: '',
    content: ''
})
//其他信息
const block_box_content = () => ({
    title: '',
    content: [{
        title: '',
        en_title: '',
        content: ''
    }, {
        title: '',
        en_title: '',
        content: ''
    }, {
        title: '',
        en_title: '',
        content: ''
    }]
})
//其他信息子选项
const c_item = () => ({
    title: '',
    en_title: '',
    content: ''
})
export default {
    props: {
        formData: {
            type: Object,
            default: null
        },
        uidInfoData: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            img_preview_list: [],
            labelPosition: 'left',
            rules: {
                username: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                userage: [{
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
                    type: 'array',
                    required: true,
                    message: '请至少选择一个职位',
                    trigger: 'change'
                }],
                tel: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }],
                weixin: [{
                    required: true,
                    message: '请输入微信号',
                    trigger: 'blur'
                }],
                introduction:[{
                    required: true,
                    message: '请输入个人介绍',
                    trigger: 'blur'
                }],
            },
            InfluenceOptions: [
                {
                    value: '自媒体',
                    label: '自媒体',
                    children: [
                        {
                            value: '微信朋友圈',
                            label: '微信朋友圈'
                        },
                        {
                            value: '微信公众号',
                            label: '微信公众号'
                        },
                        {
                            value: '微博',
                            label: '微博'
                        },
                        {
                            value: '知乎',
                            label: '知乎'
                        },
                        {
                            value: '其他',
                            label: '其他'
                        }
                    ]
                },
                {
                    value: '外围渠道',
                    label: '外围渠道',
                    children: [
                        {
                            value: '今日头条',
                            label: '今日头条'
                        },
                        {
                            value: '搜狐新闻',
                            label: '搜狐新闻'
                        },
                        {
                            value: '网易新闻',
                            label: '网易新闻'
                        },
                        {
                            value: '新浪看点',
                            label: '新浪看点'
                        },
                        {
                            value: 'UC',
                            label: 'UC'
                        },
                        {
                            value: '京东发现',
                            label: '京东发现'
                        },
                        {
                            value: '淘宝头条',
                            label: '淘宝头条'
                        },
                        {
                            value: '其他',
                            label: '其他'
                        }
                    ]
                },
                {
                    value: '视频自媒体',
                    label: '视频自媒体',
                    children: [
                        {
                            value: '优酷',
                            label: '优酷'
                        },
                        {
                            value: '土豆',
                            label: '土豆'
                        },
                        {
                            value: '爱奇艺',
                            label: '爱奇艺'
                        },
                        {
                            value: '腾讯',
                            label: '腾讯'
                        },
                        {
                            value: '秒拍',
                            label: '秒拍'
                        },
                        {
                            value: '抖音',
                            label: '抖音'
                        },
                        {
                            value: '其他',
                            label: '其他'
                        }
                    ]
                },
                {
                    value: '直播',
                    label: '直播',
                    children: [
                        {
                            value: '斗鱼',
                            label: '斗鱼'
                        },
                        {
                            value: '一直播',
                            label: '一直播'
                        },
                        {
                            value: '映客',
                            label: '映客'
                        },
                        {
                            value: 'YY',
                            label: 'YY'
                        },
                        {
                            value: '其他',
                            label: '其他'
                        }
                    ]
                }
            ],
            areaOptions: null,
            contentOptions: [
                {
                    value: '优秀',
                    label: '优秀'
                }, {
                    value: '良好',
                    label: '良好'
                }, {
                    value: '一般',
                    label: '一般'
                }, {
                    value: '无',
                    label: '无'
                }
            ],
            homeOptions: {
                home_info: [{
                    value: '已婚',
                    label: '已婚'
                }, {
                    value: '单身',
                    label: '单身'
                }],
                home_size: [{
                    value: '0~80',
                    label: '0~80'
                }, {
                    value: '80~120',
                    label: '80~120'
                }, {
                    value: '120+',
                    label: '120+单身'
                }, {
                    value: '别墅',
                    label: '别墅'
                }],
                home_style: [{
                    value: '中式',
                    label: '中式'
                }, {
                    value: '日式',
                    label: '日式'
                }, {
                    value: '欧式',
                    label: '欧式'
                }, {
                    value: '美式',
                    label: '美式'
                }],
                other_size: [{
                    value: '10~20',
                    label: '10~20'
                }, {
                    value: '20~40',
                    label: '20~40'
                }, {
                    value: '40~60',
                    label: '40~60'
                }, {
                    value: '60+',
                    label: '60+'
                }]
            },
          
          
        }
    },
    computed: {
        platform () {
            const platform = []
            for (let i in this.form.influence) {
                const platformItemArr = []
                platformItemArr.push(this.form.influence[i].parent_platform)
                platformItemArr.push(this.form.influence[i].child_platform)
                platform.push(platformItemArr)
            }
            return platform
        }
    },
    created () {
        this.initAreaOptions()
        this.initFormData()
    },
    methods: {
        initAreaOptions () {
            const areaData = []
            for (var i in window.areaOptionsData) {
                const areaItem = {
                    value: window.areaOptionsData[i],
                    label: window.areaOptionsData[i]
                }
                areaData.push(areaItem)
            }
            this.areaOptions = areaData
        },
        initFormData () {
            this.form = this.formData
        },
        platformChange (index) {
            const platform = [...this.platform[index]]
            this.form.influence[index].parent_platform = platform[0]
            this.form.influence[index].child_platform = platform[1]
        },
        addPlatform () {
            this.form.influence.push(platform_item())
        },
        delItem (content, index) {
            content.splice(index, 1)
        },
        addItem (content) {
            content.push(content_item())
        },
        delBlockBox (i) {
            this.form.other.splice(i, 1)
        },
        addCItem (i) {
            this.form.other[i].content.push(c_item())
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http({
                        method: 'post',
                        url: '/admin/vip/InsertUser',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        },
                        data: qs.stringify(this.form)
                    }).then(res => {
                        res = res.data
                        if (res.resultCode === "0") {
                            this.$message.success(res.errorMsg)
                            setTimeout(function () {
                                window.location = '/admin/vip/list.html'
                            }, 500)
                        } else {
                            this.$message.error(res.errorMsg)
                        }
                    }).catch(error => {
                        console.log('网络错误，不能访问')
                    })
                } else {
                    if (this.form.username === '') {
                        this.$message.error('请输入姓名')
                        return false
                    }
                    if (this.form.main_area.length === 0) {
                        this.$message.error('请至少选择一个主打领域')
                        return false
                    }
                    console.log(valid);
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
            if (val.content) {
                this.initFormData()
            }
        },
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
    margin:60px 0 60px 0;
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


