import s from './welcome.module.scss';
import { FunctionalComponent } from 'vue';
// FunctionalComponent纯函数 无状态 无生命周期
export const First: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <svg>
        <use xlinkHref='#pig'></use>
      </svg>
      <h2>会挣钱<br />还会省钱<br />（广告1）</h2>
    </div>
  )
}

First.displayName = 'First'