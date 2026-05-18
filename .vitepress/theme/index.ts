import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import Layout from './Layout.vue'
import Callout from './components/Callout.vue'
import DnsRecord from './components/DnsRecord.vue'
import Prerequisites from './components/Prerequisites.vue'
import ScreenshotFrame from './components/ScreenshotFrame.vue'
import StepCard from './components/StepCard.vue'
import Steps from './components/Steps.vue'
import StatusTable from './components/StatusTable.vue'

import './styles/index.css'

const theme: Theme = {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Callout', Callout)
    app.component('DnsRecord', DnsRecord)
    app.component('Prerequisites', Prerequisites)
    app.component('ScreenshotFrame', ScreenshotFrame)
    app.component('StepCard', StepCard)
    app.component('Steps', Steps)
    app.component('StatusTable', StatusTable)
  },
}

export default theme
