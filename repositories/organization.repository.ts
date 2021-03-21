import { OrganizationResponseDto } from 'dto';
import { OrganizationEntity } from 'entities/orgarization.entity';
import { EntityRepository, Repository } from 'typeorm';

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
  public async postOrganizations(orgNames: OrganizationEntity[]): Promise<OrganizationResponseDto> {
    let result;
    try {
      const orgResult = await this.createQueryBuilder()
        .insert()
        .into(OrganizationEntity)
        .values(orgNames)
        .orUpdate({ conflict_target: ['orgName'], overwrite: ['orgName'] })
        .execute();

      if (orgResult.raw.affectedRows) {
        result = {
          success: true,
          recordsInsertedOnOrganization: orgResult.raw.affectedRows,
        };
      }
    } catch (error) {
      throw new Error(error);
    }
    return result;
  }
}
