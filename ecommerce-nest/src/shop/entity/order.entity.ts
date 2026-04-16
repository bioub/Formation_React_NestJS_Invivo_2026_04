import { CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../user/entity/user.entity';
import { ProductEntity } from './product.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @ManyToMany(() => ProductEntity)
  @JoinTable()
  products?: ProductEntity[];

  @ManyToOne(() => UserEntity)
  user?: UserEntity;
}
