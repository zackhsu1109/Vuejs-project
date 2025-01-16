import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useClaimsStatusShowStore = defineStore('ClaimsStatusShowStore', () => {
    //state
    const id = ref(1);

    //gettter
    const doubleCount = computed(() => count.value * 2)

    //action
    const add = () => id.value++;

     // action
     const setId = (newId) => {
        id.value = newId; // 修改 id 的值
    };

    const incrementId = () => {
        id.value++; // 增加 id 的值
    };

    return {
        id,
        add,
        setId,
        incrementId
       
    };
},{
    persist: true, // 啟用持久化
});