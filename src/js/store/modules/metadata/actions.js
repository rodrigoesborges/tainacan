import axios from '../../../axios/axios';
import qs from 'qs';

export const fetchMetadata = ({commit}, {collectionId, isRepositoryLevel, isContextEdit}) => {
    return new Promise((resolve, reject) => {
        let endpoint = '';
        if (!isRepositoryLevel)
            endpoint = '/collection/' + collectionId + '/metadata/';
        else
            endpoint = '/metadata/';

        endpoint += '?nopaging=1';
        if (isContextEdit)
            endpoint += '&context=edit';

        axios.tainacan.get(endpoint)
            .then((res) => {
                let metadata = res.data;
                commit('setMetadata', metadata);
                resolve(metadata);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const sendMetadatum = ({commit}, {collectionId, name, metadatumType, status, isRepositoryLevel, newIndex}) => {
    return new Promise((resolve, reject) => {
        let endpoint = '';
        if (!isRepositoryLevel)
            endpoint = '/collection/' + collectionId + '/metadata/';
        else
            endpoint = '/metadata/';
        axios.tainacan.post(endpoint + '?context=edit', {
            name: name,
            metadata_type: metadatumType,
            status: status
        })
            .then(res => {
                let metadatum = res.data;
                commit('setSingleMetadatum', {metadatum: metadatum, index: newIndex});
                resolve(res.data);
            })
            .catch(error => {
                reject(error.response);
            });
    });
};

export const updateMetadatum = ({commit}, {collectionId, metadatumId, isRepositoryLevel, index, options}) => {
    return new Promise((resolve, reject) => {
        let endpoint = '';

        if (!isRepositoryLevel)
            endpoint = '/collection/' + collectionId + '/metadata/' + metadatumId;
        else
            endpoint = '/metadata/' + metadatumId;

        axios.tainacan.put(endpoint + '?context=edit', options)
            .then(res => {
                let metadatum = res.data;
                commit('setSingleMetadatum', {metadatum: metadatum, index: index});
                resolve(metadatum);
            })
            .catch(error => {
                reject({
                    error_message: error['response']['data'].error_message,
                    errors: error['response']['data'].errors
                });
            });
    });
};

export const updateMetadata = ({commit}, metadata) => {
    commit('setMetadata', metadata);
};

export const deleteMetadatum = ({commit}, {collectionId, metadatumId, isRepositoryLevel}) => {
    let endpoint = '';
    if (!isRepositoryLevel)
        endpoint = '/collection/' + collectionId + '/metadata/' + metadatumId;
    else
        endpoint = '/metadata/' + metadatumId;

    return new Promise((resolve, reject) => {
        axios.tainacan.delete(endpoint)
            .then(res => {
                commit('deleteMetadatum', res.data);
                resolve(res.data);
            }).catch((error) => {
            console.log(error);
            reject(error);
        });

    });
};

export const updateCollectionMetadataOrder = ({ dispatch }, {collectionId, metadataOrder}) => {
    return new Promise((resolve, reject) => {
        axios.tainacan.patch('/collections/' + collectionId, {
            metadata_order: metadataOrder
        }).then(res => {
            //dispatch('collection/setCollection', res.data, {root: true});
            resolve(res.data);
        }).catch(error => {
            reject(error.response);
        });

    });
}

export const fetchMetadatumTypes = ({commit}) => {
    return new Promise((resolve, reject) => {
        axios.tainacan.get('/metadata-types')
            .then((res) => {
                let metadatumTypes = res.data;
                commit('setMetadatumTypes', metadatumTypes);
                resolve(metadatumTypes);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const updateMetadatumTypes = ({commit}, metadatumTypes) => {
    commit('setMetadatumTypes', metadatumTypes);
};

export const fetchMetadatumMappers = ({commit}) => {
    return new Promise((resolve, reject) => {
        axios.tainacan.get('/metadatum-mappers')
            .then((res) => {
                let metadatumMappers = res.data;
                commit('setMetadatumMappers', metadatumMappers);
                resolve(metadatumMappers);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const updateFieldsMapperMetadata = ({ dispatch }, {fieldsMapperMetadata, mapper}) => {
    return new Promise((resolve, reject) => {
        axios.tainacan.post('/field-mappers', {
                fields_mappers: fieldsMapperMetadata,
                exposer_map: mapper
            }).then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
export const updateMetadatumMappers = ({commit}, metadatumMappers) => {
    commit('setMetadatumMappers', metadatumMappers);
};

