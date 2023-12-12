// 支持滑动事件
import { computed, onMounted, onUnmounted, ref, Ref } from "vue";

type Point = {
  x: number;
  y: number;
}
interface Options {
  beforeStart?: (e: TouchEvent) => void
  afterStart?: (e: TouchEvent) => void
  beforeMove?: (e: TouchEvent) => void
  afterMove?: (e: TouchEvent) => void
  beforeEnd?: (e: TouchEvent) => void
  afterEnd?: (e: TouchEvent) => void
}

export const useSwipe = (element: Ref<HTMLElement | undefined>, options?: Options) => {
  const start = ref<Point>()
  const end = ref<Point>()
  const swiping = ref(false)
// 移动距离
  const distance = computed(() => {
    if (!start.value || !end.value) { return null }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y,
    }
  })
  // 记录移动方向
  const direction = computed(() => {
    if (!distance.value) { return '' }
    const { x, y } = distance.value
    // 看x y绝对值 决定移动方向
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left'
    } else {
      return y > 0 ? 'down' : 'up'
    }
  })
  const onStart = (e: TouchEvent) => {
    options?.beforeStart?.(e)
    swiping.value = true
    end.value = start.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
    options?.afterStart?.(e)
  }
  const onMove = (e: TouchEvent) => {
    options?.beforeMove?.(e)
    if (!start.value) { return }
    end.value = { x: e.touches[0].screenX, y: e.touches[0].screenY, }
    options?.afterMove?.(e)
  }
  const onEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e)
    swiping.value = false
    options?.afterEnd?.(e)
  }
// 监听触摸事件 onMounted默认挂到当前组件 
  onMounted(() => {
    if (!element.value) { return }
    element.value.addEventListener('touchstart', onStart) //手指接触
    element.value.addEventListener('touchmove', onMove) //手指移动
    element.value.addEventListener('touchend', onEnd) //手指停止
  })
  onUnmounted(() => {
    if (!element.value) { return }
    element.value.removeEventListener('touchstart', onStart)
    element.value.removeEventListener('touchmove', onMove)
    element.value.removeEventListener('touchend', onEnd)
  })
  return {
    swiping,
    direction,
    distance,
  }
}