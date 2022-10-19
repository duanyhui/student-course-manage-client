import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      majorid: '',
      collegeid: '',
      majorname: '',
      collegename: '',
      planid: '',
        classtimeid: '',
        termid: '',
        cno: '',
        cname: '',
        tno: '',
        tname: '',
        sno: '',
        sname: '',

    },
    mutations: {
        setMajorid(state, majorid) {
            state.majorid = majorid;
        },
        setCollegeid(state, collegeid) {
            state.collegeid = collegeid;
        },
        setMajorname(state, majorname) {
            state.majorname = majorname;
        },
        setCollegename(state, collegename) {
            state.collegename = collegename;
        },
        setPlanid(state, planid) {
            state.planid = planid;
        },
        setTermid(state, termid) {
            state.termid = termid;
        },
        setCno(state, cno) {
            state.cno = cno;
        },
        setCname(state, cname) {
            state.cname = cname;
        },
        setTno(state, tno) {
            state.tno = tno;
        },
        setTname(state, tname) {
            state.tname = tname;
        },
        setSno(state, sno) {
            state.sno = sno;
        },
        setSname(state, sname) {
            state.sname = sname;
        },
        setClasstimeid(state, classtimeid) {
            state.classtimeid = classtimeid;
        }
  },
  actions: {
  },
  modules: {
  }
})
export default store

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
