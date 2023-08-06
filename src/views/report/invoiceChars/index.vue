<script setup lang="ts">
  import { getInvoiceStatistics } from '@/api/modules/report';
  import lineEcharts from './components/lineEcharts.vue';
  import columnEcharts from './components/columnEcharts.vue';

  const baseInfo = ref();

  const handleReload = async () => {
    const result = await getInvoiceStatistics();
    baseInfo.value = result;
  };

  onMounted(async () => {
    const result = await getInvoiceStatistics();
    // console.log(result);
    baseInfo.value = result;
    // console.log(baseInfo.value);
  });
</script>

<template>
  <div class="p-4 h-full">
    <n-space justify="end" class="mb-4">
      <n-button type="primary" @click="handleReload">invoice发票统计-刷新</n-button>
    </n-space>

    <n-grid :x-gap="16" :y-gap="16">
      <template v-for="item in baseInfo" :key="item.name">
        <n-grid-item :span="8">
          <n-card
            class="income"
            :title="`${item.name}已开发票金额(元)`"
            :segmented="{
              content: true,
              footer: 'soft',
            }"
          >
            <div>
              <div class="flex-between mb-2">
                <span class="text-20px font-00">{{ item.amount?.toFixed(2) }} 元</span>
                <i class="i-ant-design:dashboard-outlined text-amber-5 text-50px"></i>
              </div>
              <div class="flex-between mb-2">
                <span>{{ item.name }}已开发票数 (个)</span>
                <span>{{ item.invoiceCount }}</span>
              </div>
            </div>
          </n-card>
        </n-grid-item>
      </template>

      <n-grid-item :span="24">
        <!-- 开票日统计趋势 -->
        <n-card>
          <lineEcharts />
        </n-card>
      </n-grid-item>

      <n-grid-item :span="24">
        <!-- 开票月/年度统计趋势 -->
        <n-card>
          <columnEcharts />
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style lang="scss" scoped>
  .income {
    ::v-deep(.n-card-header) {
      padding: 10px;
      .n-card-header__main {
        font-size: 14px;
      }
    }
  }
</style>
