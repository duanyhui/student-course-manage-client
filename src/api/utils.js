
export function getCollegeList() {
    return axios({
        url: '/utils/get_collegelist',
        method: 'GET'
    })
}

export function getMajorList(collegeid) {
    return axios({
        url: '/utils/get_major',
        method: 'GET',
        params: {
            collegeid
        }
    })
}

export function getClassTime() {
    return axios({
        url: '/utils/get_classtime_list',
        method: 'GET'
    })
}