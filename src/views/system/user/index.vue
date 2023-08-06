<script setup lang="ts">
  import { getUserList, setUserStatus } from '@/api/modules/user';
  // import { columns } from './data';
  import setModal from './modals/setModal.vue';
  import changePwd from './modals/changePwd.vue';
  import { NButton, NSwitch, NTag, NTooltip } from 'naive-ui';

  const UserListData = ref();
  const pagination = ref({
    page: 1,
    // itemCount: 170,
    pageSize: 10,
    pageCount: 21,
  });
  const formValue = ref({});
  const userName = ref('');
  const userId = ref('');

  const searchValue = ref<{
    nickName: string;
    userName: string;
    phonenumber: string;
    status: string;
    range: any;
  }>({
    nickName: '',
    userName: '',
    phonenumber: '',
    status: '',
    range: null,
  });

  const showModal = ref(false);
  const showPwdModal = ref(false);

  const columns = [
    {
      title: '用户名称',
      key: 'userName',
      // 使用渲染函数来自定义单元格
      // render(row: any) {
      //   return h(NInput, { defaultValue: row.userName }, { suffix: () => '元' });
      // },
    },
    {
      title: '用户昵称',
      key: 'nickName',
      render(row: any) {
        // console.log(row.nickName);
        return h(
          // 参数一:组件名称 -->  标签Tag
          NTag,
          // 参数二:组件属性
          { type: 'primary' },
          // 参数三:组件插槽 --> 添加default插槽, 通过渲染函数 渲染标签内容row.nickName
          {
            default: () => {
              return row.nickName;
            },
          },
        );
      },
    },
    {
      title: '部门',
      key: 'dept.deptName',
    },
    {
      title: '状态',
      key: 'status',
      render(row: any) {
        // console.log(row.status);
        return h(
          NSwitch,
          {
            checkedValue: '0',
            uncheckedValue: '1',
            value: row.status,
            // 修改状态的value值
            onUpdateValue: (e) => {
              // 通过调用setUserStatus()修改数据库中的值
              setUserStatus({ status: e, userId: row.userId })
                .then(() => {
                  // console.log('修改成功');
                  window.$message.success('修改成功');
                  row.status = e; //请求成功后,将当前行的状态值e赋值给row.status
                })
                .catch(() => {
                  // console.log('修改失败');
                  window.$message.error('修改失败');
                });
              // console.log(e);
            },
          },
          { checked: () => '启用', unchecked: () => '停用' },
        );
      },
    },
    {
      title: '创建时间',
      key: 'createTime',
    },
    {
      title: 'Action',
      key: 'actions',
      render(row: any) {
        return [
          // h渲染函数
          h(
            // 参数一:组件名称 --> 添加hover时的 Tooltip提示信息
            NTooltip,
            // 参数二:组件属性
            {},
            // 参数三:组件插槽 --> 添加trigger触发弹出信息的组件或元素 和 添加default弹出的内容
            {
              // 参数三:组件插槽1:trigger
              trigger: () =>
                // h渲染函数中 再次嵌套 h渲染函数
                h(
                  // 参数1:组件名称 --> 添加按钮插槽 Button
                  NButton,
                  // 参数2:组件属性
                  {
                    class: 'mr-2', // 添加右边距
                    size: 'small',
                    type: 'primary', // 添加按钮类型
                    onClick: () => {
                      // console.log(row); // 添加点击事件
                      // console.log(showModal);
                      showModal.value = true;
                      formValue.value = row; // 将当前行的数据赋值给formValue
                    },
                  },
                  // 参数3:组件插槽 --> 添加按钮图标, 通过渲染函数 渲染i标签 添加图标
                  { default: () => h('i', { class: 'i-ant-design:form-outlined' }) },
                ),
              // 参数三:组件插槽2:default
              default: () => '编辑',
            },
          ),
          h(
            NTooltip,
            {},
            {
              trigger: () =>
                h(
                  NButton,
                  {
                    class: 'mr-2',
                    size: 'small',
                    type: 'error',
                    disabled: true, // 禁用按钮
                    onClick: () => {
                      // console.log(row.userId);
                      // delUser(row.userId + 'ASD');//删除这种东西不要乱动
                    },
                  },
                  { default: () => h('i', { class: 'i-ant-design:delete-outlined' }) },
                ),
              default: () => '不要点删除',
            },
          ),
          h(
            NTooltip,
            {},
            {
              trigger: () =>
                h(
                  NButton,
                  {
                    class: 'mr-2',
                    size: 'small',
                    type: 'warning',
                    onClick: () => {
                      // console.log(row);
                      showPwdModal.value = true;
                      userName.value = row.userName;
                      userId.value = row.userId;
                    },
                  },
                  { default: () => h('i', { class: 'i-ant-design:key-outlined' }) },
                ),
              default: () => '重置密码',
            },
          ),
          h(
            NTooltip,
            {},
            {
              trigger: () =>
                h(
                  NButton,
                  {
                    size: 'small',
                    type: 'success',
                    onClick: () => {
                      //   console.log(row);
                    },
                  },
                  { default: () => h('i', { class: 'i-ant-design:check-circle-outlined' }) },
                ),
              default: () => '分配角色',
            },
          ),
        ];
      },
    },
  ];

  const handleAdd = () => {
    showModal.value = true;
    formValue.value = {
      nickName: '',
      username: '',
      password: '',
      email: '',
      phonenumber: '',
      sex: '',
      dept: '',
      remark: '',
      status: '',
    };
  };
  const handleSearch = async () => {
    // console.log(searchValue.value); // 输出 搜索框里的值
    const result = await getUserList(searchValue.value);
    // console.log(result);
    UserListData.value = result.rows;
  };
  const handleReset = async () => {
    searchValue.value = {
      nickName: '',
      userName: '',
      phonenumber: '',
      status: '',
      range: null,
    };
    const result = await getUserList();
    UserListData.value = result.rows;
  };

  const handleCloseFather = () => {
    showModal.value = false;
    // console.log('handleClose father');
  };
  const handleClosePwd = () => {
    showPwdModal.value = false;
  };

  onMounted(async () => {
    const result = await getUserList();
    // console.log(result);
    UserListData.value = result.rows;
    // console.log(UserListData.value.nickName);
  });
</script>

<template>
  <div class="p-4 h-full">
    <!-- 搜索表单 -->
    <n-card class="mb-4">
      <n-form ref="formRef" :model="searchValue" label-placement="left">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="8" label="用户名称 :">
            <n-input v-model:value="searchValue.userName" placeholder="请输入用户名称" clearable />
          </n-form-item-gi>

          <n-form-item-gi :span="8" label="用户昵称 :">
            <n-input v-model:value="searchValue.nickName" placeholder="请输入用户昵称" clearable />
          </n-form-item-gi>

          <n-form-item-gi :span="8" label="手机号码 :">
            <n-input
              v-model:value="searchValue.phonenumber"
              placeholder="请输入手机号码"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="8" label="状态 :">
            <n-select
              v-model:value="searchValue.status"
              placeholder="Select"
              :options="[
                { label: '启用', value: '0' },
                { label: '停用', value: '1' },
              ]"
            />
          </n-form-item-gi>

          <n-form-item-gi :span="8" label="创建时间 :">
            <n-date-picker
              v-model:formatted-value="searchValue.range"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              clearable
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <n-space justify="end">
        <NButton @click="handleReset">
          <template #icon>
            <i class="i-carbon:reset"></i>
          </template>
          重置
        </NButton>
        <NButton type="primary" @click="handleSearch">
          <template #icon>
            <i class="i-carbon:search"></i>
          </template>
          搜索
        </NButton>
      </n-space>
    </n-card>

    <n-card class="mb-4">
      <!-- 中间栏 : 操作按键 -->
      <div class="flex-between mb-6">
        <div>
          <NButton type="primary" class="mr-2" @click="handleAdd">
            <template #icon>
              <i class="i-carbon:add"></i>
            </template>
            新增
          </NButton>
          <NButton type="info" class="mr-2">
            <template #icon>
              <i class="i-carbon:search"></i>
            </template>
            查找
          </NButton>
          <NButton type="error" class="mr-2" disabled>
            <template #icon>
              <i class="i-carbon:delete"></i>
            </template>
            删除
          </NButton>
          <NButton type="success">
            <template #icon>
              <i class="i-carbon:export"></i>
            </template>
            导出Excle
          </NButton>
        </div>
        <div>
          <NButton type="primary" class="mr-2">
            <template #icon>
              <i class="i-carbon:reset"></i>
            </template>
            刷新表格
          </NButton>
          <NButton type="primary" class="mr-2">
            <template #icon>
              <i class="i-carbon:settings"></i>
            </template>
            表格列设置
          </NButton>
        </div>
      </div>

      <!-- 数据表 -->
      <n-data-table size="small" :columns="columns" :data="UserListData" :pagination="pagination" />
    </n-card>

    <!-- 新增用户的弹窗模块 -->
    <setModal :show="showModal" :form-data="formValue" @close="handleCloseFather" />

    <!-- 新增修改密码弹窗 -->
    <changePwd
      :show="showPwdModal"
      :user-name="userName"
      :user-id="userId"
      @close="handleClosePwd"
    />
  </div>
</template>

<style scoped></style>
