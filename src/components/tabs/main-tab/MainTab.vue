<script>
    import GetPointButton from "./GetPointButton.vue";
    import PointUpgrade from "./PointUpgrade.vue";

    import CompressedPointsComponent from "./CompressedPointsComponent.vue";
    import AutomationPointsComponent from "./AutomationPointsComponent.vue";

    export default {
        name: "MainTab",
        components: {
            GetPointButton,
            PointUpgrade,
            CompressedPointsComponent,
            AutomationPointsComponent
        }
    };
</script>

<template>
    <GetPointButton />
    <br>
    <PointUpgrade />
    <CompressedPointsComponent />
    <AutomationPointsComponent />
</template>

