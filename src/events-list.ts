import { EventModel } from 'models/event-model';

export class EventsList {
  public events: EventModel[];

  constructor() {
    this.events = [
      { id: 1, title: 'Aurelia Fundamentals' },
      { id: 2, title: 'Advanced Topics in Aurelia' }
    ];
  }
}
