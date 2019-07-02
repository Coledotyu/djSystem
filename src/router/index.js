import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const constRouterMap = [{
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/management',
    name: 'Management',
    component: () => import('@/views/Management'),
    children: [{
        path: '/partyMemRepCount',
        name: 'PartyMemRepCount',
        meta: ['Home'],
        component: () => import('@/views/PartyMemRepCount'),
      },
      {
        path: '/partyMemRep',
        name: 'PartyMemRep',
        meta: ['党员报到'],
        component: () => import('@/views/PartyMemRep'),
      },
      {
        path: '/partyMemInfo',
        name: 'PartyMemInfo',
        meta: ['党员信息'],
        component: () => import('@/views/PartyMemInfo'),
      },
      {
        path: '/meetingRecord',
        name: 'MeetingRecord',
        meta: ['会议信息'],
        component: () => import('@/views/MeetingRecord'),
      },
      {
        path: '/infoCommunication',
        name: 'InfoCommunication',
        meta: ['信息交流广场'],
        component: () => import('@/views/InfoCommunication'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [...constRouterMap],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    };
  },
});

router.afterEach((to) => {
  document.title = to.name;
});

export default router;
