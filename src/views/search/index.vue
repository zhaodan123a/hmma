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
  <van-cell  value="内容" />
  <van-cell  value="内容"  />
</van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      searchvalue: ''
    }
  },
  methods: {
    // 回车时搜索事件
    onSearch () {},
    // 取消时事件
    onCancel () {}
  }
}
</script>

<style lang="less" scoped>
</style>
