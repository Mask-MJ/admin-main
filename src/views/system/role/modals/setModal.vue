<script setup lang="ts">
  import type { RoleMenuTree } from '@/api/modules/types/role.type';
  import { type FormInst } from 'naive-ui';
  import { addRole } from '@/api/modules/role';
  import { getRoleMenuTree, getRoleUserMenuTree } from '@/api/modules/role';

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

  const formRef = ref<FormInst | null>(null);
  // console.log(formRef);
  const formValue = ref();

  // 关闭弹窗
  const handleClose = () => {
    // console.log('handleClose Child');
    emits('close');
  };
  // 提交表单
  const handleSubmit = () => {
    // console.log(formValue.value);
    // console.log(formRef.value);
    formRef.value?.validate(async (errors) => {
      // console.log(errors);
      if (errors) {
        window.$message.error('请输入必填项');
      } else {
        await addRole(formValue.value);
        window.$message.success('添加角色成功');
        emits('close');
        emits('reload');
      }
    });
  };

  const data = ref();
  const chargeData = (menuLists: RoleMenuTree[]) => {
    return menuLists.map((e) => {
      const newObj = {
        label: e.label,
        value: e.id,
        key: e.id,
        children: null,
      };
      if (e.children) {
        // 如果有children属性, 则递归
        newObj.children = chargeData(e.children) as any;
        // console.log(e.children);
      }
      return newObj;
    });
  };

  onMounted(async () => {
    const result = await getRoleMenuTree();
    // console.log(result);
    data.value = chargeData(result);
    // console.log(data.value);
  });

  // 监听父子传值的数据变化
  watch(
    () => {
      return props.formData;
    },
    async (newVal) => {
      // console.log('formData', props.formData.roleId);
      formValue.value = newVal;
      if (formValue.value.roleId) {
        // console.log(formValue.value);
        const result = await getRoleUserMenuTree(formValue.value.roleId);
        // console.log(result);
        formValue.value.menuIds = result.checkedKeys;
      }
    },
    { immediate: true },
  );
</script>

<template>
  <n-modal
    :show="show"
    preset="dialog"
    title="添加角色"
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
        <n-input v-model:value="formValue.roleName" placeholder="请输入角色名称" clearable />
      </n-form-item>

      <n-form-item
        :rule="{ required: true, message: '请输入权限字符', trigger: 'blur' }"
        label="权限字符 :"
        path="roleKey"
      >
        <n-input v-model:value="formValue.roleKey" placeholder="请输入权限字符" clearable />
      </n-form-item>

      <n-form-item
        :rule="{ required: true, message: '请输入显示顺序', trigger: 'blur' }"
        label="显示顺序 :"
        path="roleSort"
      >
        <n-input v-model:value="formValue.roleSort" placeholder="请输入显示顺序" clearable />
      </n-form-item>

      <n-form-item label="状态 :" path="status">
        <n-radio-group v-model:value="formValue.status" name="status">
          <n-space>
            <n-radio value="0"> 正常 </n-radio>
            <n-radio value="1"> 停用 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="菜单权限">
        <n-scrollbar style="max-height: 300px">
          <n-tree
            v-model:checked-keys="formValue.menuIds"
            block-line
            cascade
            :data="data"
            checkable
            expand-on-click
            selectable
          />
        </n-scrollbar>
      </n-form-item>

      <n-form-item label="备注 :">
        <n-input
          v-model:value="formValue.remark"
          placeholder="请输入内容"
          type="textarea"
          clearable
        />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style scoped></style>
