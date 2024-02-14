<template>
    <v-card>
        <v-card-title>{{ chamado ? 'Editar Chamado' : 'Novo Chamado' }}</v-card-title>
        <v-card-text>
            <v-text-field v-model="titulo" label="Título" outlined dense></v-text-field>
            <v-textarea v-model="descricao" label="Descrição" outlined dense></v-textarea>
            <v-autocomplete
                v-model="clienteSelecionado"
                :items="clientes"
                item-text="nome"
                item-value="id"
                label="Selecione um cliente"
                return-object
                outlined
                dense
                clearable
            ></v-autocomplete>
            <v-row>
                <v-checkbox
                    v-for="nivel in niveisUrgencia"
                    :key="nivel.valor"
                    v-model="urgenciaSelecionada"
                    :label="nivel.texto"
                    :value="nivel.valor"
                    :color="nivel.cor"
                ></v-checkbox>
            </v-row>
            <v-select
                v-if="chamado"
                v-model="status"
                :items="statusOptions"
                item-text="text"
                item-value="value"
                label="Status"
                outlined
                dense
            ></v-select>
            <v-text-field v-model="feedback" label="Feedback do Cliente" outlined dense></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn color="black" variant="flat" @click="salvarChamado">Salvar</v-btn>
            <v-btn color="black" text @click="emits('close-dialog')">Cancelar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const emits = defineEmits(['close-dialog']);
const { chamado } = defineProps({
    chamado: Object
});

const statusOptions = [
    { value: 1, title: 'Aberto' },
    { value: 2, title: 'Em progresso' },
    { value: 3, title: 'Pausado' },
    { value: 4, title: 'Concluído' },
    { value: 5, title: 'Agendado' },
    { value: 6, title: 'Cancelado' },
];


const titulo = ref('');
const descricao = ref('');
const clienteSelecionado = ref(null);
const clientes = ref([
    { id: 1, title: 'Cliente A' },
    { id: 2, title: 'Cliente B' },
]);
const niveisUrgencia = [
    { valor: 'baixa', texto: 'Baixa', cor: 'green' },
    { valor: 'media', texto: 'Média', cor: 'orange' },
    { valor: 'alta', texto: 'Alta', cor: 'red' }
];
const urgenciaSelecionada = ref([]);
const status = ref('');
const feedback = ref('');

// Popula os campos se estiver editando um chamado
if (chamado) {
    titulo.value = chamado.titulo;
    descricao.value = chamado.descricao;
    clienteSelecionado.value = chamado.cliente;
    urgenciaSelecionada.value = chamado.urgencia;
    status.value = chamado.status;
    feedback.value = chamado.feedback;
}

function salvarChamado() {
    // Implemente a lógica para salvar ou editar o chamado aqui
    console.log({
        titulo: titulo.value,
        descricao: descricao.value,
        cliente: clienteSelecionado.value,
        urgencia: urgenciaSelecionada.value,
        status: status.value, // Apenas se estiver editando
        feedback: feedback.value,
    });
    emits('close-dialog');
}
</script>
