import { DataSource, FindOptionsWhere, Repository, SelectQueryBuilder } from "typeorm";
import { ISeed } from "./i-seed";
import { PinoLogger } from "nestjs-pino";
import { difference, isNil, map } from "./utils";
import { ISeedEntity } from "./types";

export abstract class BaseSeed<TEntity> implements ISeed<TEntity> {
  protected seedEntity: ISeedEntity;

  constructor(protected readonly dataSource: DataSource, protected readonly repo: Repository<TEntity>, protected readonly logger: PinoLogger) {}

  protected get queryBuilder(): SelectQueryBuilder<TEntity> {
    return this.dataSource.createQueryBuilder();
  }

  public get name(): string {
    return this.constructor.name;
  }

  public abstract get version(): number;
  public abstract get seedingData(): Partial<TEntity>[];

  public shouldRun(): boolean {
    return isNil(this.seedEntity) || this.seedEntity.version < this.version;
  }

  public async runAsync(): Promise<void> {
    await this.loadSeedEntityAsync();
    if (!this.shouldRun()) {
      return;
    }
    this.logger.info(`Seeding ${this.name}...`);
    try {
      const data = await this.transformSeedDataAsync();
      await this.writeDataAsync(data);
    } catch (ex) {
      this.logger.error(ex, `Seeding ${this.name} failed`);
      throw ex;
    }
  }

  protected transformSeedDataAsync(): Promise<Partial<TEntity>[]> {
    return Promise.resolve(this.seedingData);
  }

  protected async writeDataAsync(data: Partial<TEntity>[]): Promise<void> {
    const found = await this.repo.find({ where: this.createFilter() });
    const diff = map(
      difference(data, found, (x, y) => this.equalityCheck(x, y)),
      (e) => this.repo.create(e as unknown as TEntity),
    );
    if (diff.length > 0) {
      await this.repo.save(diff);
      this.logger.info(`Seeded ${this.name} with ${diff.length} records`);
    }
    await this.updateSeedEntityAsync();
    this.logger.info(`Seeding ${this.name} finished`);
  }

  protected async loadSeedEntityAsync(): Promise<void> {
    const builder = this.queryBuilder.select(["id", "name", "version", "timestamp"]).from("public.seeds", "s").where("s.name = :name", { name: this.name });
    this.seedEntity = await builder.getRawOne<ISeedEntity>();
  }

  protected async updateSeedEntityAsync(): Promise<void> {
    if (this.version > 1 && this.seedEntity) {
      const builder = this.queryBuilder.update("public.seeds").set({ version: this.version, timestamp: new Date() }).where("name = :name", { name: this.name });
      await builder.execute();
    } else {
      const builder = this.queryBuilder.insert().into("public.seeds").values({ name: this.name, version: this.version, timestamp: new Date() });
      await builder.execute();
    }
  }

  protected abstract equalityCheck(x: Partial<TEntity>, y: Partial<TEntity>): boolean;

  protected abstract createFilter(): FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[];
}
