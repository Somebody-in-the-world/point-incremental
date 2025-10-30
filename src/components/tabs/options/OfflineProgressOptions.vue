<script>
    export default {
        name: "OfflineProgressOptions",
        data(){
            return {
                offlineProgressEnabled: true
            };
        },
        methods: {
            update(){
                this.offlineProgressEnabled = player.options.offlineProgress.enabled;
            },
            changeOfflineProgressEnabled(enabled){
                player.options.offlineProgress.enabled = enabled;
            }
        }
    };
</script>

<template>
    Offline progress enabled: 
    <input type="checkbox" v-model="offlineProgressEnabled" 
        @input="changeOfflineProgressEnabled(Boolean($event.target.checked))" />
</template>

