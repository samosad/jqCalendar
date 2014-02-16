var myCal = {
    days: $('.day'),

    data: {
        '3': '16371',
        '4': '17602',
        '5': '15461',
        '6': '15357',
        '7': '3484',
        '10': '15862',
        '11': '16442',
        '12': '14145',
        '13': '13480',
        '14': '3343',
        '17': '14180',
        '18': '15314',
        '19': '12960',
        '20': '12742',
        '21': '2589',
        '24': '12003',
        '25': '14677',
        '26': '12112',
        '27': '11600',
        '28': '2538'
    },

    setDayHeight: function() {
        'use strict';

        myCal.days.css('height', myCal.days.css('width')).popover('hide');
    },

    getMeetinfsWord: function(meetingsNum) {
        'use strict';

        var meetingsStr = String(meetingsNum),
            meetingsWord = '';

        switch(meetingsStr[meetingsStr.length - 1]) {
        case '1':
            meetingsWord = 'заседание';
            break;

        case '2':
        case '3':
        case '4':
            meetingsWord = 'заседания';
            break;

        default:
            meetingsWord = 'заседаний';
        }

        return meetingsWord;
    },

    getWeekDayWord: function(dayNum) {
        'use strict';

        var weekDays = [
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница'
        ];

        return weekDays[dayNum % weekDays.length];
    },

    updateDaysInfo: function() {
        'use strict';

        var ii = 0;

        $.each(myCal.data, function(key, value) {
            var meetingsWord = myCal.getMeetinfsWord(value),
                $day = $(myCal.days[ii]);

            $day
              .find('.day_num')
              .text(parseInt(key, 10));

            $day
              .find('.meetings_number')
              .text(parseInt(value, 10));
            
            $day
              .find('.meetings_word')
              .text(meetingsWord);

            ii++;
        });
    },

    initDaysPopovers: function() {
        'use strict';

        var ii = 0;

        myCal.days.popover('destroy');

        $.each(myCal.data, function(key, value) {
            var meetingsWord = myCal.getMeetinfsWord(value),
                weekDay = myCal.getWeekDayWord(ii),
                month = 'января',
                $day = $(myCal.days[ii]),
                options = {},
                content = '';

            content += '<p>Назначено: ' + value + ' ' + meetingsWord + '</p>';
            content += '<button class="btn btn-sm btn-success">подписаться</button>';

            options = {
                'html': true,
                'placement': 'auto bottom',
                'title': weekDay + ', ' + key + ' ' + month,
                'content': content,
                'container': 'body'
            };

            $day.popover(options);

            ii++;
        });
    }
};



$(document).ready(function() {
    'use strict';

    window.onresize = myCal.setDayHeight;

    myCal.setDayHeight();

    myCal.updateDaysInfo();

    myCal.initDaysPopovers();
    
    myCal.days.hover(function() {
        $(this).toggleClass('active');
    });

});