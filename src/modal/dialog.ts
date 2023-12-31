import { isArray } from "howtools";
import { Ref, unref } from "vue";
import { getBoundingClientRect } from "./componsition/tools";

export interface LayerDialogEmits {
    open: () => true,
    opened: () => true,
    close: () => true,
    closed: () => true,
    ['update:modelValue']: (value: boolean) => boolean,
    openAutoFocus: () => true,
    closeAutoFocus: () => true,
}


export type LayerDialogPlaceMent = 'auto' | 't' | 'b' | 'l' | 'r' | 'rb' | 'rt' | 'lt' | 'lb' | [number, number]

export interface LayerDialogProps {
    placement?: LayerDialogPlaceMent,
    to?: Ref<HTMLElement>, // 边界组件
    lockBoundary?: boolean,
}


export function parserLayerPlacement(placement: LayerDialogPlaceMent, target: Ref<HTMLElement>, to: Ref<HTMLElement>) {
    if (isArray(placement)) return { top: placement[0], left: placement[1] }

    const toRect = getBoundingClientRect(unref(to))
    toRect.height = !to.value ? window.innerHeight : toRect.height
    toRect.width = !to.value ? window.innerWidth : toRect.width

    const targetRect = unref(target).getBoundingClientRect()

    const top = (toRect.height - targetRect.height) / 2

    const left = (toRect.width - targetRect.width) / 2

    if (placement == "auto") {
        return { top, left }
    }

    if (placement == "t") {
        return { top: 0, left }
    }

    if (placement == "b") {
        return { top: toRect.height - targetRect.height, left }
    }

    if (placement == "l") {
        return { top, left: 0 }
    }

    if (placement == "r") {
        return { top, left: toRect.width - targetRect.width }
    }

    if (placement == "rb") {
        return { top: toRect.height - targetRect.height, left:  toRect.width - targetRect.width }
    }

    if (placement == "rt") {
        return { top: 0, left: toRect.width - targetRect.width }
    }

    if (placement == "lt") {
        return { top: 0, left: 0 }
    }

    if (placement == "lb") {
        return { top: toRect.height - targetRect.height, left: 0 }
    }

    return { top: 0, left: 0 }
}