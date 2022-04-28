import { All, autoinject, inject, Lazy } from 'aurelia-framework';
import { EventModel } from 'models/event-model';
import { DataCache } from 'services/data-cache';
import { MrLazy } from 'services/mr-lazy';
import { PlugIn } from 'services/plugin';

// @autoinject()
@inject(DataCache, Lazy.of(MrLazy), All.of(PlugIn))
export class EventsList {
  public events: EventModel[];

  constructor(
    private readonly _dataCache: DataCache,
    private readonly _mrLazy: () => MrLazy,
    private readonly _plugIns: PlugIn[]
  ) {
    this.events = [
      { id: 1, title: 'Aurelia Fundamentals' },
      { id: 2, title: 'Advanced Topics in Aurelia' }
    ];

    console.log(_dataCache.data);

    this.runPlugIns();
  }

  public createAndUseMrLazy() {
    this._mrLazy().lazeAbout();
  }

  private runPlugIns() {
    this._plugIns.forEach(p => p.run());
  }
}
