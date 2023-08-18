import { onMounted, onUnmounted } from "vue";

export function useEventListener<K extends keyof DocumentEventMap>(element: HTMLElement | Document, type: K, listener: (ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions) {
    const event = (ev) => listener(ev)
    onMounted(() => {
        element.addEventListener(type, event, options)
    })
    onUnmounted(() => {
        element.removeEventListener(type, event)
    })
}