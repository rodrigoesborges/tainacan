<template>
    <div class="tainacan-modal-content">
        <header class="tainacan-modal-title">
            <h2>{{ modalTitle }}
                <small class="tainacan-total-objects-info">
                    {{ `(${totalItems} ${objectType})` }}
                </small>
            </h2>
            <hr>
        </header>
        <div class="tainacan-form">
            <!-- Exposers --------------------------------------------- -->
            <div>
                <b-loading :active.sync="isLoadingMetadatumMappers"/>
                <div v-if="!isLoadingMetadatumMappers">
                    <a
                            class="collapse-all"
                            @click="urls_open = !urls_open">
                        {{ urls_open ? $i18n.get('label_collapse_all') : $i18n.get('label_expand_all') }}
                        <b-icon
                                type="is-secondary"
                                :icon=" urls_open ? 'menu-down' : 'menu-right'"/>
                    </a>
                    <div>
                        <div
                                v-for="(exposer, index) of selectedForBulk[0].exposer_urls"
                                :key="index"
                                class="field">
                            <b-collapse :open="urls_open">
                                <label
                                        class="label"
                                        slot="trigger"
                                        slot-scope="props">
                                    <b-icon
                                            type="is-secondary"
                                            :icon="props.open ? 'menu-down' : 'menu-right'"
                                    />
                                    {{ index }}
                                </label>
                                <div
                                        v-for="(url, index2) of exposer"
                                        :key="index2">
                                    <div>
                                        <a
                                                :href="url"
                                                target="_blank">
                                            {{ extractExposerLabel(url, index) }}
                                        </a>
                                    </div>
                                </div>
                            </b-collapse>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="field is-grouped form-submit">
                <p class="control">
                    <button
                            @click="$eventBusSearch.loadItems(); $parent.close()"
                            type="button"
                            class="button is-outlined">
                        {{ $i18n.get('close') }}
                    </button>
                </p>
                <p class="control">
                    <button
                            class="button is-turquoise5">
                            {{ $i18n.get('new_action') }}
                    </button>
                    <button
                            class="button is-success"
                            type="button"
                            @click="$eventBusSearch.loadItems(); $parent.close();">
                        {{ $i18n.get('finish') }}
                    </button>
                </p>
            </footer>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "BulkExposeModal",
        props: {
            modalTitle: String,
            totalItems: Array,
            objectType: String,
            selectedForBulk: Object,
            collectionID: Number,
        },
        created(){
            this.isLoadingMetadatumMappers = true;
            this.fetchMetadatumMappers()
            .then(() => {
                this.isLoadingMetadatumMappers = false;
            })
            .catch(() => {
                this.isLoadingMetadatumMappers = false;
            });
            console.log(JSON.stringify(this.selectedForBulk));
        },
        computed: {
            metadatum_mappers: {
                get() {
                    return this.getMetadatumMappers();
                }
            },
        },
        data() {
            return {
                isLoadingMetadatumMappers: false,
            }
        },
        methods: {
            ...mapActions('metadata', [
                'fetchMetadatumMappers',
            ]),
            extractExposerLabel(urlString, typeSlug) {
                var url = new URL(urlString);
                var mapperParam = url.searchParams.get(tainacan_plugin.exposer_mapper_param);
                if(mapperParam != 'undefined' && mapperParam != null) {
                    var mapper = this.metadatum_mappers.find(obj => {
                        return obj.slug === mapperParam;
                    });
                    if(mapper != 'undefined' && mapper != null) {
                        return this.$i18n.get('label_exposer')+": "+typeSlug+', '+this.$i18n.get('label_mapper')+": "+mapper.name;
                    } else {
                        if(mapperParam == 'value') {
                            return this.$i18n.get('label_exposer')+": "+typeSlug+', '+this.$i18n.get('label_exposer_mapper_values');
                        }
                    }
                }
                return this.$i18n.get('label_exposer')+": "+typeSlug;
            },
        },
    }
</script>

<style lang="scss">

    @import '../../scss/_variables.scss';

    .tainacan-modal-content {
        border-radius: 10px;
        min-height: 400px;
    }

    .tainacan-modal-content .form-submit {
        padding: 160px 0 0.4em 0 !important;
    }

    .no-overflow-modal-card-body {
        padding: 0 !important;
        overflow: unset !important;
    }

    .tainacan-total-objects-info {
        font-size: 12px;
        font-weight: normal;
    }

    .tainacan-by-text {
        max-width: 28px;
    }

    .tainacan-loader {
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
    }

    /* Safari */
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

</style>