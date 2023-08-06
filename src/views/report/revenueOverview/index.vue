<script setup lang="ts">
  import lineEcharts from './components/lineEcharts.vue';
  import columnEcharts from './components/columnEcharts.vue';
  import pieEcharts from './components/pieEcharts.vue';
  import stationSaleRankForMonthEcharts from './components/stationSaleRankForMonthEcharts.vue';
  import stationSaleRankEcharts from './components/stationSaleRankEcharts.vue';

  import { getBaseInfo } from '@/api/modules/report';
  import type { ReportBaseInfo } from '@/api/modules/types/report.type';

  const baseInfo = ref<ReportBaseInfo[]>();

  onMounted(async () => {
    const result = await getBaseInfo();
    // console.log(result);
    baseInfo.value = result;
    // console.log(map(baseInfo.value.name));
    // baseInfo.value.forEach((item: any) => {
    //   console.log(item.name);
    // });
  });
</script>

<template>
  <!-- <div>充电总览</div> -->
  <div class="p-4 h-full">
    <n-grid :x-gap="16" :y-gap="16">
      <template v-for="item in baseInfo" :key="item.name">
        <n-grid-item :span="8">
          <n-card
            class="income"
            title="今日收入"
            :segmented="{
              content: true,
              footer: 'soft',
            }"
          >
            <div>
              <div class="flex-between mb-2">
                <span class="text-20px font-00">{{ item.income?.toFixed(2) }} 元</span>
                <i class="i-ant-design:dashboard-outlined text-amber-5 text-50px"></i>
              </div>
              <div class="flex-between mb-2">
                <span>今日充电量 (度)</span>
                <span>今日订单数 (个)</span>
              </div>
              <div class="flex-between">
                <span>{{ Math.ceil(item.totalBattery) }}</span>
                <span>{{ item.orderCount }}</span>
              </div>
            </div>
          </n-card>
        </n-grid-item>
      </template>

      <!-- <n-grid-item :span="8">
        <n-card
          class="income"
          title="今日收入"
          :segmented="{
            content: true,
            footer: 'soft',
          }"
        >
          <div>
            <div class="flex-between mb-4">
              <span class="text-20px">1.000 元</span>
              <i class="i-ant-design:dashboard-outlined text-amber-5 text-50px">图标占位</i>
            </div>
            <div class="flex-between mb-2">
              <span>今日充电量 (度)</span>
              <span>今日订单数 (个)</span>
            </div>
            <div class="flex-between">
              <span>111</span>
              <span>222</span>
            </div>
          </div>
        </n-card>
      </n-grid-item>

      <n-grid-item :span="8">
        <n-card
          class="income"
          title="昨日收入"
          :segmented="{
            content: true,
            footer: 'soft',
          }"
        >
          <div>222</div>
        </n-card>
      </n-grid-item>

      <n-grid-item :span="8">
        <n-card
          class="income"
          title="总收入"
          :segmented="{
            content: true,
            footer: 'soft',
          }"
        >
          <div>333</div>
        </n-card>
      </n-grid-item> -->

      <n-grid-item :span="24">
        <!-- 充电收入趋势图表 -->
        <n-card>
          <lineEcharts />
        </n-card>
      </n-grid-item>

      <n-grid-item :span="12">
        <!-- 月度/年度收入统计 -->
        <n-card>
          <columnEcharts />
        </n-card>
      </n-grid-item>

      <n-grid-item :span="12">
        <!-- 充电启动充电方式占比 -->
        <n-card>
          <pieEcharts />
        </n-card>
      </n-grid-item>

      <n-grid-item :span="12">
        <!-- 本月充电站销售额前十排名 -->
        <n-card>
          <stationSaleRankForMonthEcharts />
        </n-card>
      </n-grid-item>

      <n-grid-item :span="12">
        <!-- 充电站销售额前十排名 -->
        <n-card>
          <stationSaleRankEcharts />
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style lang="scss" scoped>
  // ::v-deep(xxx)选择器  -- 修改组件库内部样式
  .income {
    ::v-deep(.n-card-header) {
      padding: 10px;
      .n-card-header__main {
        font-size: 14px;
      }
    }
  }
</style>
