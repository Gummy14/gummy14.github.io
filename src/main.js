import './assets/main.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css';
// import { aliases, mdi } from 'vuetify/iconsets/mdi'

import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//Components
import App from './App.vue'
import VueVirtualScroller from 'vue3-virtual-scroller'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'
import router from './router'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // use mdi icons
    aliases: {},       // empty
    sets: {}           // empty
  },
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2560
    },
  },
})

const app = createApp(App)

app.config.devtools = true;
app.use(router)
app.use(vuetify)
app.use(VueVirtualScroller)

app.mount('#app')
