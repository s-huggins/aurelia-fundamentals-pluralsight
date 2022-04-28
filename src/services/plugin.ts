export abstract class PlugIn {
  public abstract run(): void;
}

export class PlugInA extends PlugIn {
  public run(): void {
    console.log('PlugInA running...');
  }
}

export class PlugInB extends PlugIn {
  public run(): void {
    console.log('PlugInB running...');
  }
}
