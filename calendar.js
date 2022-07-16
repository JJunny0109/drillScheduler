let calendar = null;
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
    });
    calendar.render();
  });