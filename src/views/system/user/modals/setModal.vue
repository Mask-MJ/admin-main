<script setup lang="ts">
  import type { FormInst } from 'naive-ui';
  import { addUser } from '@/api/modules/user';

  const emits = defineEmits(['close']);

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
  const formValue = ref();

  const options = ref([
    { label: 'Drive My Car', value: 'song1' },
    { label: 'Norwegian Wood', value: 'song2' },
  ]);

  // 关闭弹窗
  const handleClose = () => {
    // console.log('handleClose Child');
    emits('close');
  };
  // 提交表单
  const handleSubmit = () => {
    // console.log(formRef.value);
    formRef.value?.validate(async (errors) => {
      // console.log(errors);
      if (errors) {
        window.$message.error('请输入必填项');
      } else {
        await addUser(formValue.value);
        window.$message.success('新增账户成功');
        emits('close');
      }
    });
  };
  // 表单搜索
  const handleSearch = (value: string) => {
    if (value.length === 0) {
      options.value = [
        { label: 'Drive My Car', value: 'song1' },
        { label: 'Norwegian Wood', value: 'song2' },
      ];
    }
    // console.log(value);
    const result = options.value.filter((e) => {
      // console.log(e.label);
      // console.log(e.label.includes(value));
      return e.label.includes(value);
    });

    options.value = result;
    // console.log(result);
  };
  watch(
    () => {
      return props.formData;
    },
    (newVal) => {
      formValue.value = newVal;
    },
    { immediate: true },
  );
</script>

<template>
  <n-modal
    :show="show"
    preset="dialog"
    title="新增账号"
    positive-text="确认"
    negative-text="取消"
    @close="handleClose"
    @negative-click="handleClose"
    @positive-click="handleSubmit"
    @mask-click="handleClose"
  >
    <n-form ref="formRef" :model="formValue" label-placement="left">
      <n-form-item
        :rule="{ required: true, message: '请输入用户名称', trigger: 'blur' }"
        label="用户名称 :"
        path="username"
      >
        <n-input v-model:value="formValue.username" placeholder="请输入用户名称" clearable />
      </n-form-item>

      <n-form-item
        :rule="{ required: true, message: '请输入用户昵称', trigger: 'blur' }"
        label="用户昵称 :"
        path="nickName"
      >
        <n-input v-model:value="formValue.nickName" placeholder="请输入用户昵称" clearable />
      </n-form-item>

      <n-form-item
        :rule="{ required: true, message: '请输入用户密码', trigger: 'blur' }"
        label="用户密码 :"
        path="password"
      >
        <n-input v-model:value="formValue.password" placeholder="请输入用户密码" clearable />
      </n-form-item>

      <n-form-item
        :rule="{ required: true, message: '请输入手机号码', trigger: 'blur' }"
        label="手机号码 :"
        path="phonenumber"
      >
        <n-input v-model:value="formValue.phonenumber" placeholder="请输入手机号码" clearable />
      </n-form-item>

      <n-form-item
        :rule="{ required: true, message: '请输入邮箱', trigger: 'blur' }"
        label="邮箱 :"
        path="email"
      >
        <n-input v-model:value="formValue.email" placeholder="请输入邮箱" clearable />
      </n-form-item>

      <n-form-item label="性别 :" path="sex">
        <n-radio-group v-model:value="formValue.sex" name="sex">
          <n-space>
            <n-radio value="0"> 男 </n-radio>
            <n-radio value="1"> 女 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="状态 :" path="sex">
        <n-radio-group v-model:value="formValue.status" name="status">
          <n-space>
            <n-radio value="0"> 正常 </n-radio>
            <n-radio value="1"> 停用 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="岗位">
        <n-select
          v-model:value="formValue.dept"
          placeholder="请输入岗位"
          :options="options"
          filterable
          @search="handleSearch"
        />
      </n-form-item>

      <n-form-item label="备注 :">
        <n-input v-model:value="formValue.remark" placeholder="请输入" type="textarea" clearable />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style scoped></style>
