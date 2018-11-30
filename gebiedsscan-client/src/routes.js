/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 10:25 AM
 */
import home from './views/home/home.vue';
import explore from './views/project/explore.vue';
import addData from './views/project/add-data.vue';

export default [
    {
        path: '/app',
        name: 'home',
        component: home
    },
    {
        path: '/app/explore/:subroute?/:searchtype?/:query?', //:searchtype: ['element', 'location']
        name: 'explore',
        component: explore
    },
    {
        path: '/playground',
        name: 'playground',
        component: addData
    },
    { 
        path: '/*', 
        redirect: '/app' 
    }
];
