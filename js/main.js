const dayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토'];
const differenceInDays = [-35, 5, 8, 7, 7, 7, 1];
const todoList = [  '훈련 대상자 판단 ',
                    '훈련일정 자율선택 홍보(메일/문자 발송) / 훈련안내 탑재',
                    '훈련일정 자율선택 결산 / 훈련일정 편성 / 모바일 송달',
                    '통지서 메일 발송 / 문자 발송 / 등기ㆍ우편 발송 ',
                    '통지서 전달 법정기일 / 미교부 보고 / 사유서 작성(보충교육) ',
                    '훈련참석 독려 문자 발송 ',
                    '훈련결산 / 당일 사고자 보고'] ;
const dDay = ['D-35', 'D-30', 'D-22', 'D-15', 'D-8', 'D-1', 'D-Day'];
let drillEvents = [];

function getDrillInfo(){
    let x = document.getElementById("drillInfoForm");
     //form에 해당하는 값들 배열형식으로 가져오기
    const drillInfo = {
        name : x.elements[0].value,
        type : x.elements[1].value,
        date : new Date(x.elements[2].value.substring(0,4) + "/" + x.elements[2].value.substring(5,7) + "/"
        + x.elements[2].value.substring(8))
    }

    drillEvents = [];
    document.getElementById("calcResult1").innerHTML = drillInfo.date.getFullYear() + '.'
    + (drillInfo.date.getMonth()+1) + '.' + drillInfo.date.getDate() + '(' + dayOfTheWeek[drillInfo.date.getDay()]
    + ')' + ' ' + drillInfo.name; + "<br/>" ;
    document.getElementById("calcResult2").innerHTML = "";
    
    for (i=0;i<todoList.length;i++) {
        drillInfo.date.setDate(drillInfo.date.getDate() + differenceInDays[i]);
        console.log(drillInfo.date);
        let y = new Date(drillInfo.date.getFullYear() + "/" + (drillInfo.date.getMonth() + 1) + "/" + drillInfo.date.getDate() ) ;
        if(i == 1 || i == 2 || i == 3 || i == 5 || i == 6){
            drillEvents.push(
                {title: drillInfo.name + '(' + dDay[i] + ')' , start: y, allDay: true, color: drillInfo.type, textColor:'black', description: todoList[i],},
            );
        }
        document.getElementById("calcResult2").innerHTML += drillInfo.date.getFullYear() + '.' 
        + (drillInfo.date.getMonth()+1) + '.' + drillInfo.date.getDate() + '(' + dayOfTheWeek[drillInfo.date.getDay()]
        + ') ' + dDay[i] + ': ' + todoList[i] + "<br/>" ;
    }
    console.log(drillEvents);
}

function addSchedule(){
    calendar.addEventSource(drillEvents);
}

function saveEventSource(){
    if(confirm('이벤트를 저장하시겠습니까?') == true){
        localStorage.setItem('savedEvents', JSON.stringify(calendar.getEvents()));
        location.reload();
    }
}

function deleteEventSource(){
    if(confirm('모든 이벤트를 삭제하시겠습니까?') == true){
        localStorage.removeItem('savedEvents');
        location.reload();
    }
}

function getToday(uglyDate){
    let date = new Date(uglyDate);
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return month + "/" + day + "/" + year ;
}

function exportEventSource(){
    cal = ics();
    let eventStartDate = null;
    let eventEndDate = null;
    for(i=0;i<savedEventSource.length;i++){
        if(savedEventSource[i].end == undefined){
            eventStartDate = getToday(savedEventSource[i].start);
            cal.addEvent(savedEventSource[i].title, savedEventSource[i].extendedProps.description, '', eventStartDate, eventStartDate);
        }
        else{
            eventStartDate = getToday(savedEventSource[i].start);
            eventEndDate = getToday(savedEventSource[i].end);
            cal.addEvent(savedEventSource[i].title, savedEventSource[i].extendedProps.description, '', eventStartDate, eventEndDate);
        }
    }
    cal.download('훈련일정');
}