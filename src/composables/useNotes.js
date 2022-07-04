import { collection, doc, query, where, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { db, serverTS } from "@/firebase";
import { ref } from "vue";
import store from "@/store";

export const useNotes = () => {

    const notesCollectionRef = collection(db, "notes");
    const notesDocumentRef = id => doc(db, "notes", id);
    const loadingNote = ref(false);
    const uid = store.state.uid;

    const getNotes = async (uid) => {
        try {
            loadingNote.value = true;
            const q = query(notesCollectionRef, where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            return {
                hasError: true,
                error
            };
        } finally {
            loadingNote.value = false;
        }
    };

    const getNote = async (id) => {
        try {
            loadingNote.value = true;
            const docSnap = await getDoc(notesDocumentRef(id));

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                throw new Error("No existe la nota");
            }
        } catch (error) {
            return {
                hasError: true,
                error
            };
        } finally {
            loadingNote.value = false;
        }
    };

    const addNote = async (note) => {
        try {
            loadingNote.value = true;
            const newNote = {
                uid: uid,
                title: note.title,
                text: note.text,
                color: note.color,
                createDate: serverTS,
                updateDate: serverTS,
                estado: false
            };
            const docRef = await addDoc(notesCollectionRef, newNote);
            const addedNote = await getNote(docRef.id);
            return {
                id: docRef.id,
                ...addedNote
            };
        } catch (error) {
            return {
                hasError: true,
                error
            };
        } finally {
            loadingNote.value = false;
        }
    };

    const updateNote = async (note) => {
        try {
            loadingNote.value = true;
            const tmpNote = {
                uid: uid,
                title: note.title,
                text: note.text,
                color: note.color,
                updateDate: serverTS
            };
            await updateDoc(notesDocumentRef(note.id), tmpNote);
            const updatedNote = await getNote(note.id);
            return {
                id: note.id,
                ...updatedNote
            };
        } catch (error) {
            return {
                hasError: true,
                error
            };
        } finally {
            loadingNote.value = false;
        }
    };

    const deleteNote = async (id) => {
        try {
            loadingNote.value = true;
            await deleteDoc(notesDocumentRef(id));
            return {
                hasError: false
            };
        } catch (error) {
            return {
                hasError: true,
                error
            };
        } finally {
            loadingNote.value = false;
        }
    };

    return {
        getNotes,
        getNote,
        addNote,
        updateNote,
        deleteNote,
        loadingNote
    };

};