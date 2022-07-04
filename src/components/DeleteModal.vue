<template>
    <div id="delete-modal" class="modal fade" tabindex="-1" aria-labelledby="delete-modal-title" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger" id="delete-modal-title">Borrar Nota</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>¿Está seguro(a) que desea borrar esta nota?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="processDeleteNote">Borrar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useNotes } from '@/composables/useNotes';
import { useRouter } from 'vue-router';
import { watch, inject } from 'vue';

export default {
    props: {
        id: {
            required: true,
            type: String,
            default: ''
        }
    },

    setup(props) {
        const { deleteNote, loadingNote } = useNotes();
        const router = useRouter();

        const notes = inject('notes');
        const loadingApp = inject('loadingApp');
        const selectedNote = inject('selectedNote');
        const error = inject('error');

        const processDeleteNote = async () => {
            const deletedNote = await deleteNote(props.id);

            if (deletedNote.hasError) {
                    error.value = deletedNote.error;
            } else {
                const filteredNotes = notes.value.filter(n => n.id !== props.id);
                notes.value = filteredNotes;
                if (notes.value.length > 0) {
                    selectedNote.value = notes.value[0];
                } else {
                    selectedNote.value = null;
                }
                router.push({ name: 'Home' });
            }
        };

        watch(loadingNote, (value) => {
            loadingApp.value = value;
        });

        return { processDeleteNote };
    }
}
</script>