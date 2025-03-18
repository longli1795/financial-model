<template>
  <div class="prediction-container">
    <el-container>
      <el-header>财务预测模型</el-header>
      <el-main>
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>现金流预测</span>
            </div>
          </template>
          <div class="chart-container">
            <!-- 预留图表位置 -->
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.prediction-container {
  padding: 20px;
}
.chart-container {
  height: 400px;
}
</style>