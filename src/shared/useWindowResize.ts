import { addResizeListener, removeResizeListener } from "howtools";
import { Ref, onMounted, onUnmounted, unref, watchEffect } from "vue";

export function useBodyResize(el: Ref<HTMLElement>, fn) {

    const stop = watchEffect(() => {
        if (!unref(el)) {
            return
        }
        addResizeListener(el.value as HTMLDivElement, fn)

        stop()
    })

    onMounted(() => {
        addResizeListener(document.body as HTMLDivElement, fn)
    })

    onUnmounted(() => {
        removeResizeListener(el.value as HTMLDivElement, fn)
        addResizeListener(document.body as HTMLDivElement, fn)
    })
}