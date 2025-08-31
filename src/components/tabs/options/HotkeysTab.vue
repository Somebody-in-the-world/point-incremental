<script>
    export default {
        name: "HotkeysDisplay",
        data(){
            return {
                showCompressHotkey: false,
                showDimensionalHotkey: false,
                showSpacetimeHotkey: false,
                showDarkGenratorsHotkey: false,
                showAtomicHotkey: false
            };
        },
        methods: {
            update(){
                this.showCompressHotkey = player.records.pointCompressionAmount > 0;
                this.showDimensionalHotkey = player.records.dimensionalAmount > 0;
                this.showSpacetimeHotkey = player.records.totalSpacetimeAmount > 0;
                this.showDarkGenratorsHotkey = player.darkGeneratorsUnlocked > 0 || player.records.atomicAmount > 0;
                this.showAtomicHotkey = player.records.atomicAmount > 0;
            }
        }
    };
</script>

<template>
    <h3>Hotkeys</h3>
    P - Buy Point upgrade<br>
    <span v-show="showCompressHotkey">C - Compress your points<br></span>
    <span v-show="showDimensionalHotkey">D - Convert your points into dimensional points<br></span>
    <span v-show="showSpacetimeHotkey">S - Collapse the Spacetime<br></span>
    <span v-show="showSpacetimeHotkey">M - Buy SP Multiplier<br></span>
    <span v-show="showDarkGenratorsHotkey">G - Buy dark Generators<br></span>
    <span v-show="showAtomicHotkey">A - Go Atomic</span>
</template>
