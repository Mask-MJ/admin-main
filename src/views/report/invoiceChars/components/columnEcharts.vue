<script setup lang="ts">
  import type { EChartsOption } from 'echarts';
  import type { ReportTrendItem } from '@/api/modules/types/report.type';
  import { useECharts } from '@/utils/useECharts';
  import { getInvoiceCensusInfo } from '@/api/modules/report';

  //图表
  const columnEchartsRef = ref();
  const { setOptions } = useECharts(columnEchartsRef);

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
    xAxis: {
      type: 'category',
      data: [] as string[],
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      // {
      //   name: 'Email',
      //   type: 'bar',
      //   stack: 'Total',
      //   data: [120, 132, 101, 134, 90, 230, 210],
      // },
    ] as ReportTrendItem[],
  });

  // 按钮值 默认月统计status:1
  const value = ref(1);
  // 切换时间范围 月/年 , 点击时触发getOptionsData重新获取数据
  // 当点击就意味着status: value.value已经改变,因为v-model:value="value"
  const handelChange = () => {
    getOptionsData();
  };

  const getOptionsData = async () => {
    const result = await getInvoiceCensusInfo({ status: value.value });
    // console.log(result);
    result.data.forEach((item: any) => {
      item.type = 'bar';
      // console.log(item);
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
      <div class="text-18px">开票月/年度统计趋势</div>
      <div>
        <n-radio-group v-model:value="value" @update:value="handelChange">
          <n-radio-button :value="1" label="月统计" />
          <n-radio-button :value="2" label="年统计" />
        </n-radio-group>
      </div>
    </div>
    <div ref="columnEchartsRef" class="w-full h-280px p-4"></div>
  </div>
</template>

<style lang="" scoped></style>
