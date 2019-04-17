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
            <el-form-item label="生日">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width:260px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="地域">
                <el-cascader  expand-trigger="hover" :options="options" :value="addressCode" @change="handleChange" style="width:260px;"></el-cascader>
            </el-form-item>
            <el-form-item label="从事行业">
                <el-input v-model="form.job" placeholder="请输入从事行业" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="公司信息">
                <el-input v-model="form.company" placeholder="请输入公司信息" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="职位">
                <el-select v-model="form.position" placeholder="请选择职位" style="width:260px;">
                    <el-option label="创始人高管VP" value="创始人高管VP"></el-option>
                    <el-option label="中层负责人" value="中层负责人"></el-option>
                    <el-option label="普通员工" value="普通员工"></el-option>
                    <el-option label="自由职业" value="自由职业"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="form.vip_type" placeholder="请选择类型" style="width:260px;">
                    <el-option label="商业体验师" value="商业体验师"></el-option>
                    <el-option label="普通体验师" value="普通体验师"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关联uid">
                <div style="width:260px;">
                    <span>{{form.juid?form.juid:'暂无'}}</span>
                    <el-button type="primary" style="margin-left:20px;" @click="openContectUid" v-if='!form.juid'>关联uid</el-button>
                    <el-button type="warning" style="margin-left:20px;" @click="openContectUid" v-else>修改关联uid</el-button>
                </div>
            </el-form-item>
            <el-form-item label="用户级别">
                <div style="width:260px;">
                    <span>{{uidInfo.groupname?uidInfo.groupname:'暂无'}}</span>
                </div>
            </el-form-item>
            <el-form-item label="个人主页">
                <el-input v-model="form.homepage" placeholder="请输入个人主页" style="width:708px;"></el-input>
            </el-form-item>
            <el-form-item label="个人介绍">
                <el-input type="textarea" :rows='3' v-model="form.introduction" placeholder="请输入个人介绍" style="width:708px;"></el-input>
            </el-form-item>
            <el-form-item label="荣誉资料">
                <el-input type="textarea" :rows='3' v-model="form.honor_information" placeholder="请输入荣誉资料" style="width:708px;"></el-input>
            </el-form-item>
    </BlockBox>
    <!-- 照片库 -->
      <BlockBox :blockTitle='"照片库"'>
        <el-upload
            slot="head"
            class="fr"
            name="upfile"
            :multiple='true'
            action="/admin2/ajax/multipleupload"
            :show-file-list='false'
            :on-success='uploadSuccess'>
            <a class="blue" href="javascript:;">上传</a>
        </el-upload>
        <div style="width:100%;">
            <!-- swiper -->
            <swiper class="img-list" :options="swiperOption" ref="mySwiper" v-if="form.user_img.length">
                <swiper-slide v-for="(item,index) in form.user_img" :key="index">
                    <div class="img-item">
                        <img class="preview-img"  width="100%" :src="`http://s1.jiguo.com/${item}/230x230`" alt="" @click="openPreview(index)">
                        <span class="img-del" @click="delItem(form.user_img,index)">x</span>
                    </div>  
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
            <div class="gray" v-else>暂无图片，点击右上角“上传”吧~</div>
        </div>
    </BlockBox>
    <!-- 综合评价 -->
    <BlockBox :blockTitle='`综合评价`'>
        <el-form-item label="综合评分">
            <el-select v-model="form.overall_rating" placeholder="请选择综合评分" style="width:260px;">
                <el-option label="10 Title顶级+吉祥物一样的存在" value="10"></el-option>
                <el-option label="9 Title+产出能力都高" value="9"></el-option>
                <el-option label="8 Title好+产出需要协助" value="8"></el-option>
                <el-option label="7 基本无Title+产出能力好" value="7"></el-option>
                <el-option label="6 暂不符合商业需求" value="6"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="推荐语">
            <el-input type="textarea" :rows='3' v-model="form.recommend_info" placeholder="请输入推荐语" style="width:708px;"></el-input>
        </el-form-item>
    </BlockBox>
    <!-- 联系方式 -->
      <BlockBox :blockTitle='`联系方式`'>
        <el-form-item label="手机号">
            <el-input v-model="form.tel" placeholder="请输入手机号" style="width:260px;"></el-input>
        </el-form-item>
        <el-form-item label="微信">
            <el-input v-model="form.weixin" placeholder="请输入微信号" style="width:260px;"></el-input>
        </el-form-item>
        <el-form-item label="地址信息">
                <el-input type="textarea" :rows='3' v-model="form.address" placeholder="请输入地址信息" style="width:708px;"></el-input>
            </el-form-item>
    </BlockBox>
    <!-- 影响力 -->
      <BlockBox :blockTitle='`影响力`'>
        <div class="bbtd">
            <el-form-item label="整体报价">
                <el-input v-model="form.influence_price" placeholder="请输入整体报价" style="width:678px;"></el-input>
            </el-form-item>
        </div>
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
            <el-form-item label="极果折扣价">
                <el-input v-model="item.jiguo_price" placeholder="请输入极果折扣价" style="width:260px;"></el-input>
            </el-form-item>
            <a class="del-platform-btn icon-del" href="javascript:;" v-if="index>0" @click="delItem(form.influence,index)"></a>
        </div>
        <div class="add-platform blue tc cp">
            <span class="icon-add" @click="addPlatform">添加平台信息</span>
        </div>
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
    <!-- 配合度 -->
      <BlockBox :blockTitle='`配合度`'>
        <el-form-item label="急稿支持">
            <el-select v-model="form.cooperate_urgent_draft" :placeholder='`请选择急稿支持配合度`'>
                <el-option
                    v-for="item in contentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="改稿支持">
            <el-select v-model="form.cooperate_edit_draft" :placeholder='`请选择改稿支持配合度`'>
                <el-option
                    v-for="item in contentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </BlockBox>
    <!-- 商业能力 -->
      <BlockBox :blockTitle='`商业能力`'>
        <el-form-item v-for='(item,index) in form.business' :key='index' :label='(index>3)?"":item.title' style="width:395px;">
            <el-input v-if='index>3' v-model="item.title" placeholder="信息名" style="width:90px;margin-right: 6px;"></el-input>
            <el-select v-model="item.content" :placeholder='`请选择${item.title}`'>
                <el-option
                    v-for="item in contentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <span v-if='index>3' class="icon-del" @click="delItem(form.business,index)"></span>
        </el-form-item>
        <el-form-item style="width:395px;">
            <span class="icon-add cp blue" @click="addItem(form.business)">添加信息</span>
        </el-form-item>  
    </BlockBox>
    <!-- 极果试用信息 -->
      <BlockBox :blockTitle='`极果试用信息`'>
        <div slot="head" style="width:700px;float:right;">
            <span v-if='form.juid'>关联uid：{{form.juid}}</span>
            <span class="fr blue cp" @click="openContectUid" v-if="!form.juid">关联uid</span>
            <span class="fr blue cp" @click="openContectUid" v-else>修改关联uid</span>
        </div>
        <span class="gray" v-if='!uidInfo.groupname'>暂无试用信息，去关联uid吧~</span>
        <div v-else style="width:100%;">
            <el-row class="Z-row">
                <el-col :span="11">平均产出时间: <span class="red ft16">{{uidInfo.blog_avg_time}}</span>天</el-col>
                <el-col :span="11">平均分: <span class="red ft16">{{uidInfo.blog_avg_score}}</span>分</el-col>
            </el-row>
            <el-row class="Z-row">
                <el-col :span="11">中签数/申请: <span>{{`${uidInfo.win_num}/${uidInfo.apply_num}`}}</span></el-col>
            </el-row>
            <el-row class="Z-row">
                <a :href="`javascript:;`" class="blue" @click="winHistoryShow=true">中签历史</a>
                <i class="blue">&nbsp;·&nbsp;</i>
                <a :href="`javascript:;`" class="blue" @click="blogListShow=true">报告列表</a>
            </el-row>
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
    <!-- 其他信息项 -->
      <BlockBox v-for='(item,i) in form.other' :key="i" :blockTitle='``'>
            <div slot="head" style="width:100%;display:flex;justify-content:space-between;align-items:center;">
                    <el-input v-model="item.title" placeholder="输入父级信息名" style="width:260px;" size="small"></el-input>
                    <span class="fr blue cp" @click="delBlockBox(i)">删除</span>
            </div>
            <el-form-item v-for='(cItem,j) in item.content' :key='j'>
                <el-input v-model="cItem.title" placeholder="子级信息名" style="width:100px;margin-right: 20px;"></el-input>
                <el-input v-model="cItem.content" placeholder="信息填写项" style="width:500px;"></el-input>
                <span class="icon-del" @click="delOtherItem(i,j)"></span>  
            </el-form-item>
            <el-form-item>
                <span class="icon-add blue cp" @click="addCItem(i)">添加子级信息项</span>
            </el-form-item>
      </BlockBox>
      <div class="add-block-box">
          <div class="add-block-box-btn cp red" @click="addBlockBox">
              <b>+</b>
              <span>添加信息项</span>
          </div>
      </div>
      <div class="tc sub-box">
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </div>
      <!-- 中签历史 -->
      <WinHistory :winHistoryShow='winHistoryShow' :juid='form.juid' @closeWinHistory="changeWinHistory"/>

      <!-- 报告列表 -->
      <BlogList :blogListShow='blogListShow' :juid='form.juid' @closeBlogList="changeBlogList"/>
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
            winHistoryShow: false,
            blogListShow: false,
            options: provinceAndCityData,
            uidInfo: {},
            labelPosition: 'left',
            rules: {
                username: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                main_area: [{
                    type: 'array',
                    required: true,
                    message: '请至少选择一个主打领域',
                    trigger: 'change'
                }]
            },
            swiperOption: {
                slidesPerView: 6,
                spaceBetween: 20,
                freeMode: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
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
            form: {
                user_img: []
            }
        }
    },
    computed: {
        addressCode () {
            const addressCodeArr = []
            let masterProvince = ''
            let masterCity = ''
            //处理地域(标准化省市地区名)
            if (this.form.province) {
                addressCodeArr.push(TextToCode[this.form.province].code)
                if ('台湾省'.indexOf(this.form.province) == -1) {
                    addressCodeArr.push(TextToCode[this.form.province][this.form.city].code)
                }
            } else if (this.form.city) {
                if ('台湾省'.indexOf(this.form.city) > -1) {
                    //对台湾省(没有市)进行单独处理
                    masterProvince = '台湾省'
                    this.form.province = masterProvince
                    this.form.city = masterCity
                    addressCodeArr.push(TextToCode[this.form.province].code)
                } else {
                    for (var i in provinceAndCityData) {
                        const cityList = provinceAndCityData[i].children
                        let breakFlag = false
                        for (var j in cityList) {
                            if (cityList[j].label.indexOf(this.form.city) > -1) {
                                masterProvince = provinceAndCityData[i].label
                                masterCity = cityList[j].label
                                breakFlag = true
                                break
                            }
                        }
                        if (breakFlag) break
                    }
                    if (masterProvince && masterCity) {
                        this.form.province = masterProvince
                        this.form.city = masterCity
                        addressCodeArr.push(TextToCode[this.form.province].code)
                        addressCodeArr.push(TextToCode[this.form.province][this.form.city].code)
                    }
                }
            }
            return addressCodeArr
        },
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
            console.log(areaData);
            this.areaOptions = areaData
        },
        initFormData () {
            this.form = this.formData
            this.uidInfo = this.uidInfoData
        },
        handleChange (value) {
            const addressCodeArr = [...value]
            this.form.province = CodeToText[addressCodeArr[0]]
            this.form.city = CodeToText[addressCodeArr[1]]
        },
        openContectUid () {
            this.$prompt(' ', '关联uid', {
                confirmButtonText: '关联',
                cancelButtonText: '取消',
                inputPlaceholder: '输入关联uid',
                inputPattern: /^[0-9]+$/,
                inputErrorMessage: '请填写正确的uid'
            }).then(({ value }) => {
                this.$http({
                    method: 'post',
                    url: ' /admin/vip/GetJiGuoUser',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    },
                    data: qs.stringify({ juid: value })
                }).then(res => {
                    res = res.data
                    if (res.resultCode === "0") {
                        this.$message.success(res.errorMsg)
                        this.form.juid = value
                        this.form.main_area = res.result.main_area
                        this.uidInfo = res.result
                    } else {
                        this.$message.error(res.errorMsg)
                    }
                }).catch(error => {
                    console.log(error)
                })
            })
        },
        uploadSuccess (response, file, fileList) {
            if (!response.result.length) {
                this.$message.error(response.errorMsg)
                return
            }
            this.form.user_img.push(response.result[0].fileid)
        },
        openPreview (index) {
            this.$preview.open(index, this.img_preview_list, { bgOpacity: 0.6, captionEl: false, fullscreenEl: false, shareEl: false })
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
        delOtherItem (i, j) {
            this.form.other[i].content.splice(j, 1)
        },
        addBlockBox () {
            this.form.other.push(block_box_content())
        },
        addCItem (i) {
            this.form.other[i].content.push(c_item())
        },
        changeWinHistory (data) {
            this.winHistoryShow = data.winHistoryShow
        },
        changeBlogList (data) {
            this.blogListShow = data.blogListShow
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(qs.stringify(this.form));
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
        'form.user_img': function (newVal) {
            const that = this
            if (newVal.length) {
                //清空预览图片数组，避免无限添加
                that.img_preview_list = []
                for (let i in newVal) {
                    let img_item = {}
                    //创建promise记录每张图片的宽高
                    new Promise(function (resolve, reject) {
                        const img = new Image()
                        img.src = `http://s1.jiguo.com/${newVal[i]}/640`
                        img.onload = function () {
                            const data = {
                                src: img.src,
                                width: img.width,
                                height: img.height
                            }
                            resolve(data)
                        }
                    }).then(function (data) {
                        img_item.src = data.src
                        img_item.w = data.width
                        img_item.h = data.height
                        that.img_preview_list[i] = img_item
                    })
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.img-list {
  .img-item {
    width: 120px;
    position: relative;
  }
  .img-del {
    width: 16px;
    height: 16px;
    line-height: 16px;
    background-color: #f0f0f0;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #fc6b6b;
    }
  }
  img {
    width: 100%;
    cursor: pointer;
  }
}
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
</style>


