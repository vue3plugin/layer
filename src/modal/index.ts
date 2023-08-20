import { Ref, computed, ref, shallowRef, unref, watch, nextTick } from "vue";
import { type LayerDialogPlaceMent, type LayerDialogProps, parserLayerPlacement } from './dialog';
import { getBoundingClientRect } from "./componsition/tools";
import { useZIndex } from "../shared/useZIndex";
import { useEventListener } from "../shared/useEventListener";
import { useBodyResize } from "../shared/useWindowResize";

export {
    LayerDialogProps,
    LayerDialogPlaceMent
}
/**
 * @param target - 可拖动目标元素
*/
export function useLayerDialog(target: Ref<HTMLElement>, props?: LayerDialogProps) {
    type Position = { top: number, left: number }

    const { placement = "auto", to = ref(), lockBoundary = false } = props || {}

    let lockInitPlacement = false // 锁定初始化时的，位置设置影响到 setPlacement 直接设置
    const zIndex = useZIndex()

    const postion = ref<Position>({ top: 0, left: 0 })

    // 需要移动的元素
    const handle = ref<HTMLElement>()

    watch(target, (target) => {
        if (target) {
            // 处理需要移动的元素
            const _handle = unref(target).querySelector("[move]") as HTMLElement
            _handle ? handle.value = _handle : handle.value = target as HTMLElement
            handle.value.style.cursor = "move"
        }
        // 监听目标元素是否可见
        (target && !lockInitPlacement) ? setPlacement(placement) : ''
    })

    // 根据 boundingRef 确定元素活动最大边界
    const triggerBounding = ref(0)
    useBodyResize(to, () => triggerBounding.value++) // 用于更新 bounding
    const bounding = computed(() => (triggerBounding.value, getBoundingClientRect(unref(to))))

    const style = computed(() => ({ top: `${unref(postion).top}px`, left: `${unref(postion).left}px` }))

    const dragging = shallowRef(false)

    // 鼠标距离元素内部最小矩形的上下边距
    const targetInfo = {
        top: 0,
        left: 0,
        height: 0,
        width: 0,
    }


    function pointerdown(e: PointerEvent) {
        e.stopPropagation()
        dragging.value = true
        const { top, left, height, width } = getBoundingClientRect(unref(target))

        targetInfo.left = e.clientX - left
        targetInfo.top = e.clientY - top

        if (lockBoundary) {
            targetInfo.height = height
            targetInfo.width = width
        }

        document.addEventListener("pointermove", pointermove)
    }


    function pointermove(e: PointerEvent) {
        e.stopPropagation()
        if (!dragging.value) return
        const left = e.clientX - unref(bounding).left - targetInfo.left
        const top = e.clientY - unref(bounding).top - targetInfo.top

        // 如果边界被锁定，移动超出边界则不允许移动
        const _top = lockBoundary ? Math.min(Math.max(0, top), unref(bounding).height - targetInfo.height) : top
        const _left = lockBoundary ? Math.min(Math.max(0, left), unref(bounding).width - targetInfo.width) : left

        postion.value = { top: _top, left: _left }
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

        if (!to.value) {
            unref(target).style.position = "fixed"
        } else {
            unref(target).style.position = "absolute"
            unref(to).style.position = "relative"
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