<script setup lang="ts"></script>

<template>
  <div class="bg-gray w-screen h-screen flex flex-items-center justify-center">
    <div class="w-300px bg-white rounded-5 px-32px py-24px">
      <div class="flex flex-items-center justify-between">
        <img class="w-48px h-48px" src="../../assets/vue.svg" alt="" />
        <span class="text-24px text-gray font-700">Meijun</span>
      </div>
      <div>
        <p class="text-18px mb-14px">账密登陆</p>
        <n-input type="text" size="large" placeholder="请输入账号" class="mb-16px h-38px" />
        <n-input
          type="password"
          size="large"
          show-password-on="mousedown"
          placeholder="密码"
          class="mb-16px h-38px"
        />
        <n-input type="text" placeholder="请输入验证码" class="mb-16px h-38px">
          <template #suffix>
            <img src="../../assets/vue.svg" alt="" />
          </template>
        </n-input>
        <div class="flex justify-between mb-16px">
          <n-checkbox> 记住我 </n-checkbox>
          <n-button text>忘记密码?</n-button>
        </div>
        <n-button size="large" strong block type="primary" round class="mb-16px"> 登陆</n-button>
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
