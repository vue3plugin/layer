import { Ref, computed, ref, shallowRef, unref, watch } from "vue";
import { LayerDialogProps, parserLayerPlacement } from './dialog';
import { getBoundingClientRectByPointerEvent, getBoundingClientRectByTo } from "./componsition/tools";
import { useElementVisibility, useEventListener } from "@vueuse/core"
/**
 * 
*/
export function useLayerDialog(target: Ref<HTMLElement | SVGElement | null | undefined>, props?: LayerDialogProps) {
    type Position = { top: number, left: number }

    const { placement = "auto", to = ref("body"), lockBoundary = "false" } = props || {}
    const targetIsVisible = useElementVisibility(target)

    const postion = ref<Position>({ top: 0, left: 0 })

    // 监听目标元素是否可见
    watch(targetIsVisible, (visible) => {
        const { top, left, el } = parserLayerPlacement(placement, target as Ref<HTMLElement>, to )
        if(to.value = "body"){
            unref(target).style.position = "fixed"
        }else {
            unref(target).style.position = "postion"
            el.style.position = "relative"
        }
        visible ? postion.value = { top, left } : ''
    })



    // 根据 boundingRef 确定元素活动最大边界
    const bounding = computed(() => getBoundingClientRectByTo(unref(to)))

    const style = computed(() => ({ top: `${unref(postion).top}px`, left: `${unref(postion).left}px` }))

    const dragging = shallowRef(false)

    // 鼠标距离元素内部最小矩形的上下边距
    const targetDistance = {
        top: 0,
        left: 0,
        height: 0,
        width: 0,
    }


    function pointerdown(e: PointerEvent) {
        e.stopPropagation()
        dragging.value = true
        const { top, left, height, width } = getBoundingClientRectByPointerEvent(e)

        targetDistance.left = e.pageX - left
        targetDistance.top = e.pageY - top

        if (lockBoundary) {
            targetDistance.height = height
            targetDistance.width = width
        }

        console.log(unref(bounding), { top, left, height, width })
        document.addEventListener("pointermove", pointermove)
    }


    function pointermove(e: PointerEvent) {
        e.stopPropagation()
        if (!dragging.value) return
        const left = e.pageX - unref(bounding).left - targetDistance.left
        const top = e.pageY - unref(bounding).top - targetDistance.top

        // 如果边界被锁定，移动超出边界则不允许移动
        if (lockBoundary) {
            const { top: ctop, left: cleft, height: cheight, width: cwidth } = getBoundingClientRectByPointerEvent(e)

            if (cleft < unref(bounding).left || ctop < unref(bounding).top || cleft + cwidth > unref(bounding).right || ctop + cheight > unref(bounding).bottom) {
                return
            }
        }

        postion.value = { top, left }
    }

    function pointerup(e: PointerEvent) {
        dragging.value = false
        document.removeEventListener("pointermove", pointermove)
    }

    useEventListener(target, "pointerdown", pointerdown)
    useEventListener(target, "pointermove", pointermove)
    useEventListener(target, "pointerup", pointerup)

    return {
        style
    }
}