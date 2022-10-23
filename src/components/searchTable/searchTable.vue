<template>
  <el-container class="search-table">
    <el-header class="search-table__header" v-if="$slots.row">
      <search-form ref="form"
                   :label-width="labelWidth"
                   @query="$emit('query')"
                   @reset="$emit('reset')">
        <template>
          <slot name="row"></slot><!-- 搜索条件 & 按钮 -->
        </template>
      </search-form>
    </el-header>
    <el-main class="search-table__body">
      <el-row ref="actions" v-if="$slots.actions" class="search-table__action">
        <el-col :span="24">
          <slot name="actions"></slot><!-- 操作按钮 -->
        </el-col>
      </el-row>
      <el-table ref="tableRef" :height="tableHeight"
                :data="tableData"
                :empty-text="emptyText"
                stripe
                border
                highlight-current-row
                :row-class-name="rowClassName"
                tooltip-effect="light"
                :header-cell-style="{ fontWeight: 'bold' }"
                size="mini"
                :row-key="rowKeys"
                v-loading="tableLoading"
                :default-sort="defaultSort"
                @sort-change="handleSortChange"
                @selection-change="
                    selection => {
                        this.$emit('selectionChange', selection)
                    }"
                @select-all="
                    selection => {
                        this.$emit('selectAll', selection)
                    }"
      >
        <slot></slot>
      </el-table>
    </el-main>
    <el-footer class="search-table__footer" height="42px" v-if="$slots.footer">
      <slot name="footer"></slot>
    </el-footer>
  </el-container>
</template>

<script>
import SearchForm from './searchForm'

export default {
  name: 'SearchTable',
  components: { SearchForm },
  props: {
    labelWidth: {
      type: String,
      default: '70px'
    },
    tableData: {
      type: Array,
      default: () => []
    },
    emptyText: {
      type: String,
      default: ''
    },
    rowClassName: {
      type: Function
    },
    rowKeys: {
      type: Function
    },
    tableLoading: Boolean,
    defaultSort: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      tableHeight: '200px' //table表格高度
    }
  },
  methods: {
    // 表格排序
    handleSortChange(event) {
      const { prop, order } = event
      this.$emit('sortChange', {
        prop,
        order: order ? String.prototype.replace.call(order, 'ending', '') : null
      })
    }
  }
}
</script>