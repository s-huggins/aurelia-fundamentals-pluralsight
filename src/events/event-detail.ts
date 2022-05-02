import { autoinject } from 'aurelia-framework';
import { RouteConfig, Router } from 'aurelia-router';
import { EventModel } from '../models/event-model';
import { DataRepository } from '../services/data-repository';

@autoinject()
export class EventDetail {
  public event: EventModel;

  constructor(private readonly _data: DataRepository) {}

  private async activate(params: any, routeConfig: RouteConfig) {
    this.loadEvent(+params.eventId);
  }

  private async loadEvent(eventId: number): Promise<void> {
    this.event = await this._data.getEvent(eventId);
  }
}
