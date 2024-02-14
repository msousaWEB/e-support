<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title class="text-h5 text-center">{{ title }}</v-card-title>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black darken-1" variant="flat" @click="confirm">Sim</v-btn>
                <v-btn color="red darken-1" text @click="cancel">Não</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Confirmação',
        },
        message: {
            type: String,
            default: 'Você tem certeza?',
        },
    },
    data() {
        return {
            dialog: false,
        };
    },
    methods: {
        open() {
            this.dialog = true;
        },
        confirm() {
            this.$emit('confirm');
            this.dialog = false;
        },
        cancel() {
            this.$emit('cancel');
            this.dialog = false;
        },
    },
};
</script>
