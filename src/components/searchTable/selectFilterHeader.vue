<template>
  <el-popover
      placement="bottom"
      width="200"
      trigger="manual"
      v-model="visible"
      @show="showPopover"
      popper-class="charge-item-header-popover"
  >
    <el-input
        prefix-icon="el-icon-search"
        placeholder="请输入"
        v-model="value"
        @input="confirm"
        @keyup.enter.native="confirm"
        ref="sInput"
        style="padding: 10px;"
    ></el-input>
    <ul class="filter-ul">
      <li
          @click="onCheckItem(item)"
          v-for="(item, index) in searchFilters"
          :key="index"
          :class="{ 'is-active': isActive(item) }"
      >{{item.text}}</li>
    </ul>
    <div
        slot="reference"
        style="margin-left:5px"
        @click.stop="popClick"
        v-clickoutside="closeOver"
    >
      <i class="el-icon-search"></i>
    </div>
  </el-popover>
</template>

<script>
import Clickoutside from "element-ui/src/utils/clickoutside"; // 使用elementui的 Clickoutside 指令
export default {
  inject: ["reload"],
  data() {
    return {
      value: "", // 输入框中的值
      visible: false, // 组件显示隐藏控制
      selectValue: "", // 当前选中值
      searchFilters: this.filters, // 匹配到的filters
    };
  },
  props: {
    defaultValue: {
      type: String,
      default: ""
    },
    filters: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  created() {
    if (this.filters.filter(item => item.value == "").length === 0) {
      this.filters.unshift({ text: "全部", value: "" });
    }
    this.searchFilters = this.filters;
  },
  watch: {
    // 选中 当前选中值
    defaultValue(newVal, oldVal) {
      let self = this;
      self.value = "";
      this.searchFilters = this.filters;
      self.selectValue = newVal;
    }
  },
  mounted() {
    // 解决点击输入框组件关闭问题
    this.popperElm = document.querySelector('.charge-item-header-popover')
  },
  methods: {
    // 点击当前组件之外关闭
    handleOutsideClick(e) {
      setTimeout(() => {
        this.visible = false;
      }, 16);
    },
    // filter 添加active样式
    isActive(filter) {
      return filter.value === this.selectValue;
    },
    // 选中某一项 提交父组件选中数据
    onCheckItem(item) {
      this.selectValue = item.value;
      let self = this;
      self.$emit("selectChange", self.selectValue);
      this.visible = false;
    },
    // 展示当前组件时 鼠标光标定位到输入框
    showPopover() {
      this.$nextTick(() => {
        this.$refs.sInput.focus();
      });
    },
    // 关闭当前组件
    closeOver() {
      this.visible = false;
    },
    popClick(e) {
      this.visible = !this.visible;
    },
    // 输入文字匹配对象的li项
    confirm() {
      this.searchFilters = this.filters.filter(
          item => item.text.indexOf(this.value) > -1
      );
    }
  },
  directives: {
    Clickoutside, // 引用elementui Clickoutside指令
  }
};
</script>
<style scoped>
.el-input {
  border-bottom: 1px solid #ccc;
}
.el-input--prefix /deep/ .el-input__prefix {
  left: 15px;
}
.filter-ul {
  padding: 5px 0;
  margin: 0;
  list-style: none;
  min-width: 100px;
  max-height: 300px;
  overflow: auto;
}
.filter-ul li {
  line-height: 36px;
  padding: 0 12px;
  cursor: pointer;
  font-size: 12px;
}
.filter-ul li:hover {
  background-color: #ecf5ff;
  color: #66b1ff;
}

.filter-ul li.is-active {
  background-color: #409eff;
  color: #fff;
}
</style>
<style>
.charge-item-header-popover {
  padding: 0;
}
</style>
