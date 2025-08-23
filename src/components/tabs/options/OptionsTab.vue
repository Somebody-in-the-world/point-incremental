<script>
    import UpdateRateSlider from "./UpdateRateSlider.vue";
    import NotationPicker from "./NotationPicker.vue";

    export default {
        name: "OptionsTab",
        components: {
            UpdateRateSlider,
            NotationPicker
        }
    };
</script>

<template>
    <UpdateRateSlider />
    <br>
    <NotationPicker />
</template>
