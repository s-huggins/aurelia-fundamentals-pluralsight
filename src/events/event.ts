import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventModel } from '../models/event-model';

@autoinject()
export class Event {
  public event: EventModel;
  public eventDetailUrl: string;

  constructor(private readonly _router: Router) {}

  private activate(event: EventModel) {
    this.event = event;

    this.eventDetailUrl = this._router.generate('EventDetail', {
      eventId: event.id
    });
  }
}
