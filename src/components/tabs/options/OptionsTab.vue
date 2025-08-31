<script>
    import UpdateRateSlider from "./UpdateRateSlider.vue";
    import NotationPicker from "./NotationPicker.vue";
    import NewsTickerOptions from "./NewsTickerOptions.vue";
    import ThemePicker from "./ThemePicker.vue";
    import SavingButtons from "./SavingButtons.vue";
    import ResetGameButton from "./ResetGameButton.vue";

    export default {
        name: "OptionsTab",
        components: {
            UpdateRateSlider,
            NotationPicker,
            NewsTickerOptions,
            ThemePicker,
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
    <NewsTickerOptions />
    <br>
    <ThemePicker />
    <br>
    <SavingButtons />
    <br>
    <ResetGameButton />
</template>
