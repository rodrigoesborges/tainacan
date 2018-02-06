<template>
    <div>
        <h2>Item creation</h2>
        <span class="badge" v-if="item != null && item != undefined" :class="'badge-' + getStatusColor(item.status)" v-text="item.status"></span>
        <form ref="form" :model="form" :rules="rules" label-width="120px">
            <div class="form-group row">
                <label for="titleInput">Título</label>
                <input type="text" v-model="form.title" class="form-control" id="titleInput" placeholder="Insira o título do Item."/>
            </div> 
            <div class="form-group row"> 
                <label for="descriptionInput">Descrição</label>
                <input type="textarea" v-model="form.description" class="form-control" id="descriptionInput" placeholder="Insira uma descrição para o item."/>      
            </div>
            <div class="form-group row"> 
                <label for="statusSelect">Status</label>
                <select v-model="form.status" class="form-control" placeholder="Selecione um status">
                    <option
                    v-for="statusOption in statusOptions"
                    :key="statusOption.value"
                    :value="statusOption.value"
                    :disabled="statusOption.disabled">{{statusOption.label}}
                    </option>
                </select>
            </div>
            <!--<el-form-item label="Imagem">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Arraste uma imagem aqui <em>ou clique para enviar</em></div>
                    <div class="el-upload__tip" slot="tip">imagens em formato jpg/png</div>
                </el-upload>
            </el-form-item> -->
            <tainacan-form-item v-for="(field, index) in fieldList" v-bind:key="index" :field="field"></tainacan-form-item>
            <div class="form-group row">
                <button class="btn btn-primary" @click="onSubmit">Salvar</button>
                <button  class="btn">Cancelar</button>
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
                    { required: true, message: 'Please input Activity name', trigger: 'blur' }
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
            let loadingInstance = this.$loading({ text: 'Salvando item ...' });

            let data = {item_id: this.itemId, title: this.form.title, description: this.form.description, status: this.form.status};
            this.updateItem(data).then(updatedItem => {    
                
                this.item = updatedItem;

                // Fill this.form data with current data.
                this.form.title = this.item.title;
                this.form.description = this.item.description;
                this.form.status = this.item.status;

                loadingInstance.close();
            });
        },
        getStatusColor(status) {
            switch(status) {
                case 'publish': 
                    return 'success'
                case 'draft':
                    return 'info'
                case 'private': 
                    return 'warning'
                case 'trash':
                    return 'danger'
                default:
                    return 'info'
            }
        },
        createNewItem() {
            // Puts loading on Draft Item creation
            let loadingInstance = this.$loading({ text: 'Criando item rascunho...' });

            // Creates draft Item
            let data = {collection_id: this.form.collectionId, title: '', description: '', status: 'draft'};
            this.sendItem(data).then(res => {

                this.itemId = res.id;
                this.item = res;

                // Fill this.form data with current data.
                this.form.title = this.item.title;
                this.form.description = this.item.description;
                this.form.status = this.item.status;

                this.loadMetadata(loadingInstance);
                
            })
            .catch(error => console.log(error));
        },
        loadMetadata(loadingInstance) {
            loadingInstance = this.$loading({ text: 'Carregando metadados...'});
            // Obtains Item Field
            this.fetchFields(this.itemId).then(res => {
               loadingInstance.close();
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
            this.createNewItem();
        } else if (this.$route.fullPath.split("/").pop() == "edit") {

            let loadingInstance = this.$loading({ text: 'Carregando item...'});

            // Obtains current Item ID from URL
            this.pathArray = this.$route.fullPath.split("/").reverse(); 
            this.itemId = this.pathArray[1];

            this.fetchItem(this.itemId).then(res => {
                this.item = res;
                
                // Fill this.form data with current data.
                this.form.title = this.item.title;
                this.form.description = this.item.description;
                this.form.status = this.item.status;

                loadingInstance.close();
            });
        }
        
        
    }

}
</script>

<style scoped>

</style>


