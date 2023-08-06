<script setup lang="ts">
  import type { EChartsOption } from 'echarts';
  import type { StationSaleRankForMonthItem } from '@/api/modules/types/report.type';
  import { useECharts } from '@/utils/useECharts';
  import { getStationSaleRank } from '@/api/modules/report';

  // 图表
  const stationSaleEchartsRef = ref();
  const { setOptions } = useECharts(stationSaleEchartsRef);

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
    const result = await getStationSaleRank({ status: value.value });
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

  const obj = {
    data: [{ a: 2 }],
    time: ['ghhghh'],
    tite: [1],
    datadd: [
      {
        cc: 2,
        g: { gg: 333, qq: [{ name: 'hmj' }] },
      },
      {
        cc: 2,
        g: { gg: 333, qq: [{ name: 'hmj' }] },
      },
      {
        cc: 2,
        g: { gg: 333, qq: [{ name: 'hmj' }] },
      },
    ],
  };

  obj.datadd.forEach((item) => {
    item.g.qq[0].name = 'lj';
  });

  // obj.datadd[2].g.qq[0].name = 'lj';

  // interface OBJ {
  //   data: {
  //     a: number;
  //   }[];
  //   time: string[];
  //   tit: number[];
  //   datadd: obj2[];
  // }
  // interface obj2 {
  //   cc: number;
  //   g: {
  //     cd: number;
  //   };
  // }
</script>

<template>
  <div>
    <div class="flex-between">
      <div class="text-18px">充电站销售额前十排名</div>
      <div>
        <n-radio-group v-model:value="value" @update:value="handelChange">
          <n-radio-button :value="1" label="正序" />
          <n-radio-button :value="2" label="倒序" />
        </n-radio-group>
      </div>
    </div>
    <div ref="stationSaleEchartsRef" class="w-full h-450px p-4"></div>
  </div>
</template>

<style scoped></style>
