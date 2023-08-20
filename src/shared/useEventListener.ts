import { type Ref, onUnmounted, unref, watchEffect } from "vue";

export function useEventListener<K extends keyof DocumentEventMap>(element: Ref<HTMLElement | Document>, type: K, listener: (ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions) {
    const event = (ev) => listener(ev)

    watchEffect(() => {
        if (!unref(element)) {
            return
        }
        unref(element).addEventListener(type, event, options)
    })

    onUnmounted(() => {
        unref(element)?.removeEventListener(type, event)
    })
}