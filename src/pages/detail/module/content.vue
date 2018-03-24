<template>
  <div class="content-wrap" v-if='userData.content'>
      <!-- 基本信息 -->
      <BlockBox :blockTitle='`基本信息`'>
          <el-row>
              <el-col :span='12'>
                  <div class="item-name">姓名：</div>
                  <div class="item-content">{{userData.username}}</div>
              </el-col>
              <el-col :span='12'>
                  <div class="item-name">性别：</div>
                  <div class="item-content">{{sexToText(userData.sex)}}</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span='12'>
                  <div class="item-name">生日：</div>
                  <div class="item-content">{{userData.birthday}}</div>
              </el-col>
              <el-col :span='12'>
                  <div class="item-name">地域：</div>
                  <div class="item-content">{{userData.province+userData.city}}</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span='12'>
                  <div class="item-name">从事行业：</div>
                  <div class="item-content">{{userData.job}}</div>
              </el-col>
              <el-col :span='12'>
                  <div class="item-name">公司信息：</div>
                  <div class="item-content">{{userData.company}}</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span='12'>
                  <div class="item-name">职位：</div>
                  <div class="item-content">{{userData.position}}</div>
              </el-col>
              <el-col :span='12'>
                  <div class="item-name">类型：</div>
                  <div class="item-content">{{userData.vip_type}}</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span='12'>
                  <div class="item-name">关联uid：</div>
                  <div class="item-content">{{userData.juid}}</div>
              </el-col>
              <el-col :span='12'>
                  <div class="item-name">用户级别：</div>
                  <div class="item-content">{{userData.jiguo_groupname}}</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span='24'>
                  <div class="item-name">个人主页：</div>
                  <div class="item-content">{{userData.homepage}}</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span='12'>
                  <div class="item-name">个人介绍：</div>
                  <div class="item-content">{{userData.introduction}}</div>
              </el-col>
              <el-col :span='12'>
                  <div class="item-name">荣誉资料：</div>
                  <div class="item-content">{{userData.honor_information}}</div>
              </el-col>
          </el-row>
      </BlockBox>
      <!-- 照片库 -->
      <BlockBox :blockTitle='`照片库`'>
          <el-row>
              <swiper class="img-list" :options="swiperOption" ref="mySwiper" v-if="userData.user_img.length">
                <swiper-slide v-for="(item,index) in userData.user_img" :key="index">
                    <div class="img-item">
                        <img class="preview-img"  width="100%" :src="`http://s1.jiguo.com/${item}/230x230`" alt="" @click="openPreview(index)">
                    </div>  
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
            <div class="gray" v-else>暂无图片~</div>
          </el-row>
      </BlockBox>
      <!-- 综合评价 -->
      <BlockBox :blockTitle='`综合评价`'>
          <el-row>
              <el-col :span='24'>
                  <div class="item-name">综合评分：</div>
                  <div class="item-content">{{overall_ratingToText(userData.overall_rating)}}</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span='24'>
                  <div class="item-name">推荐语：</div>
                  <div class="item-content">{{userData.recommend_info}}</div>
              </el-col>
          </el-row>
      </BlockBox>
      <!-- 联系方式 -->
      <BlockBox :blockTitle='`联系方式`'>
          <el-row>
              <el-col :span='12'>
                  <div class="item-name">手机号：</div>
                  <div class="item-content">{{userData.tel}}</div>
              </el-col>
              <el-col :span='12'>
                  <div class="item-name">微信：</div>
                  <div class="item-content">{{userData.weixin}}</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span='24'>
                  <div class="item-name">地址信息：</div>
                  <div class="item-content">{{userData.address}}</div>
              </el-col>
          </el-row>
      </BlockBox>
      <!-- 影响力 -->
      <BlockBox :blockTitle='`影响力`'>
          <el-row class="bbtd">
              <el-col :span='24'>
                  <div class="item-name">整体报价：</div>
                  <div class="item-content">{{userData.influence_price}}</div>
              </el-col>
          </el-row>
          <div class="list-wrap">
              <div class="bbtd" v-for='(item,index) in userData.influence' :key="index">
                    <el-row>
                        <el-col :span='12'>
                            <div class="item-name">平台：</div>
                            <div class="item-content">{{item.parent_platform}}-{{item.child_platform}}</div>
                        </el-col>
                        <el-col :span='12'>
                            <div class="item-name">地址/账号名：</div>
                            <div class="item-content">{{item.address}}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='12'>
                            <div class="item-name">粉丝/浏览量：</div>
                            <div class="item-content">{{item.fans_num}}</div>
                        </el-col>
                        <el-col :span='12'>
                            <div class="item-name">媒体报价：</div>
                            <div class="item-content">{{item.media_price}}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='24'>
                            <div class="item-name">极果折扣价：</div>
                            <div class="item-content">{{item.jiguo_price}}</div>
                        </el-col>
                    </el-row>
                </div>
          </div>
      </BlockBox>
      <!-- 领域 -->
      <BlockBox :blockTitle='`领域`'>
          <el-row>
              <el-col :span='12'>
                  <div class="item-name">主打领域：</div>
                  <div class="item-content">{{main_area_str}}</div>
              </el-col>
              <el-col :span='12'>
                  <div class="item-name">跨界领域：</div>
                  <div class="item-content">{{minor_area_str}}</div>
              </el-col>
          </el-row>
      </BlockBox>
      <!-- 内容能力 -->
      <BlockBox :blockTitle='`内容能力`'>
          <el-row>
              <el-col :span='12' v-for='(item,index) in userData.content' :key="index" v-if='item.title'>
                  <div class="item-name">{{item.title}}：</div>
                  <div class="item-content">{{item.content}}</div>
              </el-col>
          </el-row>
      </BlockBox>
      <!-- 配合度 -->
      <BlockBox :blockTitle='`配合度`'>
          <el-row>
              <el-col :span='12'>
                  <div class="item-name">急稿支持：</div>
                  <div class="item-content">{{userData.cooperate_urgent_draft}}</div>
              </el-col>
              <el-col :span='12'>
                  <div class="item-name">改稿配合：</div>
                  <div class="item-content">{{userData.cooperate_edit_draft}}</div>
              </el-col>
          </el-row>
      </BlockBox>
      <!-- 商业能力 -->
      <BlockBox :blockTitle='`商业能力`'>
          <el-row>
              <el-col :span='12' v-for='(item,index) in userData.business' :key="index" v-if='item.title'>
                  <div class="item-name">{{item.title}}：</div>
                  <div class="item-content">{{item.content}}</div>
              </el-col>
          </el-row>
      </BlockBox>
      <!-- 极果试用信息 -->
      <BlockBox :blockTitle='`极果试用信息`'>
          <div slot="head" style="width:700px;float:right;">
            <span v-if='userData.juid'>关联uid：{{userData.juid}}</span>
        </div>
        <span class="gray" v-if='!userData.juid'>暂无试用信息~</span>
        <div v-else style="width:100%;">
            <el-row>
                <el-col :span="12">平均产出时间: <span class="red ft16">{{userData.blog_avg_time}}</span>天</el-col>
                <el-col :span="12">平均分: <span class="red ft16">{{userData.blog_avg_score}}</span>分</el-col>
            </el-row>
            <el-row>
                <el-col :span="12">中签数/申请: <span>{{`${userData.win_num}/${userData.apply_num}`}}</span></el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <a :href="`javascript:;`" class="blue" @click="winHistoryShow=true">中签历史</a>
                    <i class="blue">&nbsp;·&nbsp;</i>
                    <a :href="`javascript:;`" class="blue" @click="blogListShow=true">报告列表</a>
                </el-col>
            </el-row>
        </div>
      </BlockBox>
      <!-- 家居信息 -->
      <BlockBox :blockTitle='`家居信息`'>
          <el-row>
              <el-col :span='12'>
                  <div class="item-name">家庭信息：</div>
                  <div class="item-content">{{userData.home.home_info}}</div>
              </el-col>
              <el-col :span='12'>
                  <div class="item-name">家居大小：</div>
                  <div class="item-content">{{userData.home.home_size}}</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span='12'>
                  <div class="item-name">装修风格：</div>
                  <div class="item-content">{{userData.home.home_style}}</div>
              </el-col>
              <el-col :span='12'>
                  <div class="item-name">客厅大小：</div>
                  <div class="item-content">{{userData.home.room_size}}</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span='12'>
                  <div class="item-name">厨房大小：</div>
                  <div class="item-content">{{userData.home.kitchen_size}}</div>
              </el-col>
              <el-col :span='12'>
                  <div class="item-name">主卧大小：</div>
                  <div class="item-content">{{userData.home.bedroom_size}}</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span='24'>
                  <div class="item-name">子女信息：</div>
                  <div class="item-content">{{userData.home.home_has_child==0?'没有':'有'}}<span class="ml10">{{userData.home.child_info}}</span></div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span='24'>
                  <div class="item-name">宠物信息：</div>
                  <div class="item-content">{{userData.home.home_has_pet==0?'没有':'有'}}<span class="ml10">{{userData.home.pet_info}}</span></div>
              </el-col>
          </el-row>
      </BlockBox>
      <!-- 其他信息 -->
      <BlockBox v-for='(block,i) in userData.other' :key="i" :blockTitle='block.title' v-if="block.title">
          <el-row>
              <el-col :span='24' v-for="(item,j) in block.content" :key="j">
                  <div class="item-name">{{item.title}}：</div>
                  <div class="item-content">{{item.content}}</div>
              </el-col>
          </el-row>
      </BlockBox>

      <!-- 中签历史 -->
      <WinHistory :winHistoryShow='winHistoryShow' :juid='userData.juid' @closeWinHistory="changeWinHistory"/>

      <!-- 报告列表 -->
      <BlogList :blogListShow='blogListShow' :juid='userData.juid' @closeBlogList="changeBlogList"/>
  </div>
