var axios = require('axios');

function Api(url) {
    this.url = url ? url : 'https://uappexplorer.com/api/';

    this.DEFAULT_LIMIT = 30;
    this.DEFAULT_SORT = 'relevance';
    this.DEFAULT_TYPE = 'all_types';
}

Api.prototype.search = function(search, skip, limit, sort, mini, query) {
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

    if (query) {
        if (!query.types) {
            query.types = this.DEFAULT_TYPE;
        }

        params.query = query;
    }

    return axios.get(this.url + 'apps', {params: params});
}

module.exports = Api;
