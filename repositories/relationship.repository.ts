import { RelationshipResponseDto } from 'dto';
import { RelationshipEntity } from 'entities/relationship.entity';
import { EntityRepository, Repository, In, Not, Equal } from 'typeorm';

@EntityRepository(RelationshipEntity)
export class RelationshipRepository extends Repository<RelationshipEntity> {
  // eslint-disable-next-line prettier/prettier
  public async postRelationships( relations: RelationshipEntity[] ): Promise<RelationshipResponseDto> {
    try {
      const relationsResult = await this.createQueryBuilder()
        .insert()
        .into(RelationshipEntity)
        .values(relations)
        .orUpdate({
          conflict_target: ['parentName', 'childName'],
          overwrite: ['parentName', 'childName'],
        })
        .execute();

      if (relationsResult.raw.affectedRows) {
        return {
          success: true,
          recordsInsertedOnRelationship: relationsResult.raw.affectedRows,
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findParentChildRelationship(name: string): Promise<any> {
    try {
      return await this.find({
        where: [{ parentName: name }, { childName: name }],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  // eslint-disable-next-line prettier/prettier
  public async findSistersRelationship(name: string, parents: string[]): Promise<any> {
    try {
      return await this.createQueryBuilder('rel')
        .select()
        .where('rel.parentName IN (:...parents)', { parents: parents })
        .andWhere('rel.childName != :name', { name })
        .groupBy('rel.childName')
        .getMany();

    //   const relation = await this.find({
    //     parentName: In(parents),
    //     childName: Not(Equal(name)),
    //   });
    } catch (error) {
      throw new Error(error);
    }
  }
}

// ALTER TABLE  pipedriveDB.relationship ADD UNIQUE (`parentName` ,`childName`);
//   CREATE TABLE pipedriveDB.relationship (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `parentName` varchar(45),
//     `childName` varchar(45),
//     PRIMARY KEY (`id`),
//     UNIQUE KEY `relation` (`parentName`,`childName`)
//   );
