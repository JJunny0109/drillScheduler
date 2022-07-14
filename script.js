const dayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토'];
const differenceInDays = [-35, 5, 8, 7, 6, 1, 7, 1];
const todoList = [  'D-35일: 훈련 대상자 판단 ',
                    'D-30일 : 훈련일정 자율선택 홍보(메일/문자 발송) / 훈련안내 탑재',
                    'D-22일 : 훈련일정 자율선택 결산 / 훈련일정 편성 / 모바일 송달',
                    'D-15일 : 통지서 메일 발송 / 문자 발송 / 등기ㆍ우편 발송 ',
                    'D-9일 : 통지서 전달 법정기일 ',
                    'D-8일 : 미교부 보고 / 사유서 작성(보충교육) ',
                    'D-1일 : 훈련참석 독려 문자 발송 ',
                    'D-Day : 훈련결산 / 당일 사고자 보고'] ;

function getDrillInfo(){
    let x = document.getElementById("drillInfoForm");
     //form에 해당하는 값들 배열형식으로 가져오기
    const drillInfo = {
        name : x.elements[0].value,
        type : x.elements[1].value,
        date : new Date(x.elements[2].value.substring(0,4) + "/" + x.elements[2].value.substring(5,7) + "/"
        + x.elements[2].value.substring(8))
    }
    console.log(drillInfo);
    document.getElementById("calcResult1").innerHTML = drillInfo.date.getFullYear() + '.'
    + (drillInfo.date.getMonth()+1) + '.' + drillInfo.date.getDate() + '(' + dayOfTheWeek[drillInfo.date.getDay()]
    + ')' + ' ' + drillInfo.name; + "<br/>" ;
    document.getElementById("calcResult2").innerHTML = "";
    
    for (i=0;i<8;i++) {
        drillInfo.date.setDate(drillInfo.date.getDate() + differenceInDays[i]);
        document.getElementById("calcResult2").innerHTML += drillInfo.date.getFullYear() + '.' 
        + (drillInfo.date.getMonth()+1) + '.' + drillInfo.date.getDate() + '(' + dayOfTheWeek[drillInfo.date.getDay()]
        + ')' + ' ' + todoList[i] + "<br/>" ;
    }



}