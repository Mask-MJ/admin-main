<script setup lang="ts">
  import { NButton } from 'naive-ui';
  import DataTable from './components/DataTable.vue';
  import lineEcharts from './components/lineEcharts.vue';
  import pieEcharts from './components/PieEcharts.vue';
</script>

<template>
  <div class="p-4">
    <n-grid :x-gap="16" :y-gap="16">
      <n-grid-item :span="6" class="flex-center">
        <n-card>
          <div class="h-300px">
            <div class="title">Dashboard</div>
            <div class="desc">Overview Of Lasted Month</div>
            <div class="title">$7,754</div>
            <div class="desc">Current Month Earnings</div>
            <div class="title">1,234</div>
            <div class="desc">Current Month Sales</div>
            <NButton type="primary"> Last Month Summary </NButton>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item :span="10">
        <n-card>
          <lineEcharts />
        </n-card>
      </n-grid-item>
      <n-grid-item :span="8">
        <n-card>
          <pieEcharts />
        </n-card>
      </n-grid-item>
      <n-grid-item :span="24">
        <n-card>
          <div class="flex-around flex-nowrap">
            <div class="bg-gradient-to-br from-blue-400 to-blue-500 b-rd-2 flex-col w-24/100 p-xy">
              <div class="text-16px text-white">访问量 </div>
              <div class="flex-between mt">
                <i class="i-carbon:chart-cluster-bar text-24px text-white"></i>
                <span class="text-30px text-white">1,000,001</span>
              </div>
            </div>
            <div class="bg-gradient-to-br from-pink-400 to-pink-500 b-rd-2 flex-col w-24/100 p-xy">
              <div class="text-16px text-white">成交额 </div>
              <div class="flex-between mt">
                <i class="i-carbon:calendar-add-alt text-24px text-white"></i>
                <span class="text-30px text-white">$234,456</span>
              </div>
            </div>
            <div
              class="bg-gradient-to-br from-yellow-400 to-yellow-500 b-rd-2 flex-col w-24/100 p-xy"
            >
              <div class="text-16px text-white">下载数 </div>
              <div class="flex-between mt">
                <i class="i-carbon:download text-24px text-white"></i>
                <span class="text-30px text-white">666,666</span>
              </div>
            </div>
            <div
              class="bg-gradient-to-br from-purple-400 to-purple-500 b-rd-2 flex-col w-24/100 p-xy"
            >
              <div class="text-16px text-white">成交数 </div>
              <div class="flex-between mt">
                <i class="i-carbon:awake text-24px text-white"></i>
                <span class="text-30px text-white ml-50px">999,999</span>
              </div>
            </div>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item :span="8">
        <n-card>
          <span class="text-24px">timeline 时间线</span>
          <n-timeline class="my-8">
            <n-timeline-item content="啊" />
            <n-timeline-item
              type="success"
              title="成功"
              content="哪里成功"
              time="2023-04-03 20:46"
            />
            <n-timeline-item type="error" content="哪里错误" time="2023-04-03 20:46" />
            <n-timeline-item
              type="warning"
              title="警告"
              content="哪里警告"
              time="2023-04-03 20:46"
            />
            <n-timeline-item
              type="info"
              title="信息"
              content="是的"
              time="2023-04-03 20:46"
              line-type="dashed"
            />
            <n-timeline-item content="啊" />
          </n-timeline>
        </n-card>
      </n-grid-item>
      <n-grid-item :span="16">
        <DataTable />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style scoped>
  .title {
    --at-apply: text-2xl font-bold;
  }
  .desc {
    --at-apply: text-sm color-gray-400 mb-10;
  }
</style>
