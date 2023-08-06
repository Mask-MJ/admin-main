<script setup lang="ts">
  import { useECharts } from '@/utils/useECharts';
  import type { EChartsOption } from 'echarts';
  import { getTrend } from '@/api/modules/report';
  import type { ReportTrendItem } from '@/api/modules/types/report.type';

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
      // const result = await getTrend(time);
      // // console.log(result);
      // result.data.forEach((item) => {
      //   item.type = 'line';
      //   item.stacl = 'Total';
      //   options.value.legend.data.push(item.name);
      //   // console.log(item.name);
      // });
      // // console.log(result);
      // options.value.series = result.data;
      // options.value.xAxis.data = result.time;

      // setOptions(options.value as EChartsOption);
    }
  };

  // 图表
  const lineEchartsRef = ref();
  const { setOptions } = useECharts(lineEchartsRef);

  // 图表数据
  // 图表引用例子 https://echarts.apache.org/examples/zh/editor.html?c=line-stack

  // 图表数据
  const options = ref({
    // title: {
    //   text: '充电收入趋势',
    // },
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
      //   stack: 'Total',
      //   data: [120, 132, 101, 134, 90, 230, 210],
      // },
    ] as ReportTrendItem[],
  });

  // 发送请求 获取图表数据
  const getOptionsData = async (params?: any) => {
    const result = await getTrend(params);
    // console.log(result);
    result.data.forEach((item) => {
      item.type = 'line';
      options.value.legend.data.push(item.name);
      // console.log(item.name);
    });
    // console.log(result);
    options.value.series = result.data;
    options.value.xAxis.data = result.time;
    // options.value.legend.data = result.data.map((item) => item.name);
    // console.log(result);

    setOptions(options.value as EChartsOption);
  };

  onMounted(() => {
    getOptionsData();
  });
</script>

<template>
  <div>
    <div class="flex-between">
      <div class="text-18px">充电收入趋势</div>

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

<style scoped></style>
