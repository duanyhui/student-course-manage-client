<template>
  <div>
    <el-container>
      <el-main>
        <h1>admin home</h1>
        <el-card style="width: 40%">

          <p><i class="el-icon-s-custom" style="margin-right: 18px">Created By 段宇辉 肖阳 高向宏</i></p>
          <p><i class="el-icon-s-flag" style="margin-right: 18px">前后端分离，基于Springboot和Vue，数据库使用Mysql，数据库ORM框架采用Mybatis-Plus</i></p>
          <p><i class="el-icon-s-comment" style="margin-right: 18px">项目开源地址：<a href="https://github.com/duanyhui/student-course-manage-client">前端</a>、<a href="https://github.com/duanyhui/student-course-manage">后端</a> </i></p>

        </el-card>
        <logout></logout>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Logout from "@/components/logout";
export default {
  name: "home",
  components: {Logout},
}
</script>

<style scoped>

</style>