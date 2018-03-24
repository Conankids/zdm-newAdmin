<template>
  <el-dialog
    :visible.sync="show"
    width="800px"
    @open="handleOpen"
    @close="handleClose">
    <div class="layer-title" slot="title">报告列表</div>
    <div class="list-wrap" v-if="blog_list_data && blog_list_data.length">
        <ul>
            <li v-for="(item,index) in blog_list_data" :key="index">
                <div class="item-left">
                    <img :src="`http://s1.jiguo.com/${item.cover}/230x230`" alt="">
                </div>
                <div class="item-right">
                    <div class="item-title">
                        <a :href="item.url" target="_blank">{{item.title}}</a>
                    </div>
                    <div class="item-msg">{{item.message}}</div>
                    <p>作者：<span class="red">{{item.author}}</span></p>
                    <div class="item-bottom">
                        <a class="blue" :href="item.url" target="_blank">预览</a>
                        <span class="fr gray">{{item.addtime}}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="list-wrap" v-else v-loading="loading">
        <ul>
            <div class="gray tc mt20">暂无报告。。。</div>                
        </ul>
    </div>
</el-dialog>
</template>

<script>
import qs from 'qs'
export default {
    props: {
        blogListShow: {
            type: Boolean,
            default: false
        },
        juid: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            blog_list_data: null,
            show: false,
            loading: true
        }
    },
    methods: {
        handleOpen() {
            this.$http({
                method: 'post',
                url: '/admin/vip/GetUserLinkBlog',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                data: qs.stringify({ juid: this.juid, limit: 0 })
            }).then(res => {
                res = res.data
                if (res.resultCode === "0") {
                    this.blog_list_data = res.result
                } else {
                    this.$message.error(res.errorMsg)
                }
                this.loading = false
            }).catch(error => {
                this.$message.error('获取数据错误')
            })
        },
        handleClose() {
            this.$emit('closeBlogList', { blogListShow: this.show })
        }
    },
    components: {
    },
    watch: {
        blogListShow() {
            this.show = this.blogListShow
        }
    }

}
</script>

<style lang="less" scoped>
.list-wrap{
    li{
        padding: 20px 0;
        overflow: hidden;
        border-bottom: 1px dashed #f0f0f0;
    }
}
  .item-left {
    width: 130px;
    height: 130px;
    float: left;
    img {
      width: 100%;
    }
  }
  .item-right{
      margin-left: 150px;
  }
  .item-title{
      line-height: 40px;
      font-size: 18px;
      a{
          color: #000;
          font-weight: 600;
      }
  }
  .item-msg{
      line-height: 25px;
      max-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
  }
  .item-bottom{
      margin-top: 10px;
  }
</style>

