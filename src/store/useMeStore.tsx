import { defineStore } from "pinia";
import { http } from "../shared/Http";
import { AxiosResponse } from "axios";

type MeState = {
    me?: User 
    mePromise?: Promise<AxiosResponse<Resource<User>>>
}
type MeActions = {
    refreshMe: () => void
    fetchMe: () => void
}
// 箭头函数导出一个对象，对象要用圆括号括起来
export const useMeStore = defineStore<string, MeState, {}, MeActions>('me', {
   state: () => ({
    me: undefined,
    mePromise: undefined
   }),
   actions: {
      refreshMe(){
        this.mePromise = http.get<Resource<User>>('/me')
      },
      fetchMe(){
        this.refreshMe()
      }
    }
})