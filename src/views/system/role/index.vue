<script setup lang="ts">
  import { getRoleList, setRoleStatus, delRole } from '@/api/modules/role';
  import { NSwitch, NTooltip, NButton, DataTableColumns } from 'naive-ui';
  import setModal from './modals/setModal.vue';
  import roleModal from './modals/roleModal.vue';

  // 搜索框的数据
  const searchValue = ref({
    roleName: '',
    roleKey: '',
    status: '',
    range: '',
    roleSort: '',
  });

  // 用户列表的数据
  const RoleListData = ref();

  // 分页的数据
  const pagination = ref({
    current: 1,
    pageSize: 10,
  });

  // 默认不显示弹窗 - 新增角色弹窗
  const showModal = ref(false);
  // 新增角色弹窗的表单数据
  const formValue = ref({});

  // 默认不显示弹窗 - 新增权限弹窗
  const showRoleModal = ref(false);

  // 数据表的数据
  const columns: DataTableColumns = [
    { title: '角色名称', key: 'roleName', align: 'center' },
    { title: '角色编号', key: 'roleId', align: 'center' },
    { title: '权限字符', key: 'roleKey', align: 'center' },
    { title: '显示顺序', key: 'roleSort', align: 'center' },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render(row: any) {
        return h(
          NSwitch,
          {
            checkedValue: '0',
            uncheckedValue: '1',
            value: row.status,
            // 修改状态的value值
            // 传入形参e 当前状态的值的取反 , 就是点击后的值
            onUpdateValue: (e) => {
              // console.log(e);
              // console.log(row.roleId);
              // 通过调用setRoleStatus()修改数据库中的值
              setRoleStatus({ status: e, roleId: row.roleId })
                .then(() => {
                  // console.log('修改成功');
                  window.$message.success('修改成功');
                  row.status = e;
                })
                .catch(() => {
                  // console.log('修改失败');
                  window.$message.error('修改失败');
                });
            },
          },
          { checked: () => '启用', unchecked: () => '停用' },
        );
      },
    },
    { title: '创建时间', key: 'createTime', align: 'center' },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render(row: any) {
        return [
          // h函数
          // h(NTooltip, {}, { trigger: () => 'bianji', default: () => '编辑' }),
          // h(
          //   NButton,
          //   { type: 'primary', size: 'small' },
          //   { default: () => h('i', { class: 'i-ant-design:form-outlined' }) },
          // ),
          h(
            NTooltip,
            {},
            {
              trigger: () =>
                h(
                  NButton,
                  {
                    type: 'primary',
                    size: 'small',
                    class: 'mr-2',
                    onClick: () => {
                      // console.log(row); // 添加点击事件
                      showModal.value = true;
                      formValue.value = row; // 将当前的数据传入弹窗
                    },
                  },
                  { default: () => h('i', { class: 'i-ant-design:form-outlined' }) },
                ),
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
                    type: 'error',
                    size: 'small',
                    class: 'mr-2',
                    disabled: true, // 禁用按钮
                    onClick: () => {
                      // console.log(row); // 添加点击事件
                      delRole(row.roleId + '不能删了')
                        .then(() => {
                          // console.log('删除成功');
                          window.$message.success('删除成功');
                          handleReload();
                        })
                        .catch(() => {
                          // console.log('删除失败');
                          window.$message.error('删除失败');
                        });
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
                    type: 'warning',
                    size: 'small',
                    class: 'mr-2',
                    onClick: () => {
                      // console.log(row); // 添加点击事件
                      showRoleModal.value = true;
                      formValue.value = row; // 将当前的数据传入弹窗
                    },
                  },
                  { default: () => h('i', { class: 'i-ant-design:check-circle-outlined' }) },
                ),
              default: () => '权限',
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
                    type: 'warning',
                    size: 'small',
                    onClick: () => {
                      // console.log(row); // 添加点击事件
                    },
                  },
                  { default: () => h('i', { class: 'i-ant-design:android-outlined' }) },
                ),
              default: () => '分配',
            },
          ),
        ];
      },
    },
  ];

  // 搜索按钮事件
  const handleSearch = async () => {
    // console.log(searchValue.value); // 输出 搜索框里的值
    const result = await getRoleList(searchValue.value);
    // console.log(result);
    RoleListData.value = result.rows;
  };

  // 重置按钮事件
  const handleReset = async () => {
    searchValue.value = {
      roleName: '',
      roleKey: '',
      status: '',
      range: '',
      roleSort: '',
    };
    const result = await getRoleList();
    // console.log(result);
    RoleListData.value = result.rows;
  };

  // 新增按钮事件
  const handleAdd = () => {
    showModal.value = true;
    formValue.value = {
      roleName: '',
      roleKey: '',
      status: '',
      remark: '',
      menuIds: [],
      roleSort: '',
    };
  };

  // 关闭弹窗事件
  const handleCloseFather = () => {
    showModal.value = false;
  };
  // 关闭弹窗事件
  const handleCloseRoleModel = () => {
    showRoleModal.value = false;
  };

  // 重新加载事件
  const handleReload = async () => {
    const result = await getRoleList();
    RoleListData.value = result.rows;
  };

  onMounted(async () => {
    const result = await getRoleList();
    // console.log(result);
    RoleListData.value = result.rows;
    // console.log(RoleListData.value);
  });
</script>

<template>
  <div class="p-4 h-full">
    <!-- 搜索表单 -->
    <n-card class="mb-4">
      <n-form ref="formRef" :model="searchValue" label-placement="left">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="8" label="角色名称 :">
            <n-input v-model:value="searchValue.roleName" placeholder="请输入角色名称" clearable />
          </n-form-item-gi>

          <n-form-item-gi :span="8" label="权限字符 :">
            <n-input v-model:value="searchValue.roleKey" placeholder="请输入权限字符" clearable />
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

          <n-form-item-gi :span="16" label="创建时间 :">
            <n-date-picker
              v-model:formatted-value="searchValue.range"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              clearable
              class="w-full"
            />
          </n-form-item-gi>
          <n-gi :span="8">
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
          </n-gi>
        </n-grid>
      </n-form>
    </n-card>

    <!-- 中间栏 :  -->
    <n-card class="mb-4">
      <!--  操作按键  -->
      <div class="mb-6 flex-between">
        <div class="flex-center text-18px">
          <div class="mr-1 mt-1"> 用户权限控制</div>
          <n-popover trigger="hover">
            <template #trigger>
              <i class="i-ant-design:alert-outlined c-true-gray-400 text-14px"></i>
            </template>
            <span>用户权限控制</span>
          </n-popover>
        </div>
        <div class="flex-center">
          <div>
            <NButton type="primary" class="mr-2" @click="handleAdd">
              <template #icon>
                <i class="i-carbon:add"></i>
              </template>
              新增
            </NButton>

            <NButton type="error" class="mr-2" disabled>
              <template #icon>
                <i class="i-carbon:delete"></i>
              </template>
              删除
            </NButton>

            <span class="text-16px c-gray-100"> |</span>

            <NButton quaternary type="default" class="mr-2" @click="handleReload">
              <template #icon>
                <i class="i-carbon:automatic"></i>
              </template>
            </NButton>
          </div>
        </div>
      </div>

      <!--  数据表  -->
      <n-data-table
        size="small"
        :columns="columns"
        :data="RoleListData"
        :pagination="pagination"
        striped
        :single-line="false"
      />
    </n-card>

    <!-- 新增角色的弹窗模块 -->
    <setModal
      :show="showModal"
      :form-data="formValue"
      @close="handleCloseFather"
      @reload="handleReload"
    />

    <!-- 新增权限弹窗 -->
    <roleModal :show="showRoleModal" :form-data="formValue" @close="handleCloseRoleModel" />
  </div>
</template>

<style scoped></style>
