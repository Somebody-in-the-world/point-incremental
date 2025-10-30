<script>
    import UpdateRateSlider from "./UpdateRateSlider.vue";
    import NotationPicker from "./NotationPicker.vue";
    import FontPicker from "./FontPicker.vue";
    import NewsTickerOptions from "./NewsTickerOptions.vue";
    import TabOptions from "./TabOptions.vue";
    import OfflineProgressOptions from "./OfflineProgressOptions.vue";
    import ThemePicker from "./ThemePicker.vue";
    import SavingButtons from "./SavingButtons.vue";
    import ResetGameButton from "./ResetGameButton.vue";

    export default {
        name: "OptionsTab",
        components: {
            UpdateRateSlider,
            NotationPicker,
            FontPicker,
            NewsTickerOptions,
            TabOptions,
            OfflineProgressOptions,
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
    <FontPicker />
    <br>
    <ThemePicker />
    <br>
    <NewsTickerOptions />
    <br>
    <TabOptions />
    <br>
    <OfflineProgressOptions />
    <br>
    <SavingButtons />
    <br>
    <ResetGameButton />
</template>
