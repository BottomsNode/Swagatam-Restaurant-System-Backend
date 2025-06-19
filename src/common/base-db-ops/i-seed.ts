export interface ISeed<TEntity> {
  get name(): string;
  get version(): number;
  get seedingData(): Partial<TEntity>[];
  shouldRun(): boolean;
  runAsync(): Promise<void>;
}
