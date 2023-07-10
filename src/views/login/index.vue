<script setup lang="ts">
  import { router } from '@/router';
  // import { defHttp } from '@/api';
  import { getCode, login } from '@/api/modules/login';

  //调用 useThemeStore 方法, 通过 themeStore 接收, 用于存储主题颜色
  const themeStore = useThemeStore();
  // console.log(themeStore.getPrimaryColor);
  // 调用 useUserStore 方法, 通过 userStore 接收,用于存储用户信息
  const userStore = useUserStore();

  // 定义 formValue 用于<n-form>双向绑定表单数据, 绑定对应的表单项,验证表单是否通过
  const formValue = ref({
    username: 'admin',
    password: 'admin123',
    code: 'wsw',
  });
  // formRef 用于获取<n-form>组件实例, 调用实例方法
  const formRef = ref();

  // codeData 用于存储验证码的数据
  const codeData = ref({
    img: '',
    uuid: '',
  });

  // 将getCode方法封装到api文件中, 通过import导入, 在onMounted中调用
  // defHttp 是封装的axios请求方法, 通过get方法获取验证码(根据什么请求是看后端的接口文档)
  // function getCode() {
  //   return defHttp.get({ url: 'code' });
  // }

  // 将login方法封装到api文件中, 通过import导入, 在onMounted中调用
  // function login(data: any) {
  //   return defHttp.post({ url: 'system/token/login', data });
  // }
  const handleClick = () => {
    // 获取<n-form>组件实例中的validate方法, 根据使用的表单和输入框的规则来验证表单是否通过
    // formRef.value中包含了组件实例中的所有方法
    // formRef.value.validate();
    // console.log(formRef.value); //组件实例中的所有方法

    // 调用validate方法,返回的是promise对象,  验证表单是否通过
    formRef.value
      .validate()
      .then(() => {
        // 验证表单通过后, 执行的操作
        // 定义一个prams对象
        const prams = {
          // 将formValue中的数据(username password code)和codeData中的uuid数据合并到一起
          uuid: codeData.value.uuid,
          ...formValue.value,
        };
        // console.log('验证通过', prams);
        return login(prams);
      })
      // 调用login方法发送请求, 服务器返回prams对象 ，这个prams对象中有access_token 和 expires_in 两个属性, 通过res接收
      .then((res: { access_token: string; expires_in: string }) => {
        // console.log(res);
        // 定义userStore仓库, 用于存储用户信息
        // const userStore = useUserStore();
        //通过userStore仓库中的setToken方法,将服务器返回的access_token存储到userStore仓库中原本默认值为空字符串的token属性中
        userStore.setToken(res.access_token);
      })
      .then(() => {
        router.push('/dashboard/worktable');
      })
      .catch(() => {
        // 验证表单不通过后, 执行的操作
        // console.log('验证不通过');
      });
  };

  // onMounted 用于发送请求获取数据
  onMounted(async () => {
    // 通过res接收请求返回的数据, 再从返回的数据中获取验证码
    const res = await getCode();
    // console.log(res);
    // 将codeData数据中的img赋值 , 把获取到的验证码图片赋值给img, 通过base64格式显示图片
    codeData.value.img = 'data:image/png;base64,' + res.img;
    // 将codeData数据中的uuid赋值 ,把获取到的uuid赋值给uuid
    codeData.value.uuid = res.uuid;
  });
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
              class="code"
            >
              <template #suffix>
                <img class="h-38px" :src="codeData.img" alt="" />
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

<style lang="scss" scoped>
  .code {
    :deep(.n-input-wrapper) {
      padding-right: 1px;
      border-radius: 3px;
    }
  }
</style>

<!-- 排除登录页的layout布局 : 
  layout插件是默认到src/layouts/default.vue组件 ,
  如果不需要layout布局,可以在路由中排除 -> 在路由中添加meta属性添加layout属性,值为login
  这样可以让layout插件指定去找src/layouts/login.vue组件, 但是这个组件是没有的,所以不会找到,就不会有layout布局
  noAuth: true -> 不需要登陆就可以访问
-->
<route lang="yaml">
meta:
  layout: login
  noAuth: true
</route>
