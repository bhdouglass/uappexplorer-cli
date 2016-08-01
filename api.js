var axios = require('axios');

var url = 'https://uappexplorer.com/api/';

function success(res) {
    return res.data.data
}

module.exports = {
    search: function(term) {
        return axios.get(url + 'apps', {
            params: {
                skip: 0,
                limit: 30,
                search: term,
                sort: 'relevance',
                mini: true,
            }
        }).then(success);
    }
};
