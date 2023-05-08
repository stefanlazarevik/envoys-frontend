<template>
    <v-card elevation="0">
        <v-row no-gutters>
            <div class="d-flex">
                <v-checkbox label="Lite Version"></v-checkbox>
                <v-checkbox label="Show Current"></v-checkbox>
                <div>
                    Select Futures
                </div>
                <v-select></v-select>
            </div>
            <div>
                <v-btn>Close all positions</v-btn>
            </div>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <v-card elevation="0" class="d-flex">
                    <v-card-text>Long</v-card-text>
                    <v-card-text>20X</v-card-text>
                    <v-card-text>BTCUSDT</v-card-text>
                    <v-card-text>Cross</v-card-text>
                    <v-card-text>Adjust Level</v-card-text>
                </v-card>
            </v-col>
            <v-col class="text-right">
                <v-card elevation="0" class="d-flex">
                    <v-btn>Take Profit/Stop Loss</v-btn>
                    <v-btn>Tailling Stop</v-btn>
                </v-card>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col></v-col>
            <v-col></v-col>
            <v-col></v-col>
            <v-col></v-col>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        name: 'v-component-future-position',
        
    }
</script>