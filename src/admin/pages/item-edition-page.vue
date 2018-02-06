<template>
    <div>
        <h2 v-text="pageTitle"></h2><span class="uk-label" @submit.prevent=" " v-if="item != null && item != undefined" :class="'uk-label-' + getStatusColor(item.status)" v-text="item.status"></span>
        <form class="uk-form-horizontal uk-margin-large" :model="form" label-width="120px">
            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-text">Título</label>
                <div class="uk-form-controls">
                    <input class="uk-input" type="text" placeholder="Insira o título" v-model="form.title"/>
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-text">Descrição</label>
                <div  class="uk-form-controls">
                    <input class="uk-textarea" type="textarea" placeholder="Insira uma descrição do Item." v-model="form.description"/>
                </div>
            </div>

            <div class="uk-margin"> 
                <label class="uk-form-label" for="form-horizontal-select">Status</label>
                <div class="uk-form-controls">
                    <select class="uk-select" v-model="form.status" placeholder="Selecione um status">
                        <option
                        v-for="statusOption in statusOptions"
                        :key="statusOption.value"
                        :value="statusOption.value"
                        :disabled="statusOption.disabled">{{statusOption.label }}</option>
                    </select>
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-custom">Imagem</label>
                <div class="js-upload uk-placeholder uk-form-controls uk-text-center">
                    <span uk-icon="icon: cloud-upload"></span>
                    <span class="uk-text-middle">Arraste uma imagem aqui</span>
                    <div uk-form-custom>
                        <input type="file" multiple>
                        <span class="uk-link"> clique aqui para enviar.</span>
                    </div>
                </div>
                <progress id="js-progressbar" class="uk-progress" value="0" max="100" hidden></progress>
            </div>
            
            <tainacan-form-item v-for="(field, index) in fieldList" v-bind:key="index" :field="field"></tainacan-form-item>

            <div class="uk-margin">
                <div class="uk-form-controls">
                    <button class="uk-button uk-button-primary" @submit.prevent="onSubmit">Salvar</button>
                    <button class="uk-button uk-button-default">Cancelar</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'ItemEditionPage',
    data(){
        return {
            itemId: Number,
            item: null,
            collectionId: Number,
            pageTitle: '',
            form: {
                collectionId: Number,
                title: '',
                status: '',
                description: ''
            },
            // Can be obtained from api later
            statusOptions: [{ 
                value: 'publish',
                label: 'Publicado'
                }, {
                value: 'draft',
                label: 'Rascunho'
                }, {
                value: 'private',
                label: 'Privado'
                }, {
                value: 'trash',
                label: 'Lixo'
            }],
            rules: {
                title: [
                    { required: true, message: 'Por favor forneça um título para o Item.', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        ...mapActions('item', [
            'sendItem',
            'updateItem',
            'fetchFields',
            'sendField',
            'fetchItem'
        ]),
        ...mapGetters('item',[
            'getFields',
            'getItem'
        ]),
        onSubmit() {
            // Puts loading on Draft Item creation
            //let loadingInstance = this.$loading({ text: 'Salvando item ...' });

            let data = {item_id: this.itemId, title: this.form.title, description: this.form.description, status: this.form.status};
            this.updateItem(data).then(updatedItem => {    
                
                this.item = updatedItem;

                // Fill this.form data with current data.
                this.form.title = this.item.title;
                this.form.description = this.item.description;
                this.form.status = this.item.status;

                //loadingInstance.close();
            });
        },
        getStatusColor(status) {
            switch(status) {
                case 'publish': 
                    return 'success'
                case 'draft':
                    return 'default'
                case 'private': 
                    return 'warning'
                case 'trash':
                    return 'danger'
                default:
                    return 'default'
            }
        },
        createNewItem() {
            // Puts loading on Draft Item creation
            //let loadingInstance = this.$loading({ text: 'Criando item rascunho...' });

            // Creates draft Item
            let data = {collection_id: this.form.collectionId, title: '', description: '', status: 'draft'};
            this.sendItem(data).then(res => {

                this.itemId = res.id;
                this.item = res;

                // Fill this.form data with current data.
                this.form.title = this.item.title;
                this.form.description = this.item.description;
                this.form.status = this.item.status;

                this.loadMetadata();
                
            })
            .catch(error => console.log(error));
        },
        loadMetadata() {
            //loadingInstance = this.$loading({ text: 'Carregando metadados...'});
            // Obtains Item Field
            this.fetchFields(this.itemId).then(res => {
               //loadingInstance.close();
            });
        }
    },
    computed: {
        fieldList(){
            return this.getFields();
        }   
    },
    created(){
        // Obtains collection ID
        this.collectionId = this.$route.params.id;
        this.form.collectionId = this.collectionId;

        if (this.$route.fullPath.split("/").pop() == "new") {

            this.pageTitle = "Criar Item";
            this.createNewItem();

        } else if (this.$route.fullPath.split("/").pop() == "edit") {

            this.pageTitle = "Editar Item";
            //let loadingInstance = this.$loading({ text: 'Carregando item...'});

            // Obtains current Item ID from URL
            this.pathArray = this.$route.fullPath.split("/").reverse(); 
            this.itemId = this.pathArray[1];

            this.fetchItem(this.itemId).then(res => {
                this.item = res;
                
                // Fill this.form data with current data.
                this.form.title = this.item.title;
                this.form.description = this.item.description;
                this.form.status = this.item.status;

                //loadingInstance.close();
            });
        }
        
        
    }

}
</script>

<style scoped>

</style>


