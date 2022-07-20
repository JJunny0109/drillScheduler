function modalOpen(){
    modalAddEvent.style.display = "flex"
    document.body.style.overflow = "hidden";
    return false;
}

function modalClose(){
    modalAddEvent.style.display = "none"
    document.getElementById("modalAddEventForm").reset();
    document.body.style.overflow = "unset";
    return false;
}

function addNewEvent(){
    let modalAddEventForm = document.getElementById("modalAddEventForm");
     //form에 해당하는 값들 배열형식으로 가져오기
    let newEvent = {
        title: modalAddEventForm.elements[0].value,
        backgroundColor: modalAddEventForm.elements[1].value,
        textColor:'black',
        borderColor:'#FFFFFF',
        description: modalAddEventForm.elements[2].value,
        start: eventStartDay,
        allDay: true,
    }
    calendar.addEvent(newEvent);
    modalClose();
}