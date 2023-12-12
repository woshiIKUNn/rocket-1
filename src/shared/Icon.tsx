import { defineComponent, PropType } from 'vue';
import s from './Icon.module.scss';

export type IconName = 'add' | 'chart' | 'clock' | 'cloud' |
  'mangosteen' | 'pig' | 'menu' | 'charts' | 'notify' | 'export' | 'left' | 'notes' | 'date' | 'rocket2'

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true, // 必须传name
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>
    }
  },
  setup: (props, context) => {
    return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={'#' + props.name}></use>
      </svg>
    )
  }
})

