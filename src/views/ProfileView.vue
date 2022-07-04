<template>
    <div v-if="isAuthenticated">
        <h1>Profile</h1>
        <pre>
            {{ user }}
        </pre>
    </div>
</template>

<script>
import { auth } from '@/firebase';
import { useAuth } from '@vueuse/firebase';

export default {
    setup() {
        const { user, isAuthenticated } = useAuth(auth);

        return { user, isAuthenticated };
    }
}
</script>

<style>
    pre {
        overflow: inherit;
        margin: 0;
    }
</style>