let calendar = null;
let eventStartDay = null;
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('drillScheduleCalendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'title',
        center: 'dayGridMonth,listMonth',
        right: 'prev,today,next',
      },
      initialView: 'dayGridMonth',
      editable: true, // 수정 가능?
      selectable: true,
      locale: 'ko',
      eventClick: function(info){
        if(confirm(info.event.title + " 일정을 삭제하시겠습니까?" + '\n메모 : ' + info.event.extendedProps.description)){
          // 확인 클릭 시
          info.event.remove();
          alert(info.event.title + ' 이/가 삭제되었습니다')
      }
      },
      dayMaxEvents: true,
      dateClick: function(info) {
        eventStartDay = info.dateStr ;
        modalOpen();
      },
      eventDidMount: function(info) {
        tippy(info.el, {
            content:  info.event.extendedProps.description,//이벤트 디스크립션을 툴팁으로 가져옵니다. 
        });
      },
    });
    calendar.render();
  });