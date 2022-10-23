
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

export function getCollegeNameById(collegeid) {
    return axios({
        url: '/utils/get_college_name',
        method: 'GET',
        params: {
            collegeid: collegeid
        }
    })
}
export function getClassListByTno(tno) {
    return axios({
        url: '/teacher/get_classlist_by_tno',
        method: 'GET',
        params: {
            tno: tno
        }
    })
}

export function getAbleCourseBySno(sno) {
    return axios({
        url: '/student/get_able_course',
        method: 'GET',
        params: {
            sno: sno
        }
    })
}

export function selectCourse(ctid,sno){
    return axios({
        url: '/student/select_course',
        method: 'POST',
        params:{
            ctid: ctid,
            sno: sno
        }
    })
}

export function getSelectedCourse(sno) {
    return axios({
        url: '/student/get_selected_course',
        method: 'GET',
        params: {
            sno: sno
        }
    })
}

export function deleteSelectedCourse(ctid,sno) {
    return axios({
        url: '/student/delete_selected_course',
        method: 'POST',
        params: {
            ctid: ctid,
            sno: sno
        }
    })
}

export function getPlanListBySno(sno) {
    return axios({
        url: '/plan/get_plan_list_by_sno',
        method: 'GET',
        params: {
            sno: sno
        }
    })
}

export function getStudentClassList(tno,cname,sname){
    return axios({
        url: '/teacher/get_student_classlist',
        method: 'GET',
        params: {
            tno: tno,
            cname: cname,
            sname: sname
        }
    })
}

export function updateStudentGrade(ctid,sno,grade){
    return axios({
        url: '/teacher/update_grade',
        method: 'POST',
        data: {
            ctid: ctid,
            sno: sno,
            grade: grade
        }
    })
}

export function getStudentClassList_Admin(sname,tname,cname){
    return axios({
        url: '/utils/get_student_classlist',
        method: 'GET',
        params: {
            sname: sname,
            tname: tname,
            cname: cname
        }
    })
}

export function updateTerm(){
    return axios({
        url: '/utils/update_term',
        method: 'POST'
    })
}

export function updateTerm_before(){
    return axios({
        url: '/utils/update_term_before',
        method: 'POST'
    })
}