<template>
    <v-container>
        <div class="hidden-md-and-down">
            <div class="d-flex px-2">
                <div class="px-1" v-for="(item, index) in navs" :key="index">
                    <v-component-submenu :item="item"></v-component-submenu>
                </div>
            </div>
        </div>
        <div class="hidden-md-and-up">
            <v-app-bar-nav-icon @click="toogleDrawer()"></v-app-bar-nav-icon>
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
        },
        methods: {
            toogleDrawer () {
                console.log('toogle')
                this.$emit('toogleDrawer')
            }
        }
    }
</script>