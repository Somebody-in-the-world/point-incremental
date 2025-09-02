<script>
    export default {
        name: "TabOptions",
        data(){
            return {
                isTopTabs: false
            };
        },
        methods: {
            update(){
                this.isTopTabs = player.options.topTabs;
            },
            changeTopTabs(isTop){
                player.options.topTabs = isTop;
            }
        }
    };
</script>

<template>
    Top Tabs: 
    <input type="checkbox" v-model="isTopTabs" @input="changeTopTabs(Boolean($event.target.checked))" />
</template>

