export function getBoundingClientRect(el: HTMLElement) {
    const { x, y, top, left, height, width } = el?.getBoundingClientRect() || { x: 0, y: 0, top: 0, left: 0, height: window.innerHeight, width: window.innerWidth }
    return {
        x,
        y,
        top,
        left,
        bottom: top + height,
        right: left + width,
        height,
        width
    }
}

export function getBoundingClientRectByPointerEvent(e: PointerEvent) {
    return getBoundingClientRect(e.target as HTMLElement)
}