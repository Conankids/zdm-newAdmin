<template>
  <el-dialog
    :visible.sync="show"
    width="800px"
    @open="handleOpen"
    @close="handleClose">
    <div class="layer-title" v-if="order_list_data && order_list_data.order_list" slot="title">共中签{{order_list_data.win_num}}次，中签总金额{{order_list_data.win_amount}}元</div>
    <div class="layer-title" v-else slot="title">中签历史</div>
    <div class="list-wrap" v-if="order_list_data && order_list_data.order_list">
        <ul>
            <li v-for="(item,index) in order_list" :key="index">
                <BlockBox>
                    <div class="item-head" slot="head" style="width:100%;">
                        <span>订单号：{{item.orderid}}</span>
                        <span class="ml10">下单时间：{{item.addtime}}</span>
                        <span class="fr">{{orderStatusText(item)}}</span>
                    </div>
                    <div class="item-content">
                        <el-row class="item-title-wrap">
                            <strong class="item-title">{{item.title}}</strong>
                            <div class="fr">
                                <span>总金额：<span class="red"> {{item.price}} </span></span>
                                <span>押金：<span class="red"> {{item.deposit}} </span></span>
                            </div>
                        </el-row>
                        <el-row>
                            <span>{{item.spec_name}}</span>
                        </el-row>
                        <el-row>
                            <span>{{item.username}}</span>
                            <span class="ml10">支付方式：{{item.payment=='ali'?'支付宝':'微信'}}</span>
                            <span class="ml10">极果用户名：{{item.jiguo_name}}</span>
                        </el-row>
                        <el-row>
                            <span>{{item.tel}}</span>
                        </el-row>
                        <el-row>
                            <span>{{item.remarks}}</span>
                        </el-row>
                        <el-row>
                            <span>{{item.province+item.city+item.county+item.address}}</span>
                            <div class="fr">
                                <a :href="`/admin2/work/UserProfile?uid=${item.uid}`" class="blue" target="_blank">用户</a><i class="blue">·</i>
                                <a :href="`/admin2/work/OrderDetail/orderid/${item.orderid}`" class="blue" target="_blank">查看订单</a>
                                <span v-if='item.blogid'>
                                    <i class="blue">·</i>
                                    <a class="blue" :href="item.url" target="_blank">查看报告</a>
                                </span>
                            </div>
                        </el-row>
                    </div>
                </BlockBox>
            </li>
        </ul>
    </div>
    <div class="list-wrap" v-else v-loading="loading">
        <ul>
            <div class="gray tc mt20">暂无中签历史。。。</div>
        </ul>
    </div>
</el-dialog>
</template>

<script>
import qs from 'qs'
import BlockBox from 'components/block-box/block-box'
export default {
    props: {
        winHistoryShow: {
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
            order_list_data: null,
            show: false,
            loading: true
        }
    },
    computed: {
        order_list() {
            const list = [...this.order_list_data.order_list]
            return list
        }
    },
    methods: {
        handleOpen() {
            this.$http({
                method: 'post',
                url: '/admin/vip/WinHistory',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                data: qs.stringify({ juid: this.juid })
            }).then(res => {
                res = res.data
                if (res.resultCode === "0") {
                    this.order_list_data = res.result
                } else {
                    this.$message.error(res.errorMsg)
                }
                this.loading = false
            }).catch(error => {
                this.$message.error('获取数据错误')
                this.loading = false
            })
        },
        handleClose() {
            this.$emit('closeWinHistory', { winHistoryShow: false })
        },
        orderStatusText(order) {
            let ost = ''
            const status = order.status
            const refund_type = order.refund_type
            if (status == -7) {
                if (refund_type == 1) {
                    ost = '待退押金'
                } else if (refund_type == 2) {
                    ost = '待退全额'
                }
            } else if (status == -6) {
                ost = '待回收产品'
            } else if (status == -5) {
                ost = '临时订单'
            } else if (status == -4) {
                ost = '已删除'
            } else if (status == -3) {
                ost = '已取消'
            } else if (status == -2) {
                ost = '已关闭'
            } else if (status == 0) {
                ost = '待支付'
            } else if (status == 1) {
                ost = '待发货'
            } else if (status == 2) {
                ost = '待回收产品'
            } else if (status == 3) {
                ost = '待提报告'
            } else if (status == 4) {
                ost = '报告待审核'
            } else if (status == 5) {
                if (refund_type == 1) {
                    ost = '待退押金'
                } else if (refund_type == 2) {
                    ost = '待退全额'
                }
            } else if (status == 6) {
                ost = '强制完成'
            } else if (status == 7) {
                ost = '订单完成'
            }
            return ost
        }
    },
    components: {
        BlockBox
    },
    watch: {
        winHistoryShow() {
            this.show = this.winHistoryShow
        }
    }

}
</script>

<style lang="less">
.layer-title {
  font-size: 20px;
  line-height: 20px;
  color: #000;
}
.el-dialog__body {
  padding: 0 20px 20px;
}
.el-dialog__header {
  border-bottom: 1px solid #f0f0f0;
}
.item-head {
  color: #999;
}
.block-wrap {
  margin-top: 0;
}
.item-content {
  width: 100%;
}
.list-wrap {
  ul {
    height: 450px;
    overflow-y: auto;
  }
}
.item-title-wrap {
  line-height: 40px;
  .item-title {
    color: #000;
    font-size: 18px;
  }
}

i {
  &.blue {
    margin: 0 5px;
  }
}
</style>

