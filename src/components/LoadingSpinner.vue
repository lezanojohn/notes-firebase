<template>
    <div id="loading-spinner" class="d-flex justify-content-center align-items-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
#loading-spinner {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999;
}
</style>