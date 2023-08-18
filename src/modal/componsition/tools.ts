import { isString } from "howtools";
import type { RendererElement } from "vue";

export function getBoundingClientRect(el: RendererElement) {
    const { top, left, height, width } = el.getBoundingClientRect()
    return {
        x: top,
        y: left,
        top,
        left,
        bottom: top + height,
        right: left + width,
        height,
        width
    }
}

export function getBoundingClientRectByPointerEvent(e: PointerEvent) {
    return getBoundingClientRect(e.target)
}

/**
 * 根据class、id、元素本身 获取元素的Rec
*/
export function getBoundingClientRectByTo(to: string | RendererElement = "body") {
    let el: RendererElement;
    if (isString(to)) {
        if (to.includes("#")) el = document.getElementById(to)
        else el = document.querySelector(to)
    } else {
        el = to
    }

    const rect = getBoundingClientRect(el)
    const height = to == 'body' ? window.innerHeight : rect.height
    const width = to == 'body' ? window.innerWidth : rect.width

    return {
        ...rect,
        height,
        width,
        bottom: rect.top + height,
        right: rect.left + width,
        el,
    }
}