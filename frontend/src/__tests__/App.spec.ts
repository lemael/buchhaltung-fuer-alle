import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: 'div' } }],
})

describe('App.vue', () => {
  it('mounts successfully', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.exists()).toBeTruthy()
  })
})
