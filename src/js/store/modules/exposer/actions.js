import axios from '../../../axios/axios';

export const fetchExposersUrls = ({ commit }, { baseurl, itemsCount }) => {
    return new Promise((resolve, reject) => {
        let params = {
            baseurl: baseurl,
            itemscount: itemsCount 
        };
        axios.tainacan.get('/exposers/urls', {params: params})
            .then((res) => {
                let exposersUrls = res.data;
                commit('setExposersUrls', exposersUrls);
                resolve(exposersUrls);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}


