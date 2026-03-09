jQuery(document).ready(function($) {
  $(function() {
    var eventContent = [];
    var popObj = $('#eventPop');
    var popBg = popObj.find('#popBg');
    var closeButton = popObj.find('#closeButton');
    var eveName = popObj.find('#eveName');
    var eveDate = popObj.find('#eveDate');
    var eveTime = popObj.find('#eveTime');
    var eveDesc = popObj.find('#eveDesc');

    function eventDetailPop(name, start, end, desc){
      eveName.html(name);
      eveDate.html(start.slice(0,4) + '年' + start.slice(5,7) + '月' + start.slice(8,10) + '日');
      if(desc != undefined && desc != null){
        eveDesc.html(desc);
      }else{
        eveDesc.html('');
      }
      var startTime = start.slice(11,16);
      var endTime = end.slice(11,16);
      if(startTime != undefined && startTime != null && startTime.length > 3){
        console.log(startTime.length);
        eveTime.html(startTime + '~' + endTime);
      }else{
        eveTime.html('終日');
      }
      /*eveTime.html();*/
      setTimeout(function() {
        popObj.addClass('open');
      }, 100);
    }
    function factoryCalendarEdit(target){
      $.each(target.find('.fc-event-container .fc-title'),function(index){
        eventContent[index] = $(this).text();
        if(eventContent[index] == '休業日' || eventContent[index] == '定休日'){
          $(this).addClass('close');
        }else if(eventContent[index] == '土曜日営業未定' || eventContent[index] == '営業未定' ){
          $(this).addClass('short');
        }else if(eventContent[index] == '短縮営業日' || eventContent[index] == '時間短縮営業'){
          $(this).addClass('short');
        }
      });
    }

    function init(){
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,',
          center: 'next',
          right: 'title'
        },
        displayEventTime: false,
        googleCalendarApiKey: 'AIzaSyCou0PcnugmOWjYpghfw_p8pUJkmlXjVjc',
        firstDays:1,
        events: 'meriyasukun.member@gmail.com',
        eventClick: function(event) {
          console.log(event);
          eventDetailPop(event.title, event.start._i, event.end._i, event.description);
          return false;
        },
        loading: function(bool) {
          $('#loading').toggle(bool);
          setTimeout(function() {
            factoryCalendarEdit($('#calender'));
          }, 1200);
        }
      });
      setTimeout(function() {
        factoryCalendarEdit($('#calender'));
      }, 1200);
      popBg.on({
        'click': function(){
          popObj.removeClass('open');
        }
      });
      closeButton.on({
        'click': function(){
          popObj.removeClass('open');
        }
      });
    }

    init();

  });
});
