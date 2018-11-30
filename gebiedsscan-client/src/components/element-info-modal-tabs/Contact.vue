<template>
 <div class="uk-section uk-section-xsmall">
        <div class="uk-container">
            <h5 class="sk-color-red uk-text-bold sk-preview-card-title">Contactgegevens</h5>
            <dl v-if="item.properties.contact && item.properties.contact.length && item.properties.contact[0]" class="uk-description-list">
                <template v-if="item.organization || item.phone_nr || item.e_mail" v-for="item in item.properties.contact">
                    <dt :key="item.id">{{item.organization}}</dt>
                    <dd :key="item.id"><span v-if="item.phone_nr">{{item.phone_nr}},</span> {{item.e_mail}}</dd>
                </template>
            </dl>
            <p v-else>Geen contactgegevens gevonden</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: { 
             item: {
                type: Object,
                default: null
            }
        },
        computed: {
        },
        methods: {
        },
        mounted() {
        },
        watch: {
        }

    }

</script>