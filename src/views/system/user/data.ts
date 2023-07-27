import { setRoleStatus } from '@/api/modules/user';
import { NSwitch, NTag, NButton, NTooltip } from 'naive-ui';

export const columns = [
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
            // 通过调用setRoleStatus()修改数据库中的值
            setRoleStatus({ status: e, userId: row.userId })
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
    render(_row: any) {
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
                  },
                },
                // 参数3:组件插槽 --> 添加按钮图标, 通过渲染函数 渲染i标签 添加图标
                { default: () => h('i', { class: 'i-ant-design:form-outlined' }) },
                // { default: () => 'aaa' }, //直接渲染文本
                // {
                //   default: () =>
                //     h('div', {}, [h('i', { class: 'i-ant-design:form-outlined' }), '111']),
                // }, //渲染多个元素->图标+文本
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
                  onClick: () => {
                    // console.log(row.userId);
                    // delUser(row.userId + 'ASD');//删除这种东西不用乱动
                  },
                },
                { default: () => h('i', { class: 'i-ant-design:delete-outlined' }) },
              ),
            default: () => '删除',
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
                  type: 'info',
                  onClick: () => {
                    //   console.log(row);
                  },
                },
                { default: () => h('i', { class: 'i-ant-design:key-outlined' }) },
              ),
            default: () => '查找',
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
            default: () => '确认',
          },
        ),

        // h(
        //   NButton,
        //   {
        //     size: 'small',
        //     type: 'success',
        //     onClick: () => {
        //       //   console.log(row);
        //     },
        //   },
        //   { default: () => h('i', { class: 'i-ant-design:check-circle-outlined' }) },
        // ),
      ];
      // 只显示一个按钮
      // return h(
      //   NButton,
      //   {
      //     size: 'small',
      //     type: 'primary',
      //     // onClick: () => {
      //     //   console.log(row);
      //     // },
      //   },
      //   { default: () => h('i', { class: 'i-ant-design:edit-outlined' }) },
      // );
    },
  },
];
