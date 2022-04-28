export interface IEvent {
  id: number;
  title: string;
}

export class EventModel implements IEvent {
  public id: number;
  public title: string;
}
