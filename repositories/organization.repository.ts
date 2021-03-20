import { OrganizationEntity } from 'entities/orgarization.entity';
import { relationshipEntity } from 'entities/relationship.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';

@EntityRepository(OrganizationEntity)
export class OrganizationRepository extends Repository<OrganizationEntity> {

  public async findByName(name: string): Promise<OrganizationEntity> {
    try {
      return await this.findOne({ orgName: name });
    } catch (error) {
      throw new Error(error);
    }
  }

  // eslint-disable-next-line prettier/prettier
  public async postOrgData(orgNames: OrganizationEntity[], relations: relationshipEntity[]): Promise<any> {
    try {

    //   await getConnection()
    //     .createQueryBuilder()
    //     .insert()
    //     .into(relationshipEntity)
    //     .values(relations)
    //     .execute();

    // const res = await getConnection()
    // .createQueryBuilder()
    // .insert()
    // .into(OrganizationEntity)
    // .values(orgNames)
    // //.orIgnore()
    // .execute();
    
    const res = this.save(orgNames);
    console.log("🚀 ~ file: organization.repository.ts ~ line 28 ~ OrganizationRepository ~ postOrgData ~ res", res)
    } catch (error) {
      throw new Error(error);
    }
    return { success: true };
  }
}
