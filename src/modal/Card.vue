<template>
    <Teleport :to="to">
        <div class="absolute bg-white" @pointerdown="pointerdown" @pointermove="pointermove" @pointerup="pointerup"
            :style="style" ref="target">
            <slot></slot>
        </div>
    </Teleport>
</template>
<script setup lang="ts">
import { reactive, shallowRef, ref, unref, computed, watch, type RendererElement } from 'vue';
import { getBoundingClientRectByTo, getBoundingClientRectByPointerEvent } from './componsition/tools';

type Position = { top: number, left: number }
type Props = {
    top?: number, // 初始化位置，x坐标
    left?: number, // 初始化位置，y坐标
    to?: string | RendererElement | null | undefined, // 边界组件
    lockBoundary?: boolean,
}

const props = withDefaults(defineProps<Props>(),
    {
        top: 100,
        left: 200,
        to: "body",
    })

const postion = reactive<Position>({
    top: 0,
    left: 0,
})

watch(props, ({ top, left }) => {
    postion.top = top
    postion.left = left
}, {
    immediate: true
})

// 根据 boundingRef 确定元素活动最大边界
const bounding = computed(() => getBoundingClientRectByTo(props.to || "body"))

const style = computed(() => ({ top: `${postion.top}px`, left: `${postion.left}px` }))

const target = ref<HTMLElement | SVGElement | null | undefined>() // 目标拖动元素

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

    if (props.lockBoundary) {
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
    if (props.lockBoundary) {
        const { top: ctop, left: cleft, height: cheight, width: cwidth } = getBoundingClientRectByPointerEvent(e)

        if (cleft < unref(bounding).left || ctop < unref(bounding).top || cleft + cwidth > unref(bounding).right || ctop + cheight > unref(bounding).bottom) {
            return
        }
    }

    postion.left = left
    postion.top = top
}

function pointerup(e: PointerEvent) {
    dragging.value = false
    document.removeEventListener("pointermove", pointermove)
}
</script>