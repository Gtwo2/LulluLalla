function yyyymmdd(date) {
    var year = date.getFullYear().toString().substring(0, 4);
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    
    return year + month + day;
}

const today = new Date();


let plus = 0;
let date_string = yyyymmdd(new Date(today.setDate(today.getDate() + plus)));
console.log(date_string);

const api_key = "0ee0c17caaa7492d873adc0bb8e618e1" //넘어가주세요

let school_code = "7812097";
let location_code = "K10";

let grade = 1;
let cl_ass = 8;
const lunch_url = `https://open.neis.go.kr/hub/mealServiceDietInfo?TYPE=JSON&ATPT_OFCDC_SC_CODE=${location_code}&SD_SCHUL_CODE=${school_code}&KEY=${api_key}&MLSV_YMD=${date_string}`;
const time_url = `https://open.neis.go.kr/hub/misTimetable?Type=json&ATPT_OFCDC_SC_CODE=${location_code}&SD_SCHUL_CODE=${school_code}&GRADE=${grade}&CLASS_NM=${cl_ass}&KEY=${api_key}&ALL_TI_YMD=${date_string}`

fetch(lunch_url)
  .then(response => {
    if (!response.ok) {
      throw new Error('네트워크 오류');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('오류났으니까 김동주한테 문의해주세요. /급식정보오류/', error);
  });

  fetch(time_url)
  .then(response => {
    if (!response.ok) {
      throw new Error('네트워크 오류');
    }
    return response.json();
  })
  .then(data => {
    const itrtCntntList = data.misTimetable[1].row.map(item => item.ITRT_CNTNT);

    console.log(itrtCntntList);
  })
  .catch(error => {
    console.error('오류났으니까 김동주한테 문의해주세요. /시간표오류/', error);
  });
