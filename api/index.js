var axios = require('axios');

function Api(url) {
    this.url = url ? url : 'https://uappexplorer.com/api/';

    this.DEFAULT_LIMIT = 30;
    this.DEFAULT_SORT = 'relevance';
}

Api.prototype.search = function(search, skip, limit, sort, mini) {
    skip = skip ? skip : 0;
    limit = limit ? limit : this.DEFAULT_LIMIT;
    sort = sort ? sort : this.DEFAULT_SORT;
    mini = (mini === undefined) ? true : mini;

    var params = {
        skip: skip,
        limit: limit,
        sort: sort,
        mini: mini,
    };

    if (search) {
        params.search = search;
    }

    return axios.get(this.url + 'apps', {params: params});
}

module.exports = Api;
