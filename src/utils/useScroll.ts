/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-18 10:32:56
 */
import { onBeforeUnmount } from "vue";

/**
 * 在整个窗口滚动
 * @param isScroll 
 */
export default function useScroll(isScroll) {
    function handleScroll(e) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const clientHeight = document.documentElement.clientHeight
        const scrollHeight = document.documentElement.scrollHeight

        if (scrollTop + clientHeight >= scrollHeight) {
            isScroll.value = true
        } else {
            isScroll.value = false
        }
    }

    window.addEventListener('scroll', handleScroll)

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    return isScroll
}

/**
 * 在某个层滚动
 * @param currentRef 层的ref
 */
export function useScrollDiv(currentRef) {
    const scrollTop = currentRef.value.scrollTop
    const clientHeight = currentRef.value.clientHeight + 1
    const scrollHeight = currentRef.value.scrollHeight

    let isScroll = false
    if (scrollTop + clientHeight >= scrollHeight) {
        isScroll = true
    } else {
        isScroll = false
    }
    return isScroll
}

