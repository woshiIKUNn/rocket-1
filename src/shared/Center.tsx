// 封装中间层组件
import { defineComponent, PropType } from 'vue';
import s from './Center.module.scss';
// 支持两种方式排列
const directionMap = {
  '-': s.horizontal, // 横
  '|': s.vertical,  // 竖
  'horizontal': s.horizontal,
  'vertical': s.vertical
}
export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<'-' | '|' | 'horizontal' | 'vertical'>,
      default: 'horizontal' // 默认横
    }
  },
  setup: (props, context) => {
    const extraClass = directionMap[props.direction]
    return () => (
      <div class={[s.center, extraClass]}>{
        context.slots.default?.()
      }</div>
    )
  }
})