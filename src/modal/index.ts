import { Ref, computed, ref, shallowRef, unref, watch, nextTick } from "vue";
import { type LayerDialogPlaceMent, type LayerDialogProps, parserLayerPlacement } from './dialog';
import { getBoundingClientRectByPointerEvent, getBoundingClientRectByTo } from "./componsition/tools";
import { useElementVisibility, useEventListener } from "@vueuse/core"
import { useZIndex } from "../shared/useZIndex";

export {
    LayerDialogProps,
    LayerDialogPlaceMent
}
/**
 * @param target - 可拖动目标元素
*/
export function useLayerDialog(target: Ref<HTMLElement | SVGElement | null | undefined>, props?: LayerDialogProps) {
    type Position = { top: number, left: number }

    const { placement = "auto", to = ref("body"), lockBoundary = false } = props || {}
    const targetIsVisible = useElementVisibility(target)
    let lockInitPlacement = false // 锁定初始化时的，位置设置影响到 setPlacement 直接设置
    const zIndex = useZIndex()

    const postion = ref<Position>({ top: 0, left: 0 })

    // 需要移动的元素
    const handle = ref<HTMLElement>()

    watch(targetIsVisible, (visible) => {
        if(visible){
            // 处理需要移动的元素
            const _handle = unref(target).querySelector("[handle]") as HTMLElement
            _handle ? handle.value = _handle : handle.value = target.value as HTMLElement
            handle.value.style.cursor = "move"
        }
        // 监听目标元素是否可见
        (visible && !lockInitPlacement) ? setPlacement(placement) : ''
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

    useEventListener(handle, "pointerdown", pointerdown, { capture: true })
    useEventListener(handle, "pointermove", pointermove, { capture: true })
    useEventListener(target, "pointerup", pointerup, { capture: true })

    async function setPlacement(_placement: LayerDialogPlaceMent) {
        if (!target.value) {
            lockInitPlacement = true
            await nextTick()
        }

        const { top, left } = parserLayerPlacement(_placement, target as Ref<HTMLElement>, to)

        // 设置Zindex
        unref(target).style.zIndex = zIndex.value + ''

        if (to.value == "body") {
            unref(target).style.position = "fixed"
        } else {
            unref(target).style.position = "absolute"
            unref(bounding).el.style.position = "relative"
        }
        postion.value = { top, left }
        setTimeout(() => {
            lockInitPlacement = false
        }, 200);
    }

    return {
        style,
        setPlacement,
    }
}