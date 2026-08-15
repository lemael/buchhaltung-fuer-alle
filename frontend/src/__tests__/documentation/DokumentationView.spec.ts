import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Dokumentation from '../../views/DokumentationView.vue'

describe('Dokumentation', () => {
  it('kann erfolgreich geladen werden', () => {
    const wrapper = mount(Dokumentation)

    expect(wrapper.exists()).toBe(true)
  })
})

describe('Dokumentation – Integration', () => {
  it('zeigt den Projektaufgaben-Tab nach dem Klick an', async () => {
    const wrapper = mount(Dokumentation)

    const tasksButton = wrapper
      .findAll('button')
      .find((button) => button.text() === 'Projektaufgaben')

    expect(tasksButton).toBeDefined()

    await tasksButton!.trigger('click')

    expect(wrapper.text()).toContain('Projektaufgaben')
  })
})
