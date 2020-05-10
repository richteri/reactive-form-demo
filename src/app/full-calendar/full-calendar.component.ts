import { Component, OnInit, ViewChild } from '@angular/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendar } from 'primeng';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss']
})
export class FullCalendarComponent implements OnInit {

  @ViewChild('calendar')
  calendar: FullCalendar;

  private events$ = of([
    {
      'start': '2020-05-11 10:00:00',
      'end': '2020-05-11 14:00:00'
    },
    {
      'start': '2020-05-12 12:00:00',
      'end': '2020-05-12 16:00:00'
    },
    {
      'start': '2020-05-13 10:00:00',
      'end': '2020-05-13 14:00:00'
    },
  ]);

  events: any[];
  options: any;

  ngOnInit() {
    this.options = {
      plugins: [timeGridPlugin],
      defaultView: 'timeGridWeek',
      defaultDate: '2020-05-11',
      allDaySlot: false,
      firstDay: 1,
      minTime: '08:00:00',
      maxTime: '18:00:00',
      header: {
        left: '',
        center: 'title',
      }
    };

    this.events$.pipe(tap(events => {
      this.options.minTime = events
        .map(event => event.start.slice(11))
        .reduce((aggr, curr) => curr < aggr ? curr : aggr);
      this.options.maxTime = events
        .map(event => event.end.slice(11))
        .reduce((aggr, curr) => curr > aggr ? curr : aggr);
    })).subscribe(events => this.events = events);
  }
}
