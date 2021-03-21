import { RelationshipResponseDto } from 'dto';
import { RelationshipEntity } from 'entities/relationship.entity';
import { EntityRepository, Repository, In, Not, Equal } from 'typeorm';

@EntityRepository(RelationshipEntity)
export class RelationshipRepository extends Repository<RelationshipEntity> {
  // eslint-disable-next-line prettier/prettier
  public async postRelationships( relations: RelationshipEntity[] ): Promise<RelationshipResponseDto> {
    let result;
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
        result = {
          success: true,
          recordsInsertedOnRelationship: relationsResult.raw.affectedRows,
        };
      }
    } catch (error) {
      throw new Error(error);
    }
    return result;
  }

  public async findParentChildRelationship(name: string): Promise<any> {
    let relation;
    try {
      relation = await this.find({
        where: [{ parentName: name }, { childName: name }],
      });
    } catch (error) {
      throw new Error(error);
    }
    return relation;
  }

  // eslint-disable-next-line prettier/prettier
  public async findSisterdRelationship(name: string, parents: string[]): Promise<any> {
    let relation;
    try {
      relation = await this.find({
        parentName: In(parents),
        childName: Not(Equal(name)),
      });
    } catch (error) {
      throw new Error(error);
    }
    return relation;
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
