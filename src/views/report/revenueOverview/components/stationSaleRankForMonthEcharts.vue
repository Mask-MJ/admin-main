<script setup lang="ts">
  import type { EChartsOption } from 'echarts';
  import type { StationSaleRankForMonthItem } from '@/api/modules/types/report.type';
  import { useECharts } from '@/utils/useECharts';
  import { getStationSaleRankForMonth } from '@/api/modules/report';

  // 图表
  const stationSaleRankForMonthEchartsRef = ref();
  const { setOptions } = useECharts(stationSaleRankForMonthEchartsRef);

  const options = ref({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: 'category',
      data: [] as string[],
    },
    series: [
      {
        name: '2011',
        type: 'bar',
        data: [],
      },
    ] as StationSaleRankForMonthItem[],
  });

  // 按钮值 默认月统计status:1
  const value = ref(1);
  // 切换时间范围 月/年 , 点击时触发getOptionsData重新获取数据
  // 当点击就意味着status: value.value已经改变,因为v-model:value="value"
  const handelChange = () => {
    getOptionsData();
  };

  const getOptionsData = async () => {
    const result = await getStationSaleRankForMonth({ status: value.value });
    // console.log(result);
    result.data.forEach((item: any) => {
      item.type = 'bar';
    });
    // console.log(result);
    options.value.series = result.data;
    options.value.yAxis.data = result.title;

    setOptions(options.value as EChartsOption);
  };
  onMounted(() => {
    getOptionsData();
  });
</script>

<template>
  <div>
    <div class="flex-between">
      <div class="text-18px">本月充电站销售额前十排名</div>
      <div>
        <n-radio-group v-model:value="value" @update:value="handelChange">
          <n-radio-button :value="0" label="正序" />
          <n-radio-button :value="1" label="倒序" />
        </n-radio-group>
      </div>
    </div>
    <div ref="stationSaleRankForMonthEchartsRef" class="w-full h-450px p-4"></div>
  </div>
</template>

<style scoped></style>
