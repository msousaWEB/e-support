<template>
    <v-layout>
        <v-navigation-drawer color="black">
            <v-list>
                <v-list-item :title="userName" :subtitle="userEmail"></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item
                    v-for="(item, index) in menuItems"
                    :key="index"
                    :active="item.route === activeRoute"
                    @click="navigateTo(item.route)"
                    :prepend-icon="item.icon"
                    :title="item.title">
                </v-list-item>
                <v-list-item
                    @click="promptLogout"
                    prepend-icon="mdi-logout"
                    title="Sair">
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar color="black" title="e-Support"></v-app-bar>
        <Confirm ref="dialog" title="Sair" message="Você deseja sair?" @confirm="logout" @cancel="()=>{}"></Confirm>
        <v-main>
            <component :is="currentComponent"></component>
        </v-main>
    </v-layout>
</template>

<script setup>
import {shallowRef, ref} from 'vue'
import {useRouter} from 'vue-router';
import Chamados from './Chamados.vue'
import Configuracoes from './Configuracoes.vue'
import Home from "./Home.vue";
import Confirm from "./utils/Confirm.vue";
import {usuario} from "../controller/User.js";

const currentComponent = shallowRef(Home)
const activeRoute = ref('home')

const userName = ref('');
const userEmail = ref('');


const menuItems = [
    {title: 'Home', icon: 'mdi-home-analytics', route: 'home'},
    {title: 'Chamados', icon: 'mdi-message-badge', route: 'chamados'},
    {title: 'Configurações', icon: 'mdi-cog', route: 'config'},
]

const router = useRouter();

const dialog = ref(null);

function promptLogout() {
    dialog.value.open();
}

async function getUserData() {
    try {
        const userData = await usuario();
        userName.value = userData.name;
        userEmail.value = userData.email;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }
}

getUserData()

async function logout() {
    try {
        const token = localStorage.getItem('jwt-token');
        if (token) {
            await axios.post('/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            localStorage.removeItem('jwt-token');
            await router.push('/login');
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
}


function navigateTo(route) {
    const componentsMap = {
        'chamados': Chamados,
        'config': Configuracoes,
        'home': Home,
    }
    currentComponent.value = componentsMap[route]
    activeRoute.value = route
}
</script>
