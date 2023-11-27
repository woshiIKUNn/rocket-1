import s from './welcome.module.scss';
export const Third = () => {
  return (
    <div class={s.card}>
      <svg>
        <use xlinkHref='#chart'></use>
      </svg>
      <h2>每日提醒<br />不遗漏每一笔账单<br />（广告3）</h2>
    </div>
  )
}

Third.displayName = 'Third'