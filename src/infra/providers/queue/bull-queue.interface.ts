export interface IBullQueueProvider {
  addMany(data: unknown[]): Promise<void>;
}
