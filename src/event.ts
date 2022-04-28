import { EventModel } from 'models/event-model';

export class Event {
  public item: EventModel;

  private activate(bindingContext: EventModel) {
    this.item = bindingContext;
  }
}
