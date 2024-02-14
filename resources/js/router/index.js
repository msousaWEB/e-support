import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../main/components/Login.vue'),
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../main/components/Dashboard.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/chamados',
        name: 'Chamados',
        component: () => import('../main/components/Chamados.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../main/components/Home.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/chamado',
        name: 'Chamado',
        component: () => import('../main/components/forms/ChamadoForm.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/config',
        name: 'Configurações',
        component: () => import('../main/components/Configuracoes.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../main/components/NotFound.vue'),
        meta: {requiresAuth: true}
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const token = localStorage.getItem('jwt-token');

    if (requiresAuth && token) {
        axios.post('/api/user', {}, {
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then(response => {
                next();
            })
            .catch(error => {
                console.error("Erro de autenticação:", error);
                localStorage.removeItem('jwt-token');
                next('/login');
            });
    } else if (requiresAuth && !token) {
        next('/login');
    } else {
        next();
    }
});


export default router;
