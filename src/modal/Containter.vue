<template>
    <Teleport :to="to">
        <div class="absolute bg-white" @pointerdown="pointerdown" @pointermove="pointermove" @pointerup="pointerup"
            :style="style" ref="target">
            <slot></slot>
        </div>
    </Teleport>
</template>
<script setup lang="ts">
import { reactive, shallowRef, ref, unref, computed, watch, type RendererElement, onMounted } from 'vue';
import { isString } from "howtools"
type Position = { top: number, left: number }
const props = withDefaults(defineProps<{
    top?: number, // 初始化位置，x坐标
    left?: number, // 初始化位置，y坐标
    to?: string | RendererElement | null | undefined, // 边界组件
    lockBoundary?: boolean,
}>(),
    {
        top: 100,
        left: 200,
        to: "body",
    })

const postion = reactive<Position>({
    top: 0,
    left: 0,
})

// 根据 boundingRef 确定元素活动最大边界
const bounding = {
    top: 0,
    left: 0,
    right: document.body.offsetLeft,
    bottom: document.body.offsetHeight,
}

watch(props, ({ top, left, to }) => {
    postion.top = top
    postion.left = left
}, {
    immediate: true
})

setTimeout(() => {
    const to = props.to
    if (to) {
        let el: RendererElement;
        if (isString(to)) {
            if (to.includes("#")) el = document.getElementById(to)
            else el = document.querySelector(to)
        } else {
            el = to
        }
        debugger
        const { top, left, width, height } = el.getBoundingClientRect()
        console.log(el, { top, left, width, height })
        bounding.top = top
        bounding.left = left
        bounding.right = left + width
        bounding.bottom = top + height
    }
}, 100)

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
    const { top, left, height, width } = unref(target).getBoundingClientRect()
    console.log("pointerdown", { top, left, height, width }, bounding)
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
    const left = e.pageX - bounding.left - targetDistance.left
    const top = e.pageY - bounding.top - targetDistance.top



    // 如果边界被锁定，移动超出边界则不允许移动
    // if (props.lockBoundary) {
    const { top: ctop, left: cleft, height: cheight, width: cwidth } = (e.target as RendererElement).getBoundingClientRect()

    if (cleft < bounding.left || ctop < bounding.top || cleft + cwidth > bounding.right || ctop + cheight < bounding.top) {
        return
    }
    // }

    postion.left = left
    postion.top = top
}

function pointerup(e: PointerEvent) {
    dragging.value = false
    document.removeEventListener("pointermove", pointermove)
}

// useEventListener(document, "mousemove", pointermove)
</script>