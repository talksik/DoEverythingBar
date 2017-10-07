function getInformation(information)
{
    var elements = information.split(" ")[];

    date = elements[1];
    datePortion = "20" + date.substring(6) + "-" + date.substring(0, 2) + "-" + date.substring(3, 5);

    militaryTime = true;
    for (var x = 0; x < elements.length(), x++)
    {
        if elements[x].toLowerCase() == "pm" || elements[x].toLowerCase() == "am"
        {
            militaryTime = false;
        }
    }
    timePortion1 = "";
    timePortion2 = "";
    if isMilitaryTime
    {
        timePortion1 = elements[2] + ":00-07:00";
        timePortion2 = elements[3] + ":00-07:00";
    }
    else
    {
        if elements[2].substring(5).toLowerCase() == "am"
        {
            timePortion1 = elements[2].substring(0, 5) + ":00-07:00";
        }
        else
        {
            hour = parseInt(elements[2].substring(0, 2)) + 12;
            timePortion1 = hour + elements[2].substring(2, 5);
        }

        if elements[3].substring(5).toLowerCase() == "am"
        {
            timePortion2 = elements[3].substring(0, 5) + ":00-07:00";
        }
        else
        {
            hour = parseInt(elements[3].substring(0, 2)) + 12;
            timePortion2 = hour + elements[3].substring(2, 5);
        }
    }
    return [elements[0], datePortion + "T" + timePortion1, datePortion + "T" + timePortion2];
}

function makeEvent(information)
{
    fields = getInformation(information);

    var event = {
      'summary': fields[0],
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': fields[1],
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': fields[2],
        'timeZone': 'America/Los_Angeles'
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      'attendees': [
        {'email': 'lpage@example.com'},
        {'email': 'sbrin@example.com'}
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      }
    };

    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });

    request.execute(function(event) {
      appendPre('Event created: ' + event.htmlLink);
    });
}
