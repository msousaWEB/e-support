<template>
    <v-app style="background-color: #e8e8e8;">
        <v-container fill-height fluid>
            <v-row justify="center" align-content="center" align="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-5"
                            style="backdrop-filter: blur(4px); background-color: rgba(255, 255, 255, 0.8);">
                        <v-toolbar color="black" dark flat>
                            <v-toolbar-title>Login</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form" lazy-validation>
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    prepend-icon="mdi-account"
                                    type="email"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    :rules="passwordRules"
                                    label="Senha"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    required
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn :disabled="loading" :loading="loading" @click="entrar" color="black" variant="flat"
                                   size="x-large" elevation="4">Entrar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>


<script setup>
import {ref} from 'vue';
import {useRouter} from "vue-router";
import {login} from "..//controller/User.js";

const email = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();


const emailRules = [
    v => !!v || 'E-mail é obrigatório',
    v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
];
const passwordRules = [
    v => !!v || 'Senha é obrigatória',
    v => v.length >= 3 || 'Senha deve ter pelo menos 3 caracteres',
];

const entrar = async () => {
    loading.value = true;
    await login(email.value, password.value, router);
    loading.value = false;
};


</script>


