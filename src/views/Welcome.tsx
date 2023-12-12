// 广告页面
import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router';
import { useSwipe } from '../hooks/useSwipe';
import { throttle } from '../shared/throttle';
import s from './Welcome.module.scss';
import { Icon } from '../shared/Icon';
// 更改pushmap类型
const pushMap: Record<string, string> = {
  'Welcome1': '/welcome/2',
  'Welcome2': '/welcome/3',
  'Welcome3': '/welcome/4',
  'Welcome4': '/items',
}
export const Welcome = defineComponent({
  setup: (props, context) => {
    type Y = {Component: VNode, route: RouteLocationNormalizedLoaded}
    const main = ref<HTMLElement>()
    // e.preventDefault阻止浏览器默认滑动
    const { direction, swiping } = useSwipe(main, { beforeStart: e => e.preventDefault() }) 
    const route = useRoute()
    const router = useRouter()
    // 节流 每500ms刷新一次 防止多次触发滑动事件
    const replace = throttle(() => {
      const name = (route.name || 'Welcome1').toString()
      router.replace(pushMap[name])
    }, 500)
    // watchEffect当前作用域发生变化就执行
    watchEffect(() => {
      if (swiping.value && direction.value === 'left') {
        replace()
      }
    })
    return () => 
    <div class={s.wrapper}>
      <header>
        <Icon name='rocket2'></Icon>
        <h1>火箭记账</h1>
      </header>
      <main class={s.main} ref={main}> 
        <RouterView name="main"> 
          {
          ({ Component }: Y ) =>
            <Transition 
              enterFromClass={s.slide_fade_enter_from} 
              enterActiveClass={s.slide_fade_enter_active}
              leaveToClass={s.slide_fade_leave_to} 
              leaveActiveClass={s.slide_fade_leave_active}>
              {Component}
            </Transition>
          }
        </RouterView>
      </main>
      <footer>
        <RouterView name="footer" />
      </footer>
    </div>
  }
})
// 支持手势滑动动画 
// 1 先在官网找路由间切换的动画的代码 搜索"vuejs router animation"  ->   让<RouterView>里有<Transition>且同时包住component
// 2 为了让<Transition>支持css modules,查询transition还支持哪些api? ->   得到了enterFromClass等 
// 3 寻找Component类型     ->    得知 type Y = {Component: VNode, route: RouteLocationNormalizedLoaded}