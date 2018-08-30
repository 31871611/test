import axios from 'axios';
import qs from 'qs';

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
};

let token = getCookie('token') || sessionStorage.getItem('token');
let instance = axios.create({
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'token': token
	}
});
let instances = axios.create({
	headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

instance.interceptors.response.use(function(response) {
	// 对响应数据统一判断
	const code = response.data.code;
	if (code == '-99999' || code == '-99998' || code == '-99997') {
		sessionStorage.removeItem('user');
		window.location.href = logout;
	} else if (code == '-99996') {
		this.$router.go(-1);
	}
	return response;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

let base = process.env.API_ROOT;
let baseUrl = `https://api.${base}/ddzx`;
export let schoolUrl = `https://api.${base}/school`;
//export let schoolUrl = '//192.168.0.103:80/high-school/public';
let getSchool = 'https://gz.dadaodata.com';
let qiniuSdk = `https://api.${base}/base`;
let evaluate = `https://api.${base}/evaluate2`;
let eduUrl = `https://api.${base}`;
let college = `https://api.${base}/college`;
let student2 = `https://api.${base}/student2`;
export const exportExcel = `${schoolUrl}/school/Import/exportExcel`;
export const qiniu = 'https://image.zgxyzx.net/';
export const tokenUrl = `school.html.${base}`;
export const logout = process.env.API_ROOT_logout;
export const clearCookies = `${qiniuSdk}/api/user/clearToken`;

export const getImgSDK = params => { return instance.get(`${qiniuSdk}/api/Qiniu/getToken?type=image`, qs.stringify(params)).then(res => res.data); };
//get
export const schoolInfo = params => { return instance.get(`${schoolUrl}/school/SchoolData/getSchoolData`, { params: params }); };
export const getClassListPage = params => { return instance.get(`${base}/user/clistpage`, { params: params }); };
export const getAdd = params => { return instance.get(`${qiniuSdk}/api/Region/region`, { params: params }); };
export const getUpperCity = params => { return instance.get(`${qiniuSdk}/api/region/getUpperCity`, { params: params }); };
export const getDocSDK = params => { return instance.get(`${qiniuSdk}/api/Qiniu/getToken?type=doc`, qs.stringify(params)).then(res => res.data); };
//七牛上传获取token
export const getUploadToken = params => { return instance.get(`${qiniuSdk}/api/Qiniu/getToken`, { params: params }).then(res => res.data); };
//post

export const saveSchool = params => { return instance.post(`${schoolUrl}/school/SchoolData/saveSchoolData`, qs.stringify(params)).then(res => res.data); };
//export const login = params => { return instance.post(`${qiniuSdk}/api/user/getData`, qs.stringify(params)).then(res => res.data); };
export const login = params => {
	return instances.post(`${qiniuSdk}/api/user/getData`, qs.stringify(params)).then(res => res.data);
};

//民族列表
export const nationList = params => { return instance.post(`${qiniuSdk}/api/nation/index`, qs.stringify(params)).then(res => res.data); };
//export const logout = params => { return instance.post(`${baseUrl}/auth/user/logout`, qs.stringify(params)).then(res => res.data); };
export const getClass = params => { return instance.post(`${schoolUrl}/school/classManager/getClassList`, qs.stringify(params)).then(res => res.data); };
export const removeClass = params => { return instance.post(`${schoolUrl}/school/classManager/delClass`, qs.stringify(params)).then(res => res.data); };
export const editClass = params => { return instance.post(`${schoolUrl}/school/classManager/updateClass`, qs.stringify(params)).then(res => res.data); };
export const addClass = params => { return instance.post(`${schoolUrl}/school/classManager/addClass`, qs.stringify(params)).then(res => res.data); };
export const classs = params => { return instance.post(`${schoolUrl}/school/classManager/classDetail`, qs.stringify(params)).then(res => res.data); };
export const teacher = params => { return instance.post(`${schoolUrl}/school/classManager/classSyTeacher`, qs.stringify(params)).then(res => res.data); };
export const teachers = params => { return instance.post(`${schoolUrl}/school/classManager/classTeacher`, qs.stringify(params)).then(res => res.data); };
export const student = params => { return instance.post(`${schoolUrl}/school/classManager/classStudent`, qs.stringify(params)).then(res => res.data); };
export const delTeacher = params => { return instance.post(`${schoolUrl}/school/classManager/delClassTeacher`, qs.stringify(params)).then(res => res.data); };
export const telList = params => { return instance.post(`${schoolUrl}/school/classManager/addClassTeacherList`, qs.stringify(params)).then(res => res.data); };
export const addTel = params => { return instance.post(`${schoolUrl}/school/classManager/addClassTeacher`, qs.stringify(params)).then(res => res.data); };
export const addSyTel = params => { return instance.post(`${schoolUrl}/school/classManager/addClassSyTeacher`, qs.stringify(params)).then(res => res.data); };
export const addStu = params => { return instance.post(`${schoolUrl}/school/Student/addStudentData`, qs.stringify(params)).then(res => res.data); };
export const teacherList = params => { return instance.post(`${schoolUrl}/school/Teacher/schoolTchList`, qs.stringify(params)).then(res => res.data); };
export const teacherInfo = params => { return instance.post(`${schoolUrl}/teacher/Information/schoolTchInfo `, qs.stringify(params)).then(res => res.data); };
export const teacherUp = params => { return instance.post(`${schoolUrl}/teacher/Information/schoolUpdateTchInfo `, qs.stringify(params)).then(res => res.data); };
export const telJob = params => { return instance.post(`${schoolUrl}/teacher/Information/tchClass`, qs.stringify(params)).then(res => res.data); };
export const upJob = params => { return instance.post(`${schoolUrl}/teacher/Information/upDataTchSchInfo`, qs.stringify(params)).then(res => res.data); };
export const removeCls = params => { return instance.post(`${schoolUrl}/teacher/Information/delTchSchClass`, qs.stringify(params)).then(res => res.data); };
export const addTeacher = params => { return instance.post(`${schoolUrl}/school/Teacher/addTeacher`, qs.stringify(params)).then(res => res.data); };
export const addStudent = params => { return instance.post(`${schoolUrl}/school/Student/addStudentData`, qs.stringify(params)).then(res => res.data); };
export const dataUp = params => { return instance.post(`${schoolUrl}/school/Import/importData`, qs.stringify(params)).then(res => res.data); };
export const getStudent = params => { return instance.post(`${schoolUrl}/school/Student/getStudentList`, qs.stringify(params)).then(res => res.data); };
export const stuInfo = params => { return instance.post(`${schoolUrl}/student/Student/getStuInfo`, qs.stringify(params)).then(res => res.data); };
export const country = params => { return instance.post(`${schoolUrl}/api/Country/getCountry/country_name/`, qs.stringify(params)).then(res => res.data); };
export const upStudent = params => { return instance.post(`${schoolUrl}/student/Student/updateStudentData`, qs.stringify(params)).then(res => res.data); };
export const parents = params => { return instance.post(`${schoolUrl}/student/Student/getStuParentInfo`, qs.stringify(params)).then(res => res.data); };
export const importTel = params => { return instance.post(`${schoolUrl}/school/Import/getTeacherList`, qs.stringify(params)).then(res => res.data); };
export const importStu = params => { return instance.post(`${schoolUrl}/school/Import/getStudentList`, qs.stringify(params)).then(res => res.data); };
export const delTel = params => { return instance.post(`${schoolUrl}/school/Import/delTeacherInfo`, qs.stringify(params)).then(res => res.data); };
export const delStu = params => { return instance.post(`${schoolUrl}/school/Import/delStudentInfo`, qs.stringify(params)).then(res => res.data); };
export const addTelInfo = params => { return instance.post(`${schoolUrl}/school/Import/addTeacherInfo`, qs.stringify(params)).then(res => res.data); };
export const addStuInfo = params => { return instance.post(`${schoolUrl}/school/Import/addStudentInfo`, qs.stringify(params)).then(res => res.data); };
export const saveMobile = params => { return instance.post(`${qiniuSdk}/api/user/saveMobile`, qs.stringify(params)).then(res => res.data); };
export const sendCode = params => { return instance.post(`${qiniuSdk}/api/sms/sendCode`, qs.stringify(params)).then(res => res.data); };
export const changePwd = params => { return instance.post(`${qiniuSdk}/api/user/updatePassword`, qs.stringify(params)).then(res => res.data); };
export const adminUpdate = params => { return instance.post(`${qiniuSdk}/api/user/updateData`, qs.stringify(params)).then(res => res.data); };
// 导出导师列表
export const exportTeacher = `${schoolUrl}/school/Teacher/exportTeacher`
// 导师快速编辑
export const quickEditTchInfo = params => { return instance.post(`${schoolUrl}/school/Teacher/quickEditTchInfo`, qs.stringify(params)).then(res => res.data); };
// 导师批量编辑
export const batchEditTchInfo = params => { return instance.post(`${schoolUrl}/school/Teacher/batchEditTchInfo`, qs.stringify(params)).then(res => res.data); };
// 导出学生列表
export const exportStudent = `${schoolUrl}/school/Student/exportStudent`
// 学生快速编辑
export const quickEditStuInfo = params => { return instance.post(`${schoolUrl}/school/Student/quickEditStuInfo`, qs.stringify(params)).then(res => res.data); };
// 学生批量编辑
export const batchEditStuInfo = params => { return instance.post(`${schoolUrl}/school/Student/batchEditStuInfo`, qs.stringify(params)).then(res => res.data); };



//生涯智库
export const getCollegeList = params => { return instance.post(`${schoolUrl}/api/CollegeManage/getCollegeList`, qs.stringify(params)).then(res => res.data); }; //获取大学列表
export const getMajorList = params => { return instance.post(`${schoolUrl}/api/CollegeManage/majorAllList`, qs.stringify(params)).then(res => res.data); }; //获取专业列表
export const getOccupationList = params => { return instance.post(`${schoolUrl}/api/CollegeManage/occupationList`, qs.stringify(params)).then(res => res.data); }; //获取职业列表
export const getOccupationInfo = params => { return instance.get(`${schoolUrl}/api/CollegeManage/occupationInfo`, { params: params }).then(res => res.data); }; //职业详情
export const getOccupationMajorList = params => { return instance.get(`${schoolUrl}/api/CollegeManage/occupationMajorList`, { params: params }).then(res => res.data); }; //职业详情
export const getMajorInfo = params => { return instance.get(`${schoolUrl}/api/CollegeManage/majorInfo`, { params: params }).then(res => res.data); }; //专业详情
export const getMajorCollegeList = params => { return instance.get(`${schoolUrl}/api/CollegeManage/majorCollegeList`, { params: params }).then(res => res.data); }; //开设该专业院校
export const getMajorOccupationList = params => { return instance.get(`${schoolUrl}/api/CollegeManage/majorOccupationList`, { params: params }).then(res => res.data); }; //专业匹配职业
export const getVideoTypeList = params => { return instance.get(`${schoolUrl}/api/CollegeManage/getVideoTypeList`, { params: params }).then(res => res.data); }; //视频
export const getCollegeInfo = params => { return instance.get(`${schoolUrl}/api/CollegeManage/getCollegeInfo`, { params: params }).then(res => res.data); }; //大学详情
export const getCollegeTopic = params => { return instance.get(`${schoolUrl}/api/CollegeManage/getCollegeTopic`, { params: params }).then(res => res.data); }; //大学-招生简章
export const getAioCollegeMajorList = params => { return instance.get(`${schoolUrl}/api/CollegeManage/getAioCollegeMajorList`, { params: params }).then(res => res.data); }; //大学-开设专业
export const getCollegeScoreList = params => { return instance.get(`${schoolUrl}/api/CollegeManage/getCollegeScoreList`, { params: params }).then(res => res.data); }; //大学-历年分数线
export const getCollegePicList = params => { return instance.get(`${schoolUrl}/api/CollegeManage/getCollegePicList`, { params: params }).then(res => res.data); }; //大学-校园风采

// timetable
// 课程列表
export const courseList = params => { return instance.post(`${schoolUrl}/course/Subject/subjectList`, qs.stringify(params)).then(res => res.data); };
// 可选科目列表
export const xkSubList = params => { return instance.post(`${schoolUrl}/course/Subject/xkSubList`, qs.stringify(params)).then(res => res.data); };
// 可选科目列表(新)
export const xkSubListV2 = params => { return instance.post(`${schoolUrl}/course/Subject/xkSubListV2`, qs.stringify(params)).then(res => res.data); };
// 新增课程
export const courseAdd = params => { return instance.post(`${schoolUrl}/course/Subject/subjectInsert`, qs.stringify(params)).then(res => res.data); };
// 编辑课程
export const courseEdit = params => { return instance.post(`${schoolUrl}/course/Subject/subjectUpdate`, qs.stringify(params)).then(res => res.data); };
// 预设班级类型列表
export const classroomType = params => { return instance.post(`${schoolUrl}/course/Classroom/classroomType`, qs.stringify(params)).then(res => res.data); };
// 删除课程
export const courseDelete = params => { return instance.post(`${schoolUrl}/course/Subject/subjectDelete`, qs.stringify(params)).then(res => res.data); };
// 教室场地列表
export const classroomList = params => { return instance.post(`${schoolUrl}/course/Classroom/classroomList`, qs.stringify(params)).then(res => res.data); };
// 添加教室场地
export const classroomAdd = params => { return instance.post(`${schoolUrl}/course/Classroom/classroomInsert`, qs.stringify(params)).then(res => res.data); };
// 删除教室场地
export const classroomDelete = params => { return instance.post(`${schoolUrl}/course/Classroom/classroomDelete`, qs.stringify(params)).then(res => res.data); };
// 修改教室场地
export const classroomUpdate = params => { return instance.post(`${schoolUrl}/course/Classroom/classroomUpdate`, qs.stringify(params)).then(res => res.data); };
// 排课设置列表(选课任务管理)
export const paikeSettingList = params => { return instance.post(`${schoolUrl}/course/settings/paikeSettingList`, qs.stringify(params)).then(res => res.data); };
// 删除排课基础设置(选课任务管理-删除)
export const paikeDelSetting = params => { return instance.post(`${schoolUrl}/course/settings/delSetting`, qs.stringify(params)).then(res => res.data); };
// 编辑排课基础设置(选课任务管理-编辑)
export const paikeEditSetting = params => { return instance.post(`${schoolUrl}/course/settings/editSetting`, qs.stringify(params)).then(res => res.data); };
// 获取学年列表（手工统计）
export const subjectGetYearList = params => { return instance.post(`${schoolUrl}/course/Subject/getYearList`, qs.stringify(params)).then(res => res.data); };
// 学生单个志愿统计
export const subjectCount = params => { return instance.post(`${schoolUrl}/course/Subject/subjectCount`, qs.stringify(params)).then(res => res.data); };
// 学生志愿组合统计
export const subjectAllCount = params => { return instance.post(`${schoolUrl}/course/Subject/subjectAllCount`, qs.stringify(params)).then(res => res.data); };
// 获取未排上课的学生列表
export const courseSurplusStu = params => { return instance.post(`${schoolUrl}/course/courseAdjust/courseSurplusStu`, qs.stringify(params)).then(res => res.data); };
// 获取还未满科目组合以及未满人数
export const courseAdjust = params => { return instance.post(`${schoolUrl}/course/courseAdjust/courseAdjust`, qs.stringify(params)).then(res => res.data); };
// 学生选课调整添加
export const addCourseStu = params => { return instance.post(`${schoolUrl}/course/courseAdjust/addCourseStu`, qs.stringify(params)).then(res => res.data); };
// 上下学期列表
export const getTermOptions = params => { return instance.post(`${schoolUrl}/course/settings/getTermOptions`, qs.stringify(params)).then(res => res.data); };
// 所有课程列表
//export const getCourseList = params => { return instance.post(`${schoolUrl}/course/course/getCourseList`, qs.stringify(params)).then(res => res.data); };
// 学年年级的班级列表
//export const getClsByTermSection = params => { return instance.post(`${schoolUrl}/course/StaffClass/getClsByTermSection`, qs.stringify(params)).then(res => res.data); };
// 通过id获取基础设置资料
//export const getInfoBySettingid = params => { return instance.post(`${schoolUrl}/course/settings/getInfoBySettingid`, qs.stringify(params)).then(res => res.data); };
// 学年年级班级的课表学生
export const getStuByTermSecCls = params => { return instance.post(`${schoolUrl}/course/timetable/getStuByTermSecCls`, qs.stringify(params)).then(res => res.data); };
// 学年年级班级学科的课表教师
export const getTeaByTermSecClsCs = params => { return instance.post(`${schoolUrl}/course/timetable/getTeaByTermSecClsCs`, qs.stringify(params)).then(res => res.data); };
// 手工调整师生调换
export const manulExChange = params => { return instance.post(`${schoolUrl}/course/timetable/manulExChange`, qs.stringify(params)).then(res => res.data); };
// 当前学期年段班级
export const getNowSectionClass = params => { return instance.post(`${schoolUrl}/course/StaffClass/getNowSectionClass`, qs.stringify(params)).then(res => res.data); };
// 新手工调整（当前高中年段班级）
export const getNowSeniorSectionClass = params => { return instance.post(`${schoolUrl}/course/StaffClass/getNowSeniorSectionClass`, qs.stringify(params)).then(res => res.data); };
// 新手工调整（本学期可调整的课表班级学生）
export const getMutulExchClsStu = params => { return instance.post(`${schoolUrl}/course/timetable/getMutulExchClsStu`, qs.stringify(params)).then(res => res.data); };
// 新手工调整（手工调整(学生班级调整)）
export const manulExChangeStu = params => { return instance.post(`${schoolUrl}/course/timetable/manulExChangeStu`, qs.stringify(params)).then(res => res.data); };

// 获取选科任务列表
export const getSelCourseList = params => { return instance.post(`${schoolUrl}/course/SelCourse/getSelCourseList`, qs.stringify(params)).then(res => res.data); };
// 获取当前学年
export const getNowTerms = params => { return instance.post(`${schoolUrl}/course/SelCourse/getNowTerms`, qs.stringify(params)).then(res => res.data); };
// 添加选科任务
export const insertSelCourse = params => { return instance.post(`${schoolUrl}/course/SelCourse/insertSelCourse`, qs.stringify(params)).then(res => res.data); };
// 编辑选科任务
export const upDateSelCourse = params => { return instance.post(`${schoolUrl}/course/SelCourse/upDateSelCourse`, qs.stringify(params)).then(res => res.data); };
// 删除选科任务
export const deleteSelCourse = params => { return instance.post(`${schoolUrl}/course/SelCourse/deleteSelCourse`, qs.stringify(params)).then(res => res.data); };
// 获取选科任务详情
export const getSelCourInfo = params => { return instance.post(`${schoolUrl}/course/SelCourse/getSelCourInfo`, qs.stringify(params)).then(res => res.data); };
// 选科统计
export const getCourseStatistics = params => { return instance.post(`${schoolUrl}/course/SelCourse/getCourseStatistics`, qs.stringify(params)).then(res => res.data); };
// 选科明细
export const getSelCourDetail = params => { return instance.post(`${schoolUrl}/course/SelCourse/getSelCourDetail`, qs.stringify(params)).then(res => res.data); };
// 导出选科情况
export const exportSelCourse = `${schoolUrl}/course/SelCourse/exportSelCourse`;
// 获取学生选科和科目列表
export const getStuSelCourse = params => { return instance.post(`${schoolUrl}/course/SelCourse/getStuSelCourse`, qs.stringify(params)).then(res => res.data); };
// 教务选科调整
export const schoolSubAdjust = params => { return instance.post(`${schoolUrl}/course/SelCourse/schoolSubAdjust`, qs.stringify(params)).then(res => res.data); };
// 家长信息
export const getParentList = params => { return instance.post(`${schoolUrl}/course/SelCourse/getParentList`, qs.stringify(params)).then(res => res.data); };
// 选科管理全部班级
export const getXkClassList = params => { return instance.post(`${schoolUrl}/school/classManager/getXkClassList`, qs.stringify(params)).then(res => res.data); };
// 选科组合管理
export const getSubComboManage = params => { return instance.post(`${schoolUrl}/course/SelCourse/getSubComboManage`, qs.stringify(params)).then(res => res.data); };
// 选科组合统计
export const getSubComboStatistics = params => { return instance.post(`${schoolUrl}/course/SelCourse/getSubComboStatistics`, qs.stringify(params)).then(res => res.data); };
// 筛选条件(选科组合统计)
export const getTermFilter = params => { return instance.post(`${schoolUrl}/course/SelCourse/getTermFilter`, qs.stringify(params)).then(res => res.data); };


// ***Ben***
export const setLeader = params => { return instance.post(`${schoolUrl}/school/classManager/classLeader`, qs.stringify(params)).then(res => res.data); };
// 获取学年
export const subjectList = params => { return instance.post(`${schoolUrl}/course/Subject/subjectList`, qs.stringify(params)).then(res => res.data); };
// 获取学年
export const termOptions = params => { return instance.post(`${schoolUrl}/course/settings/getTermOptions`, qs.stringify(params)).then(res => res.data); };
// 基础设置
export const addTerm = params => { return instance.post(`${schoolUrl}/course/settings/addBasicSettings`, qs.stringify(params)).then(res => res.data); };
// 节次设置
export const addJieci = params => { return instance.post(`${schoolUrl}/course/settings/addJieciSettings`, qs.stringify(params)).then(res => res.data); };
// 获取课程列表
export const getCourseList = params => { return instance.post(`${schoolUrl}/course/course/getCourseList`, qs.stringify(params)).then(res => res.data); };
// 设置科目课时
export const editCourseHours = params => { return instance.post(`${schoolUrl}/course/settings/editCourseHours`, qs.stringify(params)).then(res => res.data); };
// 批量排课
export const setBatchCourse = params => { return instance.post(`${schoolUrl}/course/settings/setBatchCourse`, qs.stringify(params)).then(res => res.data); };
// 排课规则设置
export const setPaikeRules = params => { return instance.post(`${schoolUrl}/course/settings/setPaikeRules`, qs.stringify(params)).then(res => res.data); };
// 年段班级列表
export const getClassBySettingid = params => { return instance.post(`${schoolUrl}/course/settings/getClassBySettingid`, qs.stringify(params)).then(res => res.data); };
// 并班排课
export const setMergeClass = params => { return instance.post(`${schoolUrl}/course/settings/setMergeClass`, qs.stringify(params)).then(res => res.data); };
// 走班设置
export const setZoubanCourse = params => { return instance.post(`${schoolUrl}/course/settings/setZoubanCourse`, qs.stringify(params)).then(res => res.data); };
//可走班的课程列表
export const getZoubanCourse = params => { return instance.post(`${schoolUrl}/course/course/getZoubanCourse`, qs.stringify(params)).then(res => res.data); };
// 根据id获取选课任务基础信息
export const getInfoBySettingid = params => { return instance.post(`${schoolUrl}/course/settings/getInfoBySettingid`, qs.stringify(params)).then(res => res.data); };
// 发布设置
export const setPaikePublishTime = params => { return instance.post(`${schoolUrl}/course/settings/setPaikePublishTime`, qs.stringify(params)).then(res => res.data); };
// 重新排课设置
export const rebuildTimetable = params => { return instance.post(`${schoolUrl}/course/settings/rebuildTimetable`, qs.stringify(params)).then(res => res.data); };
// 根据课程获取教师列表
export const getTeaListByCourse = params => { return instance.post(`${schoolUrl}/course/teacher/getTeaListByCourse`, qs.stringify(params)).then(res => res.data); };
//学年班级列表
export const getClsByTermSection = params => { return instance.post(`${schoolUrl}/course/StaffClass/getClsByTermSection`, qs.stringify(params)).then(res => res.data); };
// 教师排班设置
export const setTeacherMapClass = params => { return instance.post(`${schoolUrl}/course/settings/setTeacherMapClass`, qs.stringify(params)).then(res => res.data); };
// 学年学期获得班级课表
export const getClassTimetableByTermSecCls = params => { return instance.post(`${schoolUrl}/course/timetable/getClassTimetableByTermSecCls`, qs.stringify(params)).then(res => res.data); };
// 学年学期获得教师课表
export const getTeaTimetableByTermNum = params => { return instance.post(`${schoolUrl}/course/timetable/getTeaTimetableByTermNum`, qs.stringify(params)).then(res => res.data); };
//本校所有老师
export const getAllTeacher = params => { return instance.post(`${schoolUrl}/course/teacher/getAllTeacher`, qs.stringify(params)).then(res => res.data); };
// 获取学生列表
export const getAllStudent = params => { return instance.post(`${schoolUrl}/course/student/getAllStudent`, qs.stringify(params)).then(res => res.data); };
// 搜索学生
export const getStudentBySchKey = params => { return instance.post(`${schoolUrl}/course/student/getStudentBySchKey`, qs.stringify(params)).then(res => res.data); };
// 获取学生课表
export const getStuTimetableByTermNum = params => { return instance.post(`${schoolUrl}/course/timetable/getStuTimetableByTermNum`, qs.stringify(params)).then(res => res.data); };
// 获取总课表
export const getWholeTimetableByTermSec = params => { return instance.post(`${schoolUrl}/course/timetable/getWholeTimetableByTermSec`, qs.stringify(params)).then(res => res.data); }; // 获取总课表
// 可批量排课的课程列表
export const getBatchSetCourse = params => { return instance.post(`${schoolUrl}/course/course/getBatchSetCourse`, qs.stringify(params)).then(res => res.data); };

//-----------------------------------------------一体机信息管理
//---校园风采管理设置列表
export const getPictureList = params => { return instance.post(`${schoolUrl}/aio/Picture/getPictureList`, qs.stringify(params)).then(res => res.data); };
//新增校园风采
export const pictureInsert = params => { return instance.post(`${schoolUrl}/aio/Picture/pictureInsert`, qs.stringify(params)).then(res => res.data); };
//删除校园风采
export const pictureDelete = params => { return instance.post(`${schoolUrl}/aio/Picture/pictureDelete`, qs.stringify(params)).then(res => res.data); };
//修改校园风采
export const pictureUpdate = params => { return instance.post(`${schoolUrl}/aio/Picture/pictureUpdate`, qs.stringify(params)).then(res => res.data); };
//获取风采详细信息
export const pictureData = params => { return instance.post(`${schoolUrl}/aio/Picture/pictureData`, qs.stringify(params)).then(res => res.data); };
//---校园视频管理设置列表
export const videoList = params => { return instance.post(`${schoolUrl}/aio/Video/videoList`, qs.stringify(params)).then(res => res.data); };
//新增视频
export const videoInsert = params => { return instance.post(`${schoolUrl}/aio/Video/videoInsert`, qs.stringify(params)).then(res => res.data); };
//删除视频
export const videoDelete = params => { return instance.post(`${schoolUrl}/aio/Video/videoDelete`, qs.stringify(params)).then(res => res.data); };
//修改视频
export const videoUpdate = params => { return instance.post(`${schoolUrl}/aio/Video/videoUpdate`, qs.stringify(params)).then(res => res.data); };
//获取视频详细信息
export const videoData = params => { return instance.post(`${schoolUrl}/aio/Video/videoData`, qs.stringify(params)).then(res => res.data); };
//---校园荣誉管理设置列表
export const honorList = params => { return instance.post(`${schoolUrl}/aio/Honor/honorList`, qs.stringify(params)).then(res => res.data); };
//新增荣誉
export const honorInsert = params => { return instance.post(`${schoolUrl}/aio/Honor/honorInsert`, qs.stringify(params)).then(res => res.data); };
//新增荣誉获取班级
export const getClassList = params => { return instance.post(`${schoolUrl}/school/classManager/getClassList`, qs.stringify(params)).then(res => res.data); };
//获取学生
export const getStudentList = params => { return instance.post(`${schoolUrl}/school/Student/getStudentList`, qs.stringify(params)).then(res => res.data); };
//删除荣誉
export const honorDelete = params => { return instance.post(`${schoolUrl}/aio/Honor/honorDelete`, qs.stringify(params)).then(res => res.data); };
//修改荣誉
export const honorUpdate = params => { return instance.post(`${schoolUrl}/aio/Honor/honorUpdate`, qs.stringify(params)).then(res => res.data); };
//获取荣誉数据
export const honorData = params => { return instance.post(`${schoolUrl}/aio/Honor/honorData`, qs.stringify(params)).then(res => res.data); };
//--往届学生成绩统计管理列表
export const getMateList = params => { return instance.post(`${schoolUrl}/aio/Mate/getMateList`, qs.stringify(params)).then(res => res.data); };
//获取年份
export const getEnrollYearList = params => { return instance.post(`${schoolUrl}/aio/Enroll/getEnrollYearList`, qs.stringify(params)).then(res => res.data); };
//新增校友
export const mateOneAdd = params => { return instance.post(`${schoolUrl}/aio/Mate/mateOneAdd`, qs.stringify(params)).then(res => res.data); };
//类型文理科
export const getlistid = params => { return instance.post(`${schoolUrl}/aio/Mate/getlistid`, qs.stringify(params)).then(res => res.data); };
//修改详细信息
export const getOnemateList = params => { return instance.post(`${schoolUrl}/aio/mate/getOnemateList`, qs.stringify(params)).then(res => res.data); };
//删除
export const matePitchDelete = params => { return instance.post(`${schoolUrl}/aio/Mate/matePitchDelete`, qs.stringify(params)).then(res => res.data); };
//修改数据
export const mateOneUpdate = params => { return instance.post(`${schoolUrl}/aio/Mate/mateOneUpdate`, qs.stringify(params)).then(res => res.data); };
//批量下载Exc
export const importfilesrc = params => { return instance.post(`${schoolUrl}/aio/Mate/importfilesrc`, qs.stringify(params)).then(res => res.data); };
//上传Excl
export const exclImport = params => { return instance.post(`${schoolUrl}/aio/Mate/import`, qs.stringify(params)).then(res => res.data); };
//--录取数据管理
export const getEnrollList = params => { return instance.post(`${schoolUrl}/aio/Enroll/getEnrollList`, qs.stringify(params)).then(res => res.data); };
//新增分数
export const enrollInsert = params => { return instance.post(`${schoolUrl}/aio/Enroll/enrollInsert`, qs.stringify(params)).then(res => res.data); };
//获取批次
export const getlistID = params => { return instance.post(`${schoolUrl}/aio/Enroll/getlistID`, qs.stringify(params)).then(res => res.data); };
//删除数据
export const EnrollDelete = params => { return instance.post(`${schoolUrl}/aio/Enroll/EnrollDelete`, qs.stringify(params)).then(res => res.data); };
//修改数据
export const EnrollUpdate = params => { return instance.post(`${schoolUrl}/aio/Enroll/EnrollUpdate`, qs.stringify(params)).then(res => res.data); };
//---校园通知管理
export const srhNoticeList = params => { return instance.post(`${schoolUrl}/aio/Notice/srhNoticeList`, qs.stringify(params)).then(res => res.data); };
//增加校园通知
export const noticeInsert = params => { return instance.post(`${schoolUrl}/aio/Notice/noticeInsert`, qs.stringify(params)).then(res => res.data); };
//删除通知
export const NoticeDelete = params => { return instance.post(`${schoolUrl}/aio/Notice/NoticeDelete`, qs.stringify(params)).then(res => res.data); };
//获取消息详情
export const noticeData = params => { return instance.post(`${schoolUrl}/aio/Notice/noticeData`, qs.stringify(params)).then(res => res.data); };
//修改通知
export const noticeUpdate = params => { return instance.post(`${schoolUrl}/aio/Notice/noticeUpdate`, qs.stringify(params)).then(res => res.data); };
//---首页展示配置
export const getSwitchList = params => { return instance.post(`${schoolUrl}/aio/Switchs/getSwitchList`, qs.stringify(params)).then(res => res.data); };
//修改
export const SwitchAddorUpdate = params => { return instance.post(`${schoolUrl}/aio/Switchs/SwitchAddorUpdate`, qs.stringify(params)).then(res => res.data); };
// 设备管理(由sch_id获取一体机数据)
export const getAioDataBySchid = params => { return instance.post(`${baseUrl}/api/aio.AioData/getAioDataBySchid`, qs.stringify(params)).then(res => res.data); };
// 设备管理(编辑一体机备注)
export const editAioRemark = params => { return instance.post(`${baseUrl}/api/aio.AioData/editAioRemark`, qs.stringify(params)).then(res => res.data); };
// 售后支持(获取问题类型)
export const getSchoolType = params => { return instance.post(`${baseUrl}/api/school.Feedback/getSchoolType`, qs.stringify(params)).then(res => res.data); };
// 售后支持(学校问题提交)
export const feedbackSubmit = params => { return instance.post(`${baseUrl}/api/school.Feedback/FeedbackSubmit`, qs.stringify(params)).then(res => res.data); };


//----------------------------------------------首页
//首页获取新闻列表
export const GetNewsList = params => { return instance.post(`${schoolUrl}/school/SchoolIndex/getIndexNews`, qs.stringify(params)).then(res => res.data); };
//获取首页banner轮播
export const GetBanner = params => { return instance.post(`${schoolUrl}/school/SchoolIndex/getIndexCarousel`, qs.stringify(params)).then(res => res.data); };
//获取首页教师列表
export const GetTeacherList = params => { return instance.post(`${schoolUrl}/school/SchoolIndex/getLessonTchList`, qs.stringify(params)).then(res => res.data); };
//获取课程表
export const GetLessonSchedule = params => { return instance.post(`${schoolUrl}/school/SchoolIndex/LessonSchedule`, qs.stringify(params)).then(res => res.data); };
//获取课程时间表
export const GetLessonTime = params => { return instance.post(`${schoolUrl}/school/SchoolIndex/LessonTime`, qs.stringify(params)).then(res => res.data); };
//获取班级列表
export const GetClassName = params => { return instance.post(`${schoolUrl}/school/SchoolIndex/getScheduleClass`, qs.stringify(params)).then(res => res.data); };
//获取上课情况列表
export const GetClassCase = params => { return instance.post(`${schoolUrl}/school/SchoolIndex/getSignCase`, qs.stringify(params)).then(res => res.data); };
//获取作业列表
export const GetHomeWork = params => { return instance.post(`${schoolUrl}/school/SchoolIndex/getHomeWorkList`, qs.stringify(params)).then(res => res.data); };
//获取作业图表
export const GetHomeWorkPic = params => { return instance.post(`${schoolUrl}/school/SchoolIndex/getHomeWorkChart`, qs.stringify(params)).then(res => res.data); };

// 成长档案 - 学生档案个人资料
export const archivesGetStuInfo = params => { return instance.post(`${schoolUrl}/archives/StudentData/getStuInfo`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 获取学生学期列表
export const archivesGetTermName = params => { return instance.post(`${schoolUrl}/archives/StudentData/getTermName`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 学生基础信息
export const archivesGetBaseMessage = params => { return instance.post(`${schoolUrl}/archives/report/getBaseMessage`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 学生选科科目信息
export const archivesGetSubjectData = params => { return instance.post(`${schoolUrl}/archives/report/getSubjectData`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 学生荣誉信息
export const archivesGetHonerData = params => { return instance.post(`${schoolUrl}/archives/report/getHonerData`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 学生模拟志愿信息
export const archivesGetWillMessage = params => { return instance.post(`${schoolUrl}/archives/report/getWillMessage`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 考试成绩统计
export const archivesGetExamAnalysis = params => { return instance.post(`${schoolUrl}/archives/score/getExamAnalysis`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 学生作业统计
export const archivesGetHomeworkData = params => { return instance.post(`${schoolUrl}/archives/report/getHomeworkData`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 考试类型列表
export const archivesGetExamTypeList = params => { return instance.post(`${schoolUrl}/archives/ExamType/examTypeList`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 删除考试类型
export const archivesDelExamType = params => { return instance.post(`${schoolUrl}/archives/ExamType/delExamType`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 成绩列表
export const archivesGetExamScoreList = params => { return instance.post(`${schoolUrl}/archives/score/scoreList`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 新增考试类型
export const archivesAddExamType = params => { return instance.post(`${schoolUrl}/archives/ExamType/addExamType`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 新增编辑考试类型
export const archivesEditExamType = params => { return instance.post(`${schoolUrl}/archives/ExamType/editExamType`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 导入成绩
export const archivesImportScore = params => { return instance.post(`${schoolUrl}/archives/score/importScore`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 获取学期总结
export const archivesGetTrimSummed = params => { return instance.post(`${schoolUrl}/archives/StudentData/getTrimSummed`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 添加学期总结
export const archivesAddTrimSummed = params => { return instance.post(`${schoolUrl}/archives/StudentData/addTrimSummed`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 查询测评列表
export const archivesEvaluateGetList = params => { return instance.post(`${evaluate}/api/Result/getList`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 查询测评详情
export const archivesEvaluateGetInfo = params => { return instance.post(`${evaluate}/api/Result/getInfo`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 查询测评结果
export const archivesResult = params => { return instance.get(`${evaluate}/api/Result/getInfo`, { params: params }); };
// 成长档案 - 判断是否可以下载模版
export const archivesCheckSubjectSet = params => { return instance.post(`${schoolUrl}/archives/score/checkSubjectSet`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 下载模版
export const archivesScoreExcelTemplet = `${schoolUrl}/archives/score/scoreExcelTemplet`;
// 成长档案 - 当前学年学期
export const archivesGetNowTerm = params => { return instance.post(`${schoolUrl}/archives/Exam/getNowTerm`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 历史数据的学年学期
export const archivesGetHistoryTerm = params => { return instance.post(`${schoolUrl}/archives/Exam/getHistoryTerm`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 考试列表
export const archivesExamList = params => { return instance.post(`${schoolUrl}/archives/Exam/examList`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 新增考试
export const archivesExamAddExam = params => { return instance.post(`${schoolUrl}/archives/Exam/addExam`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 删除考试
export const archivesExamDelExam = params => { return instance.post(`${schoolUrl}/archives/Exam/delExam`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 根据学年年段获取班级
export const getClassByTermSection = params => { return instance.post(`${schoolUrl}/archives/Exam/getClassByTermSection`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 考试的成绩列表
export const scoreListByExam = params => { return instance.post(`${schoolUrl}/archives/score/scoreListByExam`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 编辑成绩
export const archivesEditScore = params => { return instance.post(`${schoolUrl}/archives/score/editScore`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 学生的成绩列表
export const archivesScoreListByStu = params => { return instance.post(`${schoolUrl}/archives/score/scoreListByStu`, qs.stringify(params)).then(res => res.data); };
// 成长档案 - 实践活动- 获取
export const myActivityDetail = params => {
	return instance.get(`${schoolUrl}/student/activity/myActivityDetail`, {
		params: params
	});
};
// 成长档案 - 是否显示周哈或者四维
export const archivesShowJohari = params => {
	return instance.post(`${schoolUrl}/api/index/isShowJohari`, qs.stringify(params)).then(res => res.data);
};
// 成长档案 - 学生四维评价
export const archivesFourDim= params => {
	return instance.post(`${schoolUrl}/archives/StudentData/getFourDim`, qs.stringify(params)).then(res => res.data);
};
// 成长档案 - 学生周哈里窗
export const archivesJohariWindow = params => {
	return instance.post(`${schoolUrl}/archives/StudentData/getJohari`, qs.stringify(params)).then(res => res.data);
};



// 学校老师和学生授权数量统计查询
export const getAuthCount = params => { return instance.post(`${schoolUrl}/api/auth_user/getAuthCount`, qs.stringify(params)).then(res => res.data); };
// 查询可授权的人数限制
export const getAuthCountLimit = params => { return instance.post(`${schoolUrl}/api/auth_user/getAuthCountLimit`, qs.stringify(params)).then(res => res.data); };
// 用户授权数量查询
export const getAuthDetail = params => { return instance.post(`${schoolUrl}/api/auth_user/getAuthDetail`, qs.stringify(params)).then(res => res.data); };
// 用户授权激活
export const getAuthupdate = params => { return instance.post(`${schoolUrl}/api/auth_user/updateAuth`, qs.stringify(params)).then(res => res.data); };

/* **************消息中心************** */
//通知详情
export const NoticeDetail = params => {
	return instance.post(`${eduUrl}/edu/api/School/NoticeDetail`, qs.stringify(params)).then(res => res.data);
};
//通知列表
export const NoticeList = params => {
	return instance.post(`${eduUrl}/edu/api/School/NoticeList`, qs.stringify(params)).then(res => res.data);
};

/* **************数据中心************** */
// 基础数据 - 学生
export const getStudentData = params => {
	return instance.post(`${eduUrl}/school/school/DataCenter/getStudentData`, qs.stringify(params)).then(res => res.data);
};
// 基础数据 - 教师
export const getTeacherData = params => {
	return instance.post(`${eduUrl}/school/school/DataCenter/getTeacherData`, qs.stringify(params)).then(res => res.data);
};
// 家长数据 - 家长用户列表
export const dataCentreGetList = params => {
	return instance.post(`${eduUrl}/school/parent/DataCentre/getList`, qs.stringify(params)).then(res => res.data);
};
// 家长数据 - 新增关注家长
export const dataCentreAddFocusList = params => {
	return instance.post(`${eduUrl}/school/parent/DataCentre/addFocusList`, qs.stringify(params)).then(res => res.data);
};
// 家长数据 - 取消关注家长
export const dataCentreDelFocusList = params => {
	return instance.post(`${eduUrl}/school/parent/DataCentre/delFocusList`, qs.stringify(params)).then(res => res.data);
};
// 家长数据 - 导出家长信息 /parent/DataCentre/export
export const dataCentreExport = `${eduUrl}/school/parent/DataCentre/export`
// 家长数据 - 数据总表
export const dataCentreGetData = params => {
	return instance.post(`${eduUrl}/school/parent/DataCentre/getData`, qs.stringify(params)).then(res => res.data);
};
// 家长数据 - 家长数据总表
export const dataCentreGetViews = params => {
	return instance.post(`${eduUrl}/school/parent/DataCentre/getViews`, qs.stringify(params)).then(res => res.data);
};
// 家长数据 - 关注家长列表
export const dataCentreGetFocusList = params => {
	return instance.post(`${eduUrl}/school/parent/DataCentre/getFocusList`, qs.stringify(params)).then(res => res.data);
};
// 家长数据 - 读取家长模块用户自定义
export const dataCentreGetPersonalizedMenulist = params => {
	return instance.post(`${eduUrl}/school/parent/DataCentre/get_personalized_menu_list`, qs.stringify(params)).then(res => res.data);
};
// 家长数据 - 更改家长模块用户自定义
export const dataCentreEditPersonalizedMenulist = params => {
	return instance.post(`${eduUrl}/school/parent/DataCentre/edit_personalized_menu_list`, qs.stringify(params)).then(res => res.data);
};

// 学校对院校统计查询
export const collegeStatistics = params => {
	return instance.post(`${college}/index/SchoolStatistics/CollegeStatistics`, qs.stringify(params)).then(res => res.data);
};
// 学校对专业统计查询
export const majorStatistics = params => {
	return instance.post(`${college}/index/SchoolStatistics/MajorStatistics`, qs.stringify(params)).then(res => res.data);
};
// 学校对职业统计查询
export const occupationStatistics = params => {
	return instance.post(`${college}/index/SchoolStatistics/OccupationStatistics`, qs.stringify(params)).then(res => res.data);
};
//
/* **************社会实践************** */
//社会实践 - 活动列表
export const getActiveList = params => {
	return instance.post(`${baseUrl}/api/active.ActiveManage/getActiveList`, qs.stringify(params)).then(res => res.data);
};
//社会实践 - 活动详情
export const getActiveInfo = params => {
	return instance.post(`${baseUrl}/api/active.ActiveManage/getActiveInfo`, qs.stringify(params)).then(res => res.data);
};
//社会实践 - 我的活动
export const getMyActive = params => {
	return instance.post(`${baseUrl}/api/active.ActiveManage/myActive`, qs.stringify(params)).then(res => res.data);
};

//添加视频转码
export const videoTranscoding = params => {
	return instance.post(`${qiniuSdk}/api/qiniu/transcoding`, qs.stringify(params)).then(res => res.data);
};
//视频播放 url
export const videoPlay = params => {
	return instance.post(`${qiniuSdk}/api/qiniu/getVideoUrl`, qs.stringify(params)).then(res => res.data);
};

/****** 家长管理 ******/
// 家长通知列表
export const getParentNoticeList = params => {
	return instance.post(`${schoolUrl}/parent/Notice/getNoticeList`, qs.stringify(params)).then(res => res.data);
};
// 获取通知列表
export const getParentNoticeData = params => {
	return instance.post(`${schoolUrl}/parent/Notice/noticeData`, qs.stringify(params)).then(res => res.data);
};
// 删除通知
export const getParentNoticeDelete = params => {
	return instance.post(`${schoolUrl}/parent/Notice/NoticeDelete`, qs.stringify(params)).then(res => res.data);
};
// 新增通知
export const getParentNoticeInsert = params => {
	return instance.post(`${schoolUrl}/parent/Notice/noticeInsert`, qs.stringify(params)).then(res => res.data);
};
// 获取编辑数据
export const getParentNoticeDetail = params => {
	return instance.post(`${schoolUrl}/parent/Notice/getNoticeDetail`, qs.stringify(params)).then(res => res.data);
};
// 修改通知
export const getParentNoticeUpdate = params => {
	return instance.post(`${schoolUrl}/parent/Notice/noticeUpdate`, qs.stringify(params)).then(res => res.data);
};
// 邀请函列表
export const getInvitationList = params => {
	return instance.post(`${schoolUrl}/parent/Invitation/getInvitationList`, qs.stringify(params)).then(res => res.data);
};
// 删除邀请
export const getInvitationDelete = params => {
	return instance.post(`${schoolUrl}/parent/Invitation/invitationDelete`, qs.stringify(params)).then(res => res.data);
};
// 获取邀请列表(修改的详情).
export const getInvitationDetail = params => {
	return instance.post(`${schoolUrl}/parent/Invitation/getInvitationDetail`, qs.stringify(params)).then(res => res.data);
};
// 新增邀请
export const invitationInsert = params => {
	return instance.post(`${schoolUrl}/parent/Invitation/invitationInsert`, qs.stringify(params)).then(res => res.data);
};
// 修改邀请
export const invitationUpdate = params => {
	return instance.post(`${schoolUrl}/parent/Invitation/invitationUpdate`, qs.stringify(params)).then(res => res.data);
};
// 邀请函下具体可选名单（添加家长列表）
export const invitationParentById = params => {
	return instance.post(`${schoolUrl}/parent/Invitation/invitationParentById`, qs.stringify(params)).then(res => res.data);
};
// 当前家长列表
export const getInvitationFocusList = params => {
	return instance.post(`${schoolUrl}/parent/Invitation/getFocusList`, qs.stringify(params)).then(res => res.data);
};
// 职业类型列表
export const occupationTypeList = params => {
	return instance.post(`${student2}/api/College/occupationTypeList`, qs.stringify(params)).then(res => res.data);
};
// 类型列表下的职业名称
export const invitationOccupationList = params => {
	return instance.post(`${student2}/api/College/occupationList`, qs.stringify(params)).then(res => res.data);
};

// 首页基础数据
export const getSchBasicData = params => {
	return instance.post(`${schoolUrl}/school/SchoolIndexV2/getSchBasicData`, qs.stringify(params)).then(res => res.data);
};
// 首页选科组合-单科统计
export const subjectStatistics = params => {
	return instance.post(`${schoolUrl}/school/SchoolIndexV2/subjectStatistics`, qs.stringify(params)).then(res => res.data);
};

// 获取系统信息
export const getSystemInfo = params => {
	return instance.post(`${baseUrl}/data/Intro/getSystemInfo`, qs.stringify(params)).then(res => res.data);
};

// 校友数据列表
export const getAlumnusList = params => {
	return instance.post(`${college}/index/collegeAdmin/getAlumnusList`, qs.stringify(params)).then(res => res.data);
};
// 校友个人信息
export const getAlumnusInfo = params => {
	return instance.post(`${college}/index/collegeAdmin/getAlumnusInfo`, qs.stringify(params)).then(res => res.data);
};
// 专业分数线
export const getWebCollegeScoreInfo = params => {
	return instance.post(`${college}/index/collegeAdmin/getWebCollegeScoreInfo`, qs.stringify(params)).then(res => res.data);
};
// 专业分数线.省
export const searchItem = params => {
	return instance.post(`${college}/index/collegeAdmin/searchItem`, qs.stringify(params)).then(res => res.data);
};
// 专业分数线.分类
export const getAioScience = params => {
	return instance.post(`${college}/index/collegeAdmin/getAioScience`, qs.stringify(params)).then(res => res.data);
};
// 专业分数线.年
export const getYear = params => {
	return instance.post(`${college}/index/collegeAdmin/getYear`, qs.stringify(params)).then(res => res.data);
};
// 获取院校分数图表V41
export const getCollegeScoreTableV41 = params => {
	return instance.post(`${college}/index/CollegeScore/getCollegeScoreTableV41`, qs.stringify(params)).then(res => res.data);
};
// 获取科类
export const getCollegeScoreScienceV41 = params => {
	return instance.post(`${college}/index/CollegeScore/getCollegeScoreScienceV41`, qs.stringify(params)).then(res => res.data);
};
// 获取批次
export const getCollegeScoreBatchV41 = params => {
	return instance.post(`${college}/index/CollegeScore/getCollegeScoreBatchV41`, qs.stringify(params)).then(res => res.data);
};

export const result = params => {
	return instance.get(`${evaluate}/api/Result/getInfo`, {
		params: params
	});
};