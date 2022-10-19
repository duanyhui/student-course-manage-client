
export function getCollegeList() {
    return axios({
        url: '/utils/get_collegelist',
        method: 'GET'
    })
}
export function getCollegeName(collegeid) {
    return axios({
        url: '/utils/get_college_name',
        method: 'GET',
        params: {
            collegeid: collegeid
        }

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

export function createCollege(collegeName) {

    return axios({
        url: '/utils/create_college',
        method: 'POST',
        params: {
            collegename: collegeName
        }
    })
}

export function createMajor(majorName, collegeid) {
    return axios({
        url: '/utils/create_major',
        method: 'POST',
        params: {
            collegeid: collegeid,
            majorname: majorName,

        }
    })
}

export function createPlanIndex(majorid, collegeid) {
    return axios({
        url: '/plan/create_plan_index',
        method: 'POST',
        data:{
            majorid: majorid,
            collegeid: collegeid
        }
    })
}

export function getPlanIndexList(){
    return axios({
        url: '/plan/get_plan_index_list',
        method: 'GET'
    })
}

export function createPlanTable(planid, cid) {
    return axios({
        url: '/plan/create_plan_table',
        method: 'POST',
        data:{
            planid: planid,
            cid: cid
        }
    })
}

