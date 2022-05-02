import { All, autoinject, inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventModel } from '../models/event-model';
import { DataCache } from '../services/data-cache';
import { DataRepository, EventFilter } from '../services/data-repository';
import { MrLazy } from '../services/mr-lazy';
import { PlugIn } from '../services/plugin';

// @autoinject()
@inject(DataRepository, Router, Lazy.of(MrLazy), All.of(PlugIn))
export class EventsList {
  public events: EventModel[];

  constructor(
    private readonly _data: DataRepository,
    private readonly _router: Router,
    private readonly _mrLazy: () => MrLazy,
    private readonly _plugIns: PlugIn[]
  ) {
    this.runPlugIns();
  }

  public goToDiscussion(): void {
    this._router.navigate('#/discussion');
  }

  private activate(params: QueryStringParams) {
    this.loadEvents(EventFilter.fromParams(params));
  }

  private async loadEvents(filter: EventFilter): Promise<void> {
    this.events = await this._data.getEvents(filter);
  }

  public createAndUseMrLazy() {
    this._mrLazy().lazeAbout();
  }

  private runPlugIns() {
    this._plugIns.forEach(p => p.run());
  }
}

type QueryStringParams = {
  speaker?: string;
  topic?: string;
};
