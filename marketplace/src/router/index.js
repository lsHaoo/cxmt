import { createRouter, createWebHistory } from 'vue-router'
import Marketplace from '../views/Marketplace.vue'
import ModelDetail from '../views/ModelDetail.vue'
import SkillDetail from '../views/SkillDetail.vue'
import AddSkill from '../views/AddSkill.vue'
import SkillEdit from '../views/SkillEdit.vue'

const routes = [
  {
    path: '/',
    name: 'Marketplace',
    component: Marketplace
  },
  {
    path: '/model/:id',
    name: 'ModelDetail',
    component: ModelDetail
  },
  {
    path: '/skill/:id',
    name: 'SkillDetail',
    component: SkillDetail
  },
  {
    path: '/skill/edit/:id',
    name: 'SkillEdit',
    component: SkillEdit
  },
  {
    path: '/skill/add',
    name: 'AddSkill',
    component: AddSkill
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
