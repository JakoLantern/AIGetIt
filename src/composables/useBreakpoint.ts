import { onBeforeUnmount, onMounted, readonly, ref, type Ref } from 'vue'

const DESKTOP_QUERY = '(min-width: 1024px)'

type BreakpointState = {
  isDesktop: Readonly<Ref<boolean>>
}

export function useBreakpoint(query: string = DESKTOP_QUERY): BreakpointState {
  const isDesktop = ref(typeof window === 'undefined' ? true : window.matchMedia(query).matches)

  let mediaQueryList: MediaQueryList | null = null
  let handleChange: ((event: MediaQueryListEvent) => void) | null = null

  onMounted(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    mediaQueryList = window.matchMedia(query)
    isDesktop.value = mediaQueryList.matches

    handleChange = (event: MediaQueryListEvent) => {
      isDesktop.value = event.matches
    }

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', handleChange)
      return
    }

    mediaQueryList.addListener(handleChange)
  })

  onBeforeUnmount(() => {
    if (!mediaQueryList || !handleChange) {
      return
    }

    if (typeof mediaQueryList.removeEventListener === 'function') {
      mediaQueryList.removeEventListener('change', handleChange)
    } else {
      mediaQueryList.removeListener(handleChange)
    }
  })

  return {
    isDesktop: readonly(isDesktop),
  }
}