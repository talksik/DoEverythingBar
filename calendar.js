console.log("hey");

function getInformation(information)
{
    var elements = information.split(" ");
    console.log(elements);

    date = elements[1];
    console.log(date);
    datePortion = "20" + date.substring(6) + "-" + date.substring(0, 2) + "-" + date.substring(3, 5);
    console.log(datePortion);

    militaryTime = true;
    for (var i = 0; i < elements.length; i++)
    {
        if (elements[i].toLowerCase() === "pm" || elements[i].toLowerCase() === "am")
        {
            militaryTime = false;
        }
    }
    console.log(militaryTime);

    timePortion1 = "";
    timePortion2 = "";
    if (militaryTime)
    {
        timePortion1 = elements[2] + ":00-07:00";
        timePortion2 = elements[3] + ":00-07:00";
        console.log(timePortion1);
        console.log(timePortion2);
    }
    else
    {
        if (elements[2].substring(5).toLowerCase() === "am")
        {
            timePortion1 = elements[2].substring(0, 5) + ":00-07:00";
        }
        else
        {
            hour = parseInt(elements[2].substring(0, 2)) + 12;
            timePortion1 = hour + elements[2].substring(2, 5);
        }

        if (elements[3].substring(5).toLowerCase() === "am")
        {
            timePortion2 = elements[3].substring(0, 5) + ":00-07:00";
        }
        else
        {
            hour = parseInt(elements[3].substring(0, 2)) + 12;
            timePortion2 = hour + elements[3].substring(2, 5);
        }
    }
    console.log([elements[0], datePortion + "T" + timePortion1, datePortion + "T" + timePortion2]);
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

getInformation("Bob's 01/24/24 12:33AM 1:23AM");
