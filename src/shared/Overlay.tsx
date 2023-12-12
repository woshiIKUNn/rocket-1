
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { Icon } from './Icon';
import s from './Overlay.module.scss';

import { Dialog } from 'vant';
import { useMeStore } from '../stores/useMeStore';
// 侧边浮层
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },   
  },
  setup: (props) => {
    const meStore = useMeStore()
    const close = () => {
      props.onClose?.()
    }
    const route = useRoute()
    const me = ref<User>()
    onMounted(async () => {
      const response = await meStore.mePromise
      me.value = response?.data.resource
    })
    const onSignOut = async () => {
      await Dialog.confirm({
        title: '确认',
        message: '你真的要退出登录吗？',
      })
      localStorage.removeItem('jwt')
      window.location.reload()
    }
    return () => <>
      <div class={s.mask} onClick={close}></div>
      <div class={s.overlay}>

        <section class={s.currentUser}>
          {me.value ? (
            <div>
              <h2 class={s.email}>{me.value.email}</h2>
              <p onClick={onSignOut}>点击这里退出登录</p>
            </div>
          ) : (
            <RouterLink to={'/sign_in?return_to=${route.fullpath}'}>
              <h2>未登录用户</h2>
              <p>点击这里登录</p>
            </RouterLink>
          )}
        </section>


        <nav>
          <ul class={s.action_list}>
           {/* 点击旁边空白关闭 */}
            <li onClick={close}>
              <RouterLink to="/items" class={s.action} >
                <Icon name='pig' class={s.icon} />
                  <span>记账</span>
              </RouterLink>
            </li>
            <li onClick={close}>
              <RouterLink to="/statistics" class={s.action}>
                <Icon name="charts" class={s.icon} />
                <span>统计图表</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/export" class={s.action}>
                <Icon name="export" class={s.icon} />
                <span>导出数据</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/notify" class={s.action}>
                <Icon name="notify" class={s.icon} />
                <span>记账提醒</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  }
})

// 点击菜单按钮触发事件
export const OverlayIcon = defineComponent({
  setup: () => {
    // 是否展示 默认值false
    const refOverlayVisible = ref(false)
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value
    }
    return () => <>
      <Icon name="menu" class={s.icon} onClick={onClickMenu} />
      {refOverlayVisible.value &&
        <Overlay onClose={() => refOverlayVisible.value = false} />
      }
    </>

  }
})
