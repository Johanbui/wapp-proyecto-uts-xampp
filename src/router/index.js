import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'Dashboard', icon: 'dashboard', code: 'DASHBOARD-ADMIN' },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard', code: 'DASHBOARD-ADMIN' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    meta: { title: 'User', icon: 'user', code: 'USER-INDEX' },
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('@/views/user/index'),
        meta: { title: 'User', icon: 'user', code: 'USER-INDEX' }

      },
      {
        path: 'create',
        name: 'Create',
        component: () => import('@/views/user/create'),
        meta: { title: 'Create', icon: 'user', code: 'USER-CREATE' },
        hidden: true

      },
      {
        path: 'edit/:id',
        name: 'User Edit',
        component: () => import('@/views/user/edit'),
        meta: { title: 'Edit', icon: 'user', code: 'USER-EDIT' },
        hidden: true

      },
      {
        path: 'index/:id',
        name: 'User',
        component: () => import('@/views/user/one'),
        meta: { title: 'User', icon: 'user', code: 'USER-ONE' },
        hidden: true

      },
      {
        path: 'key/:id',
        name: 'User Change Password',
        component: () => import('@/views/user/key'),
        meta: { title: 'Change Password', icon: 'user', code: 'USER-KEY' },
        hidden: true

      }
    ]
  },

  {
    path: '/rol',
    component: Layout,
    meta: { title: 'Rol', icon: 'el-icon-setting', code: 'ROL-INDEX' },
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('@/views/roles/index'),
        meta: { title: 'Roles', icon: 'el-icon-setting', code: 'ROL-INDEX' }

      },
      {
        path: 'create',
        name: 'Rol Create',
        component: () => import('@/views/roles/create'),
        meta: { title: 'Create', icon: 'el-icon-setting', code: 'ROL-CREATE' },
        hidden: true

      },
      {
        path: 'edit/:id',
        name: 'Rol Edit',
        component: () => import('@/views/roles/edit'),
        meta: { title: 'Edit', icon: 'el-icon-setting', code: 'ROL-EDIT' },
        hidden: true

      },
      {
        path: ':id',
        name: 'Rol',
        component: () => import('@/views/roles/one'),
        meta: { title: 'Rol', icon: 'el-icon-setting', code: 'ROL-ONE' },
        hidden: true

      },
      {
        path: ':id/permissions',
        name: 'Rol - Permisos',
        component: () => import('@/views/roles/permissions'),
        meta: { title: 'Roles Permissions', icon: 'el-icon-setting', code: 'ROL-PERMISSION' },
        hidden: true

      }
    ]
  },

  {
    path: '/acta',
    component: Layout,
    meta: { title: 'Actas', icon: 'el-icon-setting', code: 'ACTA-INDEX' },
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('@/views/actas/index'),
        meta: { title: 'Actas', icon: 'el-icon-setting', code: 'ACTA-INDEX' }

      },
      {
        path: 'create',
        name: 'Acta Create',
        component: () => import('@/views/actas/create'),
        meta: { title: 'Create', icon: 'el-icon-setting', code: 'ACTA-CREATE' },
        hidden: true

      },
      {
        path: 'edit/:id',
        name: 'Acta Edit',
        component: () => import('@/views/actas/edit'),
        meta: { title: 'Edit', icon: 'el-icon-setting', code: 'ACTA-EDIT' },
        hidden: true

      },
      {
        path: ':id',
        name: 'Acta',
        component: () => import('@/views/actas/one'),
        meta: { title: 'Acta', icon: 'el-icon-setting', code: 'ACTA-ONE' },
        hidden: true

      }
    ]
  },

  {
    path: '/idea',
    component: Layout,
    meta: { title: 'Ideas', icon: 'el-icon-setting', code: 'IDEA-INDEX' },
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('@/views/ideas/index'),
        meta: { title: 'Ideas', icon: 'el-icon-setting', code: 'IDEA-INDEX' }
      },
      {
        path: 'create',
        name: 'Idea Create',
        component: () => import('@/views/ideas/create'),
        meta: { title: 'Create', icon: 'el-icon-setting', code: 'IDEA-CREATE' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'Idea Edit',
        component: () => import('@/views/ideas/edit'),
        meta: { title: 'Edit', icon: 'el-icon-setting', code: 'IDEA-EDIT' },
        hidden: true
      },
      {
        path: ':id',
        name: 'Idea',
        component: () => import('@/views/ideas/one'),
        meta: { title: 'Idea', icon: 'el-icon-setting', code: 'IDEA-ONE' },
        hidden: true
      }
    ]
  },

  {
    path: '/trabajodegrado',
    component: Layout,
    meta: { title: 'trabajodegrado', icon: 'form', code: 'TRABAJOGRADO-INDEX' },
    children: [
      {
        path: 'index',
        name: 'Trabajo de Grado',
        component: () => import('@/views/trabajodegrado/index'),
        meta: { title: 'trabajodegrado', icon: 'form', code: 'TRABAJOGRADO-INDEX' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
