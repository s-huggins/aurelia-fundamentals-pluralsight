import { PLATFORM } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

export class Shell {
  private router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = 'Capital Area .Net User Group';
    config.map([
      {
        route: ['', 'events'],
        moduleId: PLATFORM.moduleName('events/events-list'),
        name: 'Events',
        title: 'Events',
        nav: true
      },
      {
        route: 'jobs',
        moduleId: PLATFORM.moduleName('jobs/jobs'),
        title: 'Jobs',
        nav: true
      },
      {
        route: 'discussion',
        moduleId: PLATFORM.moduleName('discussion/discussion'),
        title: 'Discussion',
        nav: true
      },
      {
        route: 'eventDetail/:eventId',
        moduleId: PLATFORM.moduleName('events/event-detail'),
        name: 'EventDetail'
      }
    ]);
  }
}
