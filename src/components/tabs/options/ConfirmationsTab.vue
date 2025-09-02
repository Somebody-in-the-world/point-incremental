<script>
    export default {
        name: "ConfirmationsTab",
        data(){
            return {
                showAtomicConfirmation: false,
                atomicConfirmation: true
            };
        },
        methods: {
            update(){
                this.showAtomicConfirmation = player.records.atomicAmount > 0;
                this.atomicConfirmation = player.options.confirmations.atomic;
            },
            changeConfirmation(val, name){
                player.options.confirmations[name] = val;
            }
        }
    };
</script>

<template>
    <h3>Confirmations</h3>
    <span v-show="showAtomicConfirmation">
        Atomic Confirmation: 
        <input type="checkbox" v-model="atomicConfirmation"
            @input="changeConfirmation(Boolean($event.target.checked), 'atomic')" />
    </span>
</template>
