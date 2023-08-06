<script setup lang="ts">
  import type { EChartsOption } from 'echarts';
  import type { ReportTrendItem } from '@/api/modules/types/report.type';
  import { useECharts } from '@/utils/useECharts';
  import { getInvoiceStatisticsTrend } from '@/api/modules/report';

  // 时间范围
  const range = ref();
  // 改变时间范围
  const onChange = async (e: any) => {
    if (!e) {
      getOptionsData();
    } else {
      // console.log(e);
      const time = {
        beginTime: e[0],
        endTime: e[1],
      };
      // console.log(time);
      getOptionsData(time);
    }
  };

  // 图表
  const lineEchartsRef = ref();
  const { setOptions } = useECharts(lineEchartsRef);
  // 图表数据
  // 图表引用例子 https://echarts.apache.org/examples/zh/editor.html?c=line-stack
  const options = ref({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: [] as string[],
      // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [] as string[],
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      // {
      //   name: 'Email',
      //   type: 'line',
      //   stack: 'Total',//堆叠样式
      //   data: [120, 132, 101, 134, 90, 230, 210],
      // },
    ] as ReportTrendItem[],
  });

  // 发送请求 获取图表数据
  const getOptionsData = async (params?: any) => {
    const result = await getInvoiceStatisticsTrend(params);
    // console.log(result);
    result.data.forEach((item: any) => {
      item.type = 'line';
      options.value.legend.data.push(item.name);
    });
    options.value.series = result.data;
    options.value.xAxis.data = result.time;
    setOptions(options.value as EChartsOption);
  };

  onMounted(() => {
    getOptionsData();
  });
</script>

<template>
  <div>
    <div class="flex-between">
      <div class="text-18px">开票日统计趋势 </div>

      <n-space justify="end">
        <n-date-picker
          v-model:formatted-value="range"
          format="yyyy-MM-dd"
          type="daterange"
          clearable
          @update:formatted-value="onChange"
        />
      </n-space>
    </div>

    <div ref="lineEchartsRef" class="w-full h-300px"></div>
  </div>
</template>

<style lang="" scoped></style>
