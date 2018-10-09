import axios from '../../../axios/axios';

export const fetchExposersUrls = ({ commit }, { baseurl }) => {
    return new Promise((resolve, reject) => {
        var param = {
            baseurl: baseurl
        };
        axios.tainacan.get('/exposers/urls', param)
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


