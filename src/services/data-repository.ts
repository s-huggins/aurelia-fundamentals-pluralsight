import * as moment from 'moment';
import { EventModel } from '../models/event-model';
import { eventsData } from './event-data';
import delay from '../utils/delay';

export class DataRepository {
  private static readonly SIMULATED_DELAY = 2000;

  private events: EventModel[];

  constructor() {}

  public async getEvents(searchFilter?: EventFilter): Promise<EventModel[]> {
    await this.loadEvents();

    let events = this.events;
    if (searchFilter) {
      events = searchFilter.filter(events);
    }
    return events;
  }

  public async getEvent(id: number): Promise<EventModel> {
    await this.loadEvents();

    return this.events.find((event: EventModel) => event.id === id);
  }

  private async loadEvents(): Promise<void> {
    if (!this.events) {
      await delay(DataRepository.SIMULATED_DELAY);

      const events = [...eventsData];
      this.cleanData(events);

      this.events = events;
    }
  }

  private cleanData(events: EventModel[]): void {
    for (const event of events) {
      event.dateTime = moment(event.dateTime).format('MM/DD/YYYY HH:mm');
    }
  }
}

type FilterKey = 'speaker' | 'topic';
type FilterParams = {
  [key in FilterKey]?: string;
};

export class EventFilter {
  public static readonly Clear = new EventFilter();

  public static fromParams(params: FilterParams): EventFilter {
    let filter = EventFilter.Clear;

    if (params && (params.speaker || params.topic)) {
      filter = new EventFilter();
      filter.speaker = params.speaker;
      filter.topic = params.topic;
    }

    return filter;
  }

  private constructor() {}

  public speaker?: string;
  public topic?: string;

  public get isClearFilter(): boolean {
    return this === EventFilter.Clear;
  }

  private passesFilter(test: string, data: string): boolean {
    return data.toLowerCase().indexOf(test.toLowerCase()) !== -1;
  }

  public filter(events: EventModel[]): EventModel[] {
    let filteredEvents = events;
    if (!this.isClearFilter) {
      filteredEvents = events.filter((event: EventModel) => {
        let passedFilter = true;

        if (this.speaker) {
          passedFilter = this.passesFilter(this.speaker, event.speaker);
        }
        if (this.topic) {
          passedFilter =
            this.topic && this.passesFilter(this.topic, event.title);
        }

        return passedFilter;
      });
    }
    return filteredEvents;
  }
}