</template>

<script>
import BlockBox from 'components/block-box/block-box'
import WinHistory from 'components/win-history/win-history'
import BlogList from 'components/blog-list/blog-list'
export default {
    props: {
        userData: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            img_preview_list: [],
            winHistoryShow: false,
            blogListShow: false,
            swiperOption: {
                slidesPerView: 6,
                spaceBetween: 20,
                freeMode: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            initData: {
                user_img: []
            }
        }
    },
    computed: {
        main_area_str () {
            let main_area_str = ''
            if (this.userData.main_area.length) {
                main_area_str = this.userData.main_area.join(',')
            }
            return main_area_str
        },
        minor_area_str () {
            let minor_area_str = ''
            if (this.userData.main_area.length) {
                minor_area_str = this.userData.minor_area.join(',')
            }
            return minor_area_str
        }
    },
    created () {
        this.initImgData()
    },
    methods: {
        initImgData () {
            this.initData = this.userData
        },
        changeWinHistory (data) {
            this.winHistoryShow = data.winHistoryShow
        },
        changeBlogList (data) {
            this.blogListShow = data.blogListShow
        },
        openPreview (index) {
            this.$preview.open(index, this.img_preview_list, { bgOpacity: 0.6, captionEl: false, fullscreenEl: false, shareEl: false, history: false, pinchToClose: false, closeOnScroll: false, closeOnVerticalDrag: false })
        },
        sexToText (sex) {
            switch (sex) {
                case '1':
                    return '女'
                    break;
                case '2':
                    return '男'
                    break;
                default:
                    return '暂无'
            }
        },
        overall_ratingToText (score) {
            switch (score) {
                case '10':
                    return '10 Title顶级+吉祥物一样的存在'
                    break;
                case '9':
                    return '9 Title+产出能力都高'
                    break;
                case '8':
                    return '8 Title好+产出需要协助'
                    break;
                case '7':
                    return '7 基本无Title+产出能力好'
                    break;
                case '6':
                    return '6 暂不符合商业需求'
                    break;
            }
        }
    },
    components: {
        BlockBox,
        WinHistory,
        BlogList
    },
    watch: {
        'initData.user_img': function (newVal) {
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
.el-row {
  width: 100%;
}
.el-col {
  margin: 10px 0;
}
.bbtd {
  width: 100%;
  border-bottom: 1px dashed #f0f0f0;
}
.list-wrap {
  width: 100%;
  .bbtd {
    &:last-of-type {
      border-bottom: none;
    }
  }
}
.item-name {
  float: left;
  width: 100px;
}
.item-content {
  width: auto;
  margin-left: 100px;
}
.img-list {
  .img-item {
    width: 120px;
  }
  img {
    width: 100%;
    cursor: pointer;
  }
}
</style>

