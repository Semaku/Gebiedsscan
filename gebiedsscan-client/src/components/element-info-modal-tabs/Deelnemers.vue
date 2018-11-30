<template>
    <div class="uk-section uk-section-xsmall">
        <div class="uk-container">
            <h5 class="sk-color-red uk-text-bold sk-preview-card-title">Deelnemers</h5>
            <dl v-if="deelnemers && deelnemers.length" class="uk-description-list">
                <template v-for="item in deelnemers" >
                    <dt :key="item.id">{{item.first_name}} {{item.last_name}} </dt>
                    <dd :key="item.id">{{item.email}}</dd>
                </template>
            </dl>
            <p v-else>Geen deelnemers gevonden</p>
        </div>
    </div>
</template>

<script>
    import Leaflet from 'leaflet';
    import axios from 'axios';
    import config from '../../config'
    export default {
        props: {
            tabloaded: {
                type: Boolean
            },
            item: {
                type: Object
            }
        },
        data() {
            return {
                deelnemers: null
            }
        },
        computed: {
        },
        methods: {
        },
        mounted() {
        },
        watch: {
            tabloaded (loaded) {
                if (loaded) {
                    axios.get(
                    config.baseUrl + `/gebiedscan/project/${this.item.properties.name}/interested-users`).then(({data}) => {
                        this.deelnemers = data.results;
                    });
                } else {
                    
                }
            }
        }

    }

</script>