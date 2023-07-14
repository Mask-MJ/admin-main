<script setup lang="ts">
  import { NTag, NButton } from 'naive-ui';
  import type { DataTableColumns } from 'naive-ui';

  //表格的数据
  type RowData = {
    key: number;
    name: string;
    age: number;
    address: string;
    tags: string[];
  };
  const columns: DataTableColumns<RowData> = [
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Age',
      key: 'age',
    },
    {
      title: 'Address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      render(row: any) {
        const tags = row.tags.map((tagKey: any) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
              },
              type: 'info',
              bordered: false,
            },
            {
              default: () => tagKey,
            },
          );
        });
        return tags;
      },
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row),
          },
          { default: () => 'Send Email' },
        );
      },
    },
  ];
  const data: RowData[] = [
    {
      key: 0,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: 1,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['wow'],
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: 3,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: 4,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['wow'],
    },
    {
      key: 5,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const pagination = {
    pageSize: 10,
  };
  const sendMail = (rowData: RowData) => {
    window.$message.success(rowData.name);
  };
</script>

<template>
  <n-card class="h-510px">
    <span class="text-24px">Data Table 数据表格</span>
    <n-data-table
      class="my-8"
      :bordered="false"
      :single-line="false"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </n-card>
</template>

<style scoped></style>
