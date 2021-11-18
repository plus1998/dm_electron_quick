import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
import ElementUI from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App as any)

app.use(ElementUI)
app.mount('#app')
