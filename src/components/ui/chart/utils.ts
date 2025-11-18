import type { ChartConfig } from '.'
import { isClient } from '@vueuse/core'
import { useId } from 'reka-ui'
import { h, render } from 'vue'
import type { Component } from 'vue'

const cache = new Map<string, string>()

function serializeKey(key: Record<string, unknown>): string {
  return JSON.stringify(key, Object.keys(key).sort())
}

export function componentToString<TData = unknown>(
  config: ChartConfig,
  component: Component, // usa Component generico
  props?: Record<string, unknown>,
) {
  if (!isClient) return

  const id = useId()

  return (dataInput: TData, x: number | Date): string => {
    const data =
      typeof dataInput === 'object' && dataInput !== null && 'data' in dataInput
        ? (dataInput as { data: unknown }).data
        : dataInput

    const serializedKey = `${id}-${serializeKey(data as Record<string, unknown>)}`
    const cachedContent = cache.get(serializedKey)
    if (cachedContent) return cachedContent

    // qui il cast è minimo ma necessario
    const vnode = h(component, { ...props, payload: data, config, x })
    const div = document.createElement('div')
    render(vnode, div)

    cache.set(serializedKey, div.innerHTML)
    return div.innerHTML
  }
}
