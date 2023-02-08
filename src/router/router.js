
//import { from } from 'core-js/core/array';
//import { from } from 'core-js/core/array';
//import { resolve } from 'core-js/fn/promise';
import isAuthenticatedGuard from './auth-guard';
import { createRouter, createWebHashHistory} from 'vue-router'

const routes =[
        {
                path: '/',
                redirect:'/pokemon'
        }, 
        {
                path: '/pokemon',
                name: 'pokemon',
                component: () => import (/* webpackChunkName: "AboutPages" */'@/modules/Pokemon/layouts/PokemonLayaout'),
                children: [
                        { 
                                path: 'home', 
                                name: 'pokemon-home',
                                component: () => import (/* webpackChunkName: "ListPage" */ '@/modules/Pokemon/Pages/ListPage') 
                        },
                        { 
                                path: 'about',
                                name: 'pokemon-about', 
                                component: () => import (/* webpackChunkName: "AboutPages" */'@/modules/Pokemon/Pages/aboutPages')
                        },
                        { 
                                path: 'pokemonid',
                                name: 'pokemon-id', 
                                component: () => import (/* webpackChunkName: "PokemonPages" */'@/modules/Pokemon/Pages/PokemonPages' ),
                                props: ( route )=>{
                                        const id  = Number( route.params.id);
                                        return isNaN ( id ) ? { id : 1 } : { id }                
                                }
                        },
                        {
                                path: '',
                                redirect: {name: 'pokemon-about'}
                        } 
                ]
        },
        
        //DBZ Layouts 
        {
                path: '/dbz',
                name:'dbz',
                
                beforeEnter: [isAuthenticatedGuard],
                component: () => import (/*webpackChunkName: "DragonBallLayout" */'@/modules/dbz/layouts/DragonBall'),
        children:[
                {
                path: 'characters', 
                name: 'dbz-characters',
                //beforeEnter: [isAuthenticatedGuard],
                component: () => import (/* webpackChunkName: "CharactersDBZ" */ '@/modules/dbz/pages/CharactersDBZ') 
                },
                {
                path: 'about', 
                name: 'dbz-about',
                //beforeEnter: [isAuthenticatedGuard],
                component: () => import (/* webpackChunkName: "AboutDBZ" */ '@/modules/dbz/pages/AboutDBZ') 
                },
                {
                        path: '',
                        redirect: {name: 'dbz-characters'}
                } 
        ]
        },

        { 
                path: '/:pathMatch(.*)*', 
                component: () => import (/* webpackChunkName: "NoPageFound" */'@/modules/shared/pages/noPageFound')
        }, 
        
]

const router = createRouter({
        history: createWebHashHistory(),
        routes,
        })

//Guard Global
/* router.beforeEach( (to, from, next) => {
        console.log({to,from,next});

        const random = Math.random()*100
        if(random>50){
                console.log('Autenticado')
                next()
        }else{
                console.log(random, 'Bloqueado por el BeforeEach Guard')
                next({name: 'pokemon-home'})
        }
}) */

/* const canAccess = () =>{
        return new Promise (resolve =>{

                const random = Math.random()*100
                if(random>50){
                        console.log('Autenticado - canAccess')
                        resolve(true)
                }else{
                        console.log(random, 'Bloqueado por el BeforeEach Guard - canAccess')
                        resolve(false)
                }
        })
}
router.beforeEach(async(to, from, next) =>{
        const authorized = await canAccess()
        authorized 
        ? next()
        : next({name: 'pokemon-home'})
}) */
export default router
