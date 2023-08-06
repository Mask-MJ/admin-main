<script setup lang="ts">
  import { type FormInst } from 'naive-ui';
  // import { addRole } from '@/api/modules/role';

  const emits = defineEmits(['close', 'reload']);

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      required: true,
    },
  });
  const formValue = ref();
  const formRef = ref<FormInst | null>(null);

  // 关闭弹窗
  const handleClose = () => {
    // console.log('handleClose Child');
    emits('close');
  };
  // 提交表单
  const handleSubmit = () => {
    // console.log(formValue.value);
    // console.log(formRef.value);
    // formRef.value?.validate(async (errors) => {
    //   // console.log(errors);
    //   if (errors) {
    //     window.$message.error('请输入必填项');
    //   } else {
    //     await addRole(formValue.value);
    //     window.$message.success('添加角色成功');
    //     emits('close');
    //     emits('reload');
    //   }
    // });
    emits('close');
    emits('reload');
  };
  const options = ref([
    { id: '1', value: '1', label: '全部数据权限' },
    { id: '2', value: '2', label: '自定数据权限' },
    { id: '3', value: '3', label: '本部门数据权限' },
    { id: '4', value: '4', label: '本部门及以下数据权限' },
    { id: '5', value: '5', label: '仅本人数据权限' },
  ]);
  // 监听父子传值的数据变化
  watch(
    () => {
      return props.formData;
    },
    async (newVal) => {
      // console.log('formData', props.formData.roleId);
      formValue.value = newVal;
      // if (formValue.value.roleId) {
      //   // console.log(formValue.value);
      //   const result = await getRoleUserMenuTree(formValue.value.roleId);
      //   // console.log(result);
      //   formValue.value.menuIds = result.checkedKeys;
      // }
    },
    { immediate: true },
  );
</script>

<template>
  <n-modal
    :show="show"
    preset="dialog"
    title="分配数据权限"
    positive-text="确认"
    negative-text="取消"
    @close="handleClose"
    @negative-click="handleClose"
    @positive-click="handleSubmit"
    @mask-click="handleClose"
  >
    <n-form ref="formRef" :model="formValue" label-placement="left">
      <n-form-item
        :rule="{ required: true, message: '请输入角色名称', trigger: 'blur' }"
        label="角色名称 :"
        path="roleName"
      >
        <n-input
          v-model:value="formValue.roleName"
          placeholder="请输入角色名称"
          clearable
          disabled
        />
      </n-form-item>

      <n-form-item
        :rule="{ required: true, message: '请输入权限字符', trigger: 'blur' }"
        label="权限字符 :"
        path="roleKey"
      >
        <n-input
          v-model:value="formValue.roleKey"
          placeholder="请输入权限字符"
          clearable
          disabled
        />
      </n-form-item>

      <n-form-item
        :rule="{ required: true, message: '请输入角色id', trigger: 'blur' }"
        label="角色id :"
        path="roleId"
      >
        <n-input v-model:value="formValue.roleId" placeholder="请输入角色id" clearable disabled />
      </n-form-item>

      <n-form-item
        :rule="{ required: true, message: '请选择权限范围', trigger: 'blur' }"
        label="权限范围"
        path="roleId"
      >
        <n-select
          v-model:value="formValue.dept"
          placeholder="请选择权限范围"
          :options="options"
          filterable
        />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style scoped></style>
