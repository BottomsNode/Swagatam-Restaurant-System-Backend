import { AutoMap } from "@automapper/classes";
import { MenuItemEntity } from "src/menu-item/entities/menu_item.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    @AutoMap()
    id: number;

    @Column()
    @AutoMap()
    name: string;

    @AutoMap()
    @OneToMany(()=> MenuItemEntity, (menuItem)=> menuItem.category)
    menuItems: MenuItemEntity[];

    // @AutoMap()
    // @Column({ default: true })
    // isActive: boolean;

    // @AutoMap()
    // @CreateDateColumn()
    // createdAt: Date;

    // @AutoMap()
    // @UpdateDateColumn()
    // updatedAt: Date;

    // @AutoMap()
    // @DeleteDateColumn()
    // deletedAt: Date | null;
}