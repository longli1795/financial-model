<!-- 仪表盘主模板 -->
<template>
  <!-- 仪表盘容器 -->
  <div class="dashboard-container">
    <div class="dashboard-content">
      <!-- 统计卡片行 -->
      <el-row :gutter="20" class="mb-4">
        <!-- 季度营收统计卡片 -->
        <el-col :span="mobileMode ? 24 : 8">
          <el-card shadow="hover" class="stat-card income-card">
            <!-- 卡片标题 -->
            <h3>季度营收</h3>
            <!-- 统计数值 -->
            <div class="stat-value">¥ 2,450万</div>
            <!-- 趋势变化 -->
            <div class="stat-trend positive">↑ 12% 环比增长</div>
          </el-card>
        </el-col>
        <!-- 运营成本统计卡片 -->
        <el-col :span="mobileMode ? 24 : 8">
          <el-card shadow="hover" class="stat-card expense-card">
            <h3>运营成本</h3>
            <div class="stat-value">¥ 980万</div>
            <div class="stat-trend negative">↑ 5% 环比增加</div>
          </el-card>
        </el-col>
        <!-- 净利润统计卡片 -->
        <el-col :span="mobileMode ? 24 : 8">
          <el-card shadow="hover" class="stat-card profit-card">
            <h3>净利润</h3>
            <div class="stat-value">¥ 1,230万</div>
            <div class="stat-trend positive">↑ 8% 环比增长</div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <!-- 图表容器 -->
        <el-col :span="mobileMode ? 24 : 16">
          <el-card class="chart-card">
            <div id="revenueChart" :style="{ height: mobileMode ? '50vh' : '400px' }"></div>
          </el-card>
        </el-col>
        <!-- 指标卡片 -->
        <el-col :span="mobileMode ? 24 : 8">
          <el-card class="indicator-card">
            <h3 class="card-title">关键财务指标</h3>
            <el-table :data="financialIndicators" style="width: 100%" border class="mb-4">
              <el-table-column prop="name" label="指标" :width="mobileMode ? '' : '120'"/>
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
import { onMounted, ref, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chart = ref<echarts.ECharts>()
const mobileMode = ref(window.innerWidth < 768)

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

const handleResize = () => {
  mobileMode.value = window.innerWidth < 768
  chart.value?.resize()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  initChart()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

const initChart = () => {
  const chartDom = document.getElementById('revenueChart')
  if (!chartDom) return
  
  chart.value = echarts.init(chartDom)
  chart.value?.setOption({
    title: { 
      text: '收入预测趋势',
      left: 'center',
      textStyle: {
        fontSize: mobileMode.value ? 14 : 16
      }
    },
    tooltip: {
      trigger: 'axis',
      confine: true // 防止提示框溢出
    },
    grid: {
      containLabel: true,
      left: mobileMode.value ? '12%' : '8%',  // 增加左侧空间
      right: mobileMode.value ? '5%' : '3%',
      top: mobileMode.value ? 50 : 30,
      bottom: mobileMode.value ? 25 : 15
    },
    xAxis: {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4'],
      axisLabel: {
        fontSize: mobileMode.value ? 10 : 12,
        interval: 0 // 强制显示所有标签
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: mobileMode.value ? 9 : 12,
        formatter: (value: number) => {
          if (value >= 10000) return `${value / 10000}万`;
          if (value >= 1000) return `${value / 1000}k`;
          return value;
        },
        rotate: mobileMode.value ? 45 : 0,
        margin: mobileMode.value ? 15 : 8
      },
      splitLine: {
        show: mobileMode.value ? false : true
      },
      interval: mobileMode.value ? 300 : 200
    },
    series: [{
      name: '收入',
      type: 'line',
      data: [1200, 2000, 1500, 800],
      smooth: true,
      itemStyle: {
        color: '#409EFF'
      },
      label: {
        show: true,
        fontSize: mobileMode.value ? 10 : 12,
        formatter: (params: any) => {
          if (params.value >= 10000) return `${params.value / 10000}万`;
          if (params.value >= 1000) return `${params.value / 1000}k`;
          return params.value;
        }
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
}

.stat-card {
  border-radius: 8px;
  transition: transform 0.3s;
  
  h3 {
    color: #606266;
    margin-bottom: 12px;
    font-size: 16px;
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: 500;
    margin: 8px 0;
    color: #303133;
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
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 10px;
  }

  .el-col {
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-bottom: 15px;
  }

  .stat-card {
    h3 { font-size: 14px; }
    .stat-value { font-size: 20px !important; }
  }

  #revenueChart {
    width: 100% !important;
    min-width: 100%;
    padding: 0 5px !important;
  }

  .el-table {
    overflow-x: auto;
    display: block;
    
    :deep(.el-table__body-wrapper) {
      overflow-x: auto;
    }
  }

  .chart-card {
    :deep(.el-card__header) {
      padding: 12px;
    }
    
    h3 {
      font-size: 14px !important;
      padding: 0 8px;
    }
  }
}
</style>