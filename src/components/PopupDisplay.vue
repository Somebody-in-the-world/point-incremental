<script>
    export default {
        name: "PopupDisplay",
        data(){
            return {
                popups: []
            };
        },
        created(){
            Events.UI.add(GAME_EVENTS.POPUP_DISPLAY, this.addPopup, this);
        },
        methods: {
            update(){
                this.popups = this.popups.filter((popup) => Date.now() - popup.time < 3000);
            },
            addPopup(content, type){
                this.popups.push({content, time: Date.now(), type})
            }
        }
    };
</script>

<template>
    <div id="popup-container">
        <TransitionGroup name="popups" tag="div">
            <div class="popup-wrapper" v-for="popup in popups" :key="popup.time">
                <div class="popup" :class="['popup-' + popup.type]">
                    {{ popup.content }}
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
    #popup-container {
        position: fixed;
        z-index: 9999;
        pointer-events: none;
        width: calc(100% - var(--body-padding)*2);
    }

    .popup-wrapper {
        width: fit-content;
        margin-left: auto;
        margin-right: 0;
    }

    .popup {
        margin: 0 2px;
        margin-top: 1px;
        padding: 10px;
        border: 2px solid;
        color: black;
    }

    .popup-achievement {
        background-color: yellow;
    }

    .popup-info {
        background-color: #80c0ff;
    }
    
    .popup-error {
        background-color: red;
    }

    .popups-enter-active, .popups-leave-active, .popups-move {
        transition: all 0.5s ease;
    }

    .popups-enter-from, .popups-leave-to {
        opacity: 0;
        transform: translateX(-30px);
    }

    .popups-leave-active .popup {
        position: absolute;
        white-space: nowrap;
    }
</style>
