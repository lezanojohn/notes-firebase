import { createRouter, createWebHistory } from 'vue-router';
import { auth, getCurrentUser } from '@/firebase';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/new-note',
        name: 'NewNote',
        component: () => import('@/views/CreateNoteView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/edit-note/:id',
        name: 'EditNote',
        component: () => import('@/views/EditNoteView.vue'),
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundView.vue'),
        meta: {
            requiresAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach(async (to, from, next) => {
    const pathRequiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = await getCurrentUser(auth);
    if (pathRequiresAuth && !currentUser) {
        next('/');
    } else {
        next();
    }
});

export default router;