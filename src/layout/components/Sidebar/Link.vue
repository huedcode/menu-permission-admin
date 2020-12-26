
<template>
  <!-- eslint-disable vue/require-component-is -->
<div>
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</div>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      return {
        is: 'router-link',
        to: url
      }
      // 如果是父第一层路由，就不跳转
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
