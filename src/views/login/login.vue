<script setup lang="ts">
  // import { router } from '../../router';

  const themeStore = useThemeStore();
  // console.log(themeStore.getPrimaryColor);

  // formValue 用于<n-form>双向绑定表单数据, 绑定对应的表单项,验证表单是否通过
  const formValue = ref({
    username: '',
    password: '',
    code: '',
  });
  // formRef 用于获取<n-form>组件实例, 调用实例方法
  const formRef = ref();

  const handleClick = () => {
    // 获取<n-form>组件实例中的validate方法, 根据使用的表单和输入框的规则来验证表单是否通过
    // formRef.value中包含了组件实例中的所有方法
    formRef.value.validate();
    // console.log(formRef.value);
    // console.log('click');
    // router.push('/home');
  };
</script>

<template>
  <div class="bg-gray w-screen h-screen flex flex-items-center justify-center">
    <div class="w-300px bg-white rounded-5 px-32px py-24px">
      <div class="flex flex-items-center justify-between">
        <img class="w-48px h-48px" src="../../assets/vue.svg" alt="" />
        <span class="text-24px font-700" :style="{ color: themeStore.getPrimaryColor }">
          Meijun
        </span>
      </div>
      <div>
        <p class="text-18px mb-14px">账密登陆</p>
        <n-form ref="formRef" :model="formValue" label-placement="left">
          <n-form-item
            path="username"
            :rule="{
              required: true,
              message: '请输入账号',
            }"
          >
            <n-input
              v-model:value="formValue.username"
              size="large"
              type="text"
              placeholder="请输入账号"
            />
          </n-form-item>
          <n-form-item
            path="password"
            :rule="{
              required: true,
              message: '请输入密码',
            }"
          >
            <n-input
              v-model:value="formValue.password"
              type="password"
              size="large"
              show-password-on="mousedown"
              placeholder="密码"
            />
          </n-form-item>
          <n-form-item
            path="code"
            :rule="{
              required: true,
              message: '请输入验证码',
            }"
          >
            <n-input
              v-model:value="formValue.code"
              size="large"
              type="text"
              placeholder="请输入验证码"
            >
              <template #suffix>
                <img src="../../assets/vue.svg" alt="" />
              </template>
            </n-input>
          </n-form-item>
        </n-form>
        <div class="flex justify-between mb-16px">
          <n-checkbox> 记住我 </n-checkbox>
          <n-button text>忘记密码?</n-button>
        </div>
        <n-button
          size="large"
          strong
          block
          type="primary"
          round
          class="mb-16px"
          @click="handleClick"
        >
          登陆
        </n-button>
        <div class="flex justify-between h-38px">
          <n-button size="large" class="h-30px w-140px"> 手机验证码登陆</n-button>
          <n-button size="large" class="h-30px w-140px"> 注册</n-button>
        </div>
        <n-divider> 其他账户登陆 </n-divider>
        <div class="flex justify-between">
          <n-button size="large" type="primary"> 超级管理员</n-button>
          <n-button size="large" type="primary"> 管路员</n-button>
          <n-button size="large" type="primary"> 普通用户</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
