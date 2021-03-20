import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('relationship')
export class relationshipEntity {
  @PrimaryColumn({ name: 'Id', type: 'int', nullable: false })
  Id: number;

  @Column({ name: 'parentName', type: 'varchar', length: 45 })
  parentName: string;

  @Column({ name: 'childName', type: 'varchar', length: 45 })
  childName: string;
}
