<script setup lang="ts">
  import type { EChartsOption } from 'echarts';
  import type { StartModeProportion } from '@/api/modules/types/report.type';
  import { useECharts } from '@/utils/useECharts';
  import { getStartModeProportion } from '@/api/modules/report';

  // 图表
  const pieEchartsRef = ref();
  const { setOptions } = useECharts(pieEchartsRef);
  const options = ref({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          // { value: 1048, name: 'Search Engine' }
        ] as StartModeProportion[],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });

  // 按钮值 默认月统计status:0
  const value = ref(0);
  // 切换时间范围 月/年 , 点击时触发getOptionsData重新获取数据
  // 当点击就意味着status: value.value已经改变,因为v-model:value="value"
  const handelChange = () => {
    getOptionsData();
  };

  const getOptionsData = async () => {
    const result = await getStartModeProportion({ status: value.value });
    // console.log(result);
    options.value.series[0].data = result;
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
      <div class="text-18px">充电启动充电方式占比</div>
      <div>
        <n-radio-group v-model:value="value" @update:value="handelChange">
          <n-radio-button :value="0" label="今日" />
          <n-radio-button :value="1" label="本月" />
          <n-radio-button :value="2" label="本年度" />
        </n-radio-group>
      </div>
    </div>
    <div ref="pieEchartsRef" class="w-full h-280px p-4"></div>
  </div>
</template>

<style scoped></style>
