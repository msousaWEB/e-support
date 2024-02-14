<template>
    <v-container fill-height>
        <v-card class="pa-5" elevation="2">
            <div class="d-flex">
                <v-text-field
                    v-model="search"
                    prepend-icon="mdi-magnify"
                    label="Buscar chamados"
                    class="mr-4"
                ></v-text-field>
                <v-btn class="mt-2" color="black" @click="novoChamado">Novo Chamado</v-btn>
            </div>

            <v-data-table
                :no-data-text="'Nenhum resultado encontrado'"
                :items-per-page-text="'Itens por página'"
                :loading-text="'Carregando...'"
                :hide-default-footer="true"
                :items-per-page-options="perPage"
                :headers="headers"
                :items="chamados"
                class="mt-4"
                :search="search"
            >
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editaChamado(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="900px">
            <ChamadoForm @close-dialog="dialog = false" :chamado="chamadoSelecionado" />
        </v-dialog>
    </v-container>
</template>

<script setup>
import {ref} from 'vue';
import ChamadoForm from "./forms/ChamadoForm.vue";

const perPage = [
    {value: 10, title: '10'},
    {value: 25, title: '25'},
    {value: 50, title: '50'},
    {value: 100, title: '100'},
    {value: -1, title: 'Todas'}
]

const search = ref('');
const chamados = ref([
    {id: 1, cliente: 'Cliente A', responsavel: 'Fulano', status: 'Aberto'},
    {id: 2, cliente: 'Cliente B', responsavel: 'Ciclano', status: 'Em progresso'},
    {id: 2, cliente: 'Cliente B', responsavel: 'Ciclano', status: 'Em progresso'},
    {id: 2, cliente: 'Cliente B', responsavel: 'Ciclano', status: 'Em progresso'},
]);

const headers = [
    {title: 'ID', value: 'id'},
    {title: 'Cliente', value: 'cliente'},
    {title: 'Responsável', value: 'responsavel'},
    {title: 'Status', value: 'status'},
    {title: 'Ações', value: 'actions', sortable: false},
];

const dialog = ref(false);
const chamadoSelecionado = ref(null);

function novoChamado() {
    chamadoSelecionado.value = null;
    dialog.value = true;
}

function editaChamado(item) {
    chamadoSelecionado.value = item;
    dialog.value = true;
}

function deleteItem(item) {
    alert(`Deletar chamado ${item.id}`);
}
</script>

<style scoped>

</style>
