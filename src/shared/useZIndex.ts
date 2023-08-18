import { customRef } from "vue"
export function useZIndex() {
    let value = 1000
    return customRef((track, trigger) => {
        return {
            get() {
                track()
                return value++
            },
            set(newValue) {
                value = newValue
                trigger() // 重新解析模板
            }
        }
    })
}