export abstract class GatewayHelper {
  protected constructor(private readonly eventPrefix: string) {}

  protected buildEventName(event: string) {
    return `${this.eventPrefix}:${event}`;
  }
}
