<script>
    import UpdateRateSlider from "./UpdateRateSlider.vue";
    import NotationPicker from "./NotationPicker.vue";
    import SavingButtons from "./SavingButtons.vue";
    import ResetGameButton from "./ResetGameButton.vue";

    export default {
        name: "OptionsTab",
        components: {
            UpdateRateSlider,
            NotationPicker,
            SavingButtons,
            ResetGameButton
        }
    };
</script>

<template>
    <UpdateRateSlider />
    <br>
    <NotationPicker />
    <br>
    <SavingButtons />
    <br>
    <ResetGameButton />
</template>
