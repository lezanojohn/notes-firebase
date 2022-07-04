<template>
    <div id="edit-note" v-if="isAuthenticated">
        <div class="d-flex justify-content-between">
            <legend class="mb-3">Editar nota</legend>
            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal">Borrar</button>
        </div>
        <note-form :process-form="processForm" />
        <delete-modal :id="id" />
    </div>
</template>

<script>
import { onMounted, watch, provide, inject, ref } from 'vue';
import { auth } from '@/firebase';
import { useAuth } from '@vueuse/firebase';
import { useNotes } from '@/composables/useNotes';
import { useRouter } from 'vue-router';
import NoteForm from '@/components/NoteForm';
import DeleteModal from '@/components/DeleteModal';

export default {
    components: {
        'note-form': NoteForm,
        'delete-modal': DeleteModal
    },

    props: {
        id: {
            required: true,
            type: String,
            default: ''
        }
    },

    setup(props) {
        const { isAuthenticated } = useAuth(auth);
        const { updateNote, loadingNote } = useNotes();
        const router = useRouter();
        const title = ref('');
        const text = ref('');
        const color = ref('blue');
        const error = ref(null);

        const notes = inject('notes');
        const selectedNote = inject('selectedNote');
        const loadingApp = inject('loadingApp');

        provide('title', title);
        provide('text', text);
        provide('color', color);
        provide('error', error);

        const isValidForm = () => {
            const formElement = document.querySelector('.needs-validation');
            const isValid = formElement.checkValidity();
            formElement.classList.add('was-validated');
            return isValid;
        };

        const processForm = async () => {
            if (isValidForm()) {
                const tmpNote = {
                    id: props.id,
                    title: title.value,
                    text: text.value,
                    color: color.value
                }

                const updatedNote = await updateNote(tmpNote);

                if (updatedNote.hasError) {
                    error.value = updatedNote.error;
                } else {
                    const filteredNotes = notes.value.filter(n => n.id !== updatedNote.id);
                    notes.value = [...filteredNotes, updatedNote];
                    selectedNote.value = updatedNote;
                    router.push({ name: 'Home' });
                }
            }
        };

        watch(loadingNote, (value) => {
            loadingApp.value = value;
        });

        onMounted(async () => {
            if (props.id !== '') {
                const found = notes.value.find(n => n.id === props.id);
                if (found) {
                    title.value = found.title;
                    text.value = found.text;
                    color.value = found.color
                } else {
                    router.push({ name: 'NotFound' });
                }
            }
        });

        return { isAuthenticated, processForm };
    }
}
</script>

<style lang="scss" scoped>
button {
    font-size: 12px;
    height: 25px;
    line-height: 12px;
    margin-top: 5px;
}
</style>