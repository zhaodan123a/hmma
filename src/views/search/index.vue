<template>
  <div>
    <!-- 搜索界面 -->
    <!-- 搜索框 -->
    <van-search
      v-model="searchvalue"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- 关键字 -->
    <van-cell-group>
      <van-cell :value="item" v-for="(item,index) in keysearch" :key="index" @click="onSearch(item)">
        <!-- 关键字高亮，使用插槽 -->
        <!-- 使用v-html绑定事件，传入关键字内容和搜索框内容 -->
        <div slot="title" v-html="highkey(item,searchvalue)"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// 导入搜索框请求
import { getsearch } from '@/api/search.js'
// 引入消抖函数
import { debounce } from '@/utils/debounce.js'
export default {
  name: 'search',
  data () {
    return {
      // 搜索框输入的数据
      searchvalue: '',
      // 关键字数组
      keysearch: []
    }
  },
  watch: {
    // 因为一边输入一边会频繁请求，对性能不好，所以使用消抖函数
    searchvalue: debounce(async function (newVal, oldVal) {
      // 变化时发送请求
      // 如果输入框为空时会报错，所以为空时直接返回即可
      // 需要去除搜索框中两边空格
      newVal = newVal.trim()
      if (newVal === '') {
        return
      }
      try {
        const data = await getsearch(newVal)
        // console.log(data)
        // 将结果赋值
        this.keysearch = data.options
      } catch (error) {
        console.dir(error)
      }
    }, 800)
    // 监测搜索框内容变化时将会显示相关关键字
    // async searchvalue (newVal, oldVal) {
    //   // 变化时发送请求
    //   // 如果输入框为空时会报错，所以为空时直接返回即可
    //   if (newVal === '') {
    //     return
    //   }
    //   try {
    //     const data = await getsearch(this.searchvalue)
    //     console.log(data)
    //     // 将结果赋值
    //     this.keysearch = data.options
    //   } catch (error) {
    //     console.dir(error)
    //   }
    // }
  },
  methods: {
    // 关键字高亮事件
    highkey (cell, value) {
      console.log(cell)
      // 将关键字转成小写，再通过关键字进行分割，最后通过join以关键字（颜色不一样）进行连接
      return cell
        .toLowerCase()
        .split(value)
        .join(`<span style='color:red'>${value}</span>`)
    },
    // 回车时搜索事件
    // 传入搜索框内容
    onSearch (keywords) {
      // 跳转到搜索结果页面
      this.$router.push(`/search-results/${keywords}`)
      // 或者使用name和params
    //   this.$router.push({ name: 'search-results', params: { keywords } })
    },
    // 取消时事件
    onCancel () {}
  }
}
</script>

<style lang="less" scoped>
</style>
