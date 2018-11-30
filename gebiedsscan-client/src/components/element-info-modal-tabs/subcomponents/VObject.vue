<template>
    <tr>
        <td>{{vobject.streetname}} {{vobject.housenumber}} {{vobject.house_letter}}, {{vobject.postcode}}</td>
        <td>{{vobject.subject}}</td>
        <td><span v-if="loadingLabel"><span uk-spinner="ratio: 0.6"></span> Loading... </span>{{vobject.label}}</td>
    </tr>
</template>

<script>
import axios from 'axios';

    export default {
        props: { 
            vobject: {
                type: Object
            }
        },
        data () {
            return {
                loadingLabel: true
            }
        },
        methods: {
        getEnergyLabel(postcode, housenumber, houseletter) {
                let params = '';    
                if (postcode) params += 'postcode=' + postcode + '&';
                if (housenumber) params += 'housenumber=' + housenumber + '&';
                if (houseletter) params += 'houseletter=' + houseletter;
                
                return axios.get(config.baseUrl + '/rvo/?' + params, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
            },
        },
        mounted() {
            if (this.vobject.postcode && (this.vobject.housenumber || this.vobject.houseletter)) {
                this.getEnergyLabel(this.vobject.postcode, this.vobject.housenumber, this.vobject.houseletter).then(res => {
                    this.loadingLabel = false;
                    if (res.data.result && res.data.result.label) {
                        Vue.set(this.vobject, 'label', res.data.result.label);
                    } else {
                        Vue.set(this.vobject, 'label', 'Not Found');
                    }
                });
            } else {
                this.loadingLabel = false;
                Vue.set(this.vobject, 'label', 'Not Found');
            }
        },
        watch: {
        }

    }

</script>

<style>
    .vobject {
        min-width: 100px;
        min-height: 100px;
        border-radius: 15px;
        background: #fafe;
        color: #fff;
    }
</style>
