<template>
    <v-container class="d-flex px-2">
        <div class="px-1" v-for="(item, index) in navs" :key="index">
            <v-component-submenu :item="item"></v-component-submenu>
        </div>
    </v-container>
</template>

<script>
    import Submenu from './Submenu.vue'

    export default {
        name: "v-component-navbar-future",
        components: {
            'v-component-submenu': Submenu,
        },
        data () {
            return {
                navs: [
                    {label: 'USDT-M Futures', items: [
                        {icon: 'mdi-rhombus-split-outline', title: 'USDT-M Futures'},
                        {icon: 'mdi-rhombus-split-outline', title: 'USDT-M Futures Demo'},
                    ]},
                    {label: 'Coin-M Futures', items: [
                        {icon: 'mdi-rhombus-split-outline', title: 'USDT-M Futures'},
                        {icon: 'mdi-rhombus-split-outline', title: 'USDT-M Futures Demo'},
                    ]},
                    {label: 'USDC-M Futurs', items: [
                        {icon: 'mdi-rhombus-split-outline', title: 'USDT-M Futures'},
                        {icon: 'mdi-rhombus-split-outline', title: 'USDT-M Futures Demo'},
                    ]},
                    {label: 'Strategic Trading', items: [
                        {icon: 'mdi-rhombus-split-outline', title: 'USDT-M Futures'},
                        {icon: 'mdi-rhombus-split-outline', title: 'USDT-M Futures Demo'},
                    ]},
                    {label: 'Futures Info', items: [
                        {icon: 'mdi-rhombus-split-outline', title: 'USDT-M Futures'},
                        {icon: 'mdi-rhombus-split-outline', title: 'USDT-M Futures Demo'},
                    ]},
                    {label: 'CopyTrading', items: [
                        {icon: 'mdi-rhombus-split-outline', title: 'USDT-M Futures'},
                        {icon: 'mdi-rhombus-split-outline', title: 'USDT-M Futures Demo'},
                    ]},
                ]
            }
        }
    }
</script>