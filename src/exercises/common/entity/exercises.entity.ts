import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../../users/common/entity/users.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User)
  creator: User;

  @Column({
    unique : true
  })
  name: string;

  @Column()
  muscle_group: string;
}