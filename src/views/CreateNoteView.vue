<template>
    <div id="create-note" v-if="isAuthenticated">
        <legend class="mb-3">Nueva nota</legend>
        <note-form :process-form="processForm" />
    </div>
</template>

<script>
import { watch, provide, inject, ref } from 'vue';
import { auth } from '@/firebase';
import { useAuth } from '@vueuse/firebase';
import { useNotes } from '@/composables/useNotes';
import { useRouter } from "vue-router";
import NoteForm from '@/components/NoteForm';

export default {
    components: {
        'note-form': NoteForm
    },

    setup() {
        const { isAuthenticated } = useAuth(auth);
        const { addNote, loadingNote } = useNotes();
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
                const newNote = {
                    title: title.value,
                    text: text.value,
                    color: color.value
                }

                const addedNote = await addNote(newNote);

                if (addedNote.hasError) {
                    error.value = addedNote.error;
                } else {
                    notes.value = [...notes.value, addedNote];
                    selectedNote.value = addedNote;
                    router.push({ name: 'Home' });
                }
            }
        };

        watch(loadingNote, (value) => {
            loadingApp.value = value;
        });

        return { isAuthenticated, processForm };
    },
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