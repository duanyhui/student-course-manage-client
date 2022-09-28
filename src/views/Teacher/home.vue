<template>
  <div>
    <el-container>
      <el-main>
        <h1>teacher home</h1>
        <info-card></info-card>
        <el-card style="width: 100%; margin-top: 10px">
          <p><i class="el-icon-s-custom" style="margin-right: 18px">Created By 段宇辉</i></p>
          <p><i class="el-icon-s-flag" style="margin-right: 18px">前后端分离，基于Springboot和Vue，数据库使用Mysql，数据库ORM框架采用Mybatis-Plus</i>
          </p>

        </el-card>
        <logout></logout>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Logout from "@/components/logout";
import InfoCard from "@/components/infoCard";

export default {
  name: "home",
  components: {InfoCard, Logout},
}
</script>

<style scoped>

</style>