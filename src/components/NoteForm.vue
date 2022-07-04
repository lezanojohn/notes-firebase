<template>
    <div id="note-form">
        <form @submit.prevent="processForm" class="needs-validation" novalidate>
            <div class="mb-3">
                <label for="inputFormTitle" class="form-label">T&iacute;tulo</label>
                <input type="text" class="form-control" id="inputFormTitle" v-model="title" required>
                <div class="valid-feedback">Bien hecho!</div>
                <div class="invalid-feedback">Por favor ingrese un t&iacute;tulo</div>
            </div>

            <div class="mb-3">
                <label for="textareFormText" class="form-label">Contenido de la nota</label>
                <textarea class="form-control" id="textareFormText" rows="10" v-model="text"></textarea>
                <div class="valid-feedback">Bien hecho!</div>
            </div>

            <div class="d-flex flex-wrap justify-content-between">
                <div>
                    <label for="inputFormColor" class="form-label">Color</label>
                    <select class="form-select" id="inputFormColor" v-model="color">
                        <option selected value="blue">Azul</option>
                        <option value="red">Rojo</option>
                        <option value="orange">Naranjo</option>
                        <option value="brown">Café</option>
                        <option value="yellow">Amarillo</option>
                        <option value="green">Verde</option>
                        <option value="purple">Morado</option>
                    </select>
                </div>
                <button id="submit-button" type="submit" class="btn btn-cgreen1">Guardar</button>
            </div>
        </form>
        <error-message class="mt-5" v-if="hasError" />
    </div>
</template>

<script>
import { computed, inject } from 'vue';
import ErrorMessage from '@/components/ErrorMessage';

export default {
    components: {
        'error-message': ErrorMessage
    },

    props: {
        processForm: {
            required: true,
            type: Function,
            default() {
                return null;
            }
        }
    },

    setup() {
        const title = inject('title');
        const text = inject('text');
        const color = inject('color');
        const error = inject('error');

        const hasError = computed(() => {
            return error.value != null;
        });

        return { title, text, color, hasError };
    }
}
</script>

<style>
#inputFormTitle, #textareFormText, #inputFormColor {
    background-color: ivory;
}
#submit-button {
    margin-top: 32px;
}
</style>