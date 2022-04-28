import { autoinject } from 'aurelia-framework';
import { EventModel } from 'models/event-model';
import { DataCache } from 'services/data-cache';

@autoinject()
export class Event {
  public item: EventModel;

  constructor(private readonly _dataCache: DataCache) {
    this._dataCache.data.push('b');
  }

  private activate(bindingContext: EventModel) {
    this.item = bindingContext;
  }
}
