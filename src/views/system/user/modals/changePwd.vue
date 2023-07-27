<script setup lang="ts">
  import type { FormInst } from 'naive-ui';
  import { changePwd } from '@/api/modules/user';

  const emits = defineEmits(['close']);

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  });

  // console.log('111', props.userName);
  // console.log('222', props.userId);

  // 获取表单实例
  const formRef = ref<FormInst | null>(null);
  // 获取表单数据
  const formValue = ref({
    password: '',
  });

  const name = computed(() => {
    return props.userName;
  });
  const id = computed(() => {
    return props.userId;
  });
  // console.log(name);
  // console.log(id);

  // 关闭弹窗的自定义事件
  const handleClose = () => {
    // console.log('handleClose Child');
    emits('close');
  };
  // 提交表单
  const handleSubmit = () => {
    formRef.value?.validate(async (errors) => {
      if (errors) {
        window.$message.error('请输入正确的密码');
      } else {
        await changePwd({ userId: id.value, password: formValue.value.password }); //不用随便改别人的密码
        window.$message.success('修改密码成功');
        emits('close'); // 关闭弹窗
      }
    });
  };
</script>

<template>
  <n-modal
    :show="show"
    preset="dialog"
    title="修改用户密码"
    positive-text="确认"
    negative-text="取消"
    @close="handleClose"
    @negative-click="handleClose"
    @positive-click="handleSubmit"
    @mask-click="handleClose"
  >
    <div class="mb-4">请输入"{{ name }}"的新密码</div>
    <n-form ref="formRef" :model="formValue" label-placement="left">
      <n-form-item
        :rule="{ required: true, message: '请输入用户新密码', trigger: 'blur' }"
        label="用户新密码 :"
        path="password"
      >
        <n-input v-model:value="formValue.password" placeholder="请输入用户新密码" clearable />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style scoped></style>
