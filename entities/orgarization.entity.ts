import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('organization')
export class OrganizationEntity {
  @PrimaryColumn({ name: 'Id', type: 'int', nullable: false })
  Id: number;

  @Column({ name: 'orgName', type: 'varchar', length: 45 })
  orgName: string;
}
