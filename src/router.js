import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from './views/TabsPage.vue'

const routes = [
    {
        path: '/',
        component: TabsPage,
        children: [

            {
                path: '',
                component: import('@/views/Home.vue')
            },
            {
                path: 'tab2',
                component: import('@/views/non-department.vue')
            },
            {
                path: 'tab3',
                component: import('@/views/founded.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;