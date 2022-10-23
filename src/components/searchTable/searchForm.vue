<template>
  <el-form :label-width="labelWidth" label-position="right" size="small" class="search-form">
    <el-container>
      <el-row ref="target" type="flex" class="search-form_row">
        <slot></slot>
        <div class="el-form-item el-form-item--small">
          <div class="el-form-item__content">
            <el-button type="primary" size="small" @click="$emit('query')">查 询</el-button>
            <el-button size="small" v-if="$slots.default" @click="$emit('reset')">重 置</el-button>
          </div>
        </div>
      </el-row>
    </el-container>
  </el-form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    labelWidth: {
      type: String,
      default: '70px'
    },
  }
}
</script>