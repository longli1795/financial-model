<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <el-row :gutter="20" class="mb-4">
        <el-col :span="8">
          <el-card shadow="hover" class="stat-card income-card">
            <h3>季度营收</h3>
            <div class="stat-value">¥ 2,450万</div>
            <div class="stat-trend positive">↑ 12% 环比增长</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="stat-card expense-card">
            <h3>运营成本</h3>
            <div class="stat-value">¥ 980万</div>
            <div class="stat-trend negative">↑ 5% 环比增加</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="stat-card profit-card">
            <h3>净利润</h3>
            <div class="stat-value">¥ 1,230万</div>
            <div class="stat-trend positive">↑ 8% 环比增长</div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-card class="chart-card">
            <div id="revenueChart" style="height: 400px"></div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="indicator-card">
            <h3 class="card-title">关键财务指标</h3>
            <el-table :data="financialIndicators" style="width: 100%" border class="mb-4">
              <el-table-column prop="name" label="指标" width="120"/>
              <el-table-column prop="value" label="数值" align="right"/>
            </el-table>
            <h3 class="card-title mt-6">预测指标</h3>
            <el-table :data="summaryData" style="width: 100%" border>
              <el-table-column prop="name" label="项目" width="120"/>
              <el-table-column prop="value" label="预测值" align="right"/>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const summaryData = [
  { name: '预测收入', value: '--' },
  { name: '预测成本', value: '--' },
  { name: '预测利润', value: '--' }
]

const financialIndicators = ref([
  { name: '流动比率', value: '2.3' },
  { name: '资产负债率', value: '45%' },
  { name: '净资产收益率', value: '18%' },
  { name: '总资产周转率', value: '0.8' },
  { name: '存货周转天数', value: '45天' },
  { name: '应收账款周转率', value: '6.2' }
])

onMounted(() => {
  initChart()
})

const initChart = () => {
  const chartDom = document.getElementById('revenueChart')
  if (!chartDom) return
  
  const chart = echarts.init(chartDom)
  chart.setOption({
    title: { 
      text: '收入预测趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '收入',
      type: 'line',
      data: [1200, 2000, 1500, 800],
      smooth: true,
      itemStyle: {
        color: '#409EFF'
      }
    }]
  })
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;

  .stat-card {
    border-radius: 8px;
    h3 {
      color: #606266;
      margin-bottom: 12px;
    }
    .stat-value {
      font-size: 24px;
      font-weight: 500;
      margin: 8px 0;
    }
    .stat-trend {
      font-size: 12px;
      &.positive { color: #67c23a; }
      &.negative { color: #f56c6c; }
    }
  }

  .chart-card {
    border-radius: 8px;
    :deep(.el-card__body) {
      padding: 0;
    }
  }

  .indicator-card {
    .card-title {
      color: #303133;
      margin-bottom: 15px;
    }
  }
}

.chart-wrapper {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.summary-box {
  margin-bottom: 20px;
  border-radius: 8px;
}

.el-table {
  margin-top: 15px;
}

h3 {
  color: #303133;
  margin-bottom: 15px;
}
</style>