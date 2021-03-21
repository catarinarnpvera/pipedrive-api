import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  postDataRequestDto,
  OrgRelationshipResponseDto,
  PageDto,
  postResponseDto,
} from 'dto';
import { OrganizationEntity } from 'entities/orgarization.entity';
import { OrganizationRepository } from 'repositories/organization.repository';
import { RelationshipRepository } from 'repositories/relationship.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(OrganizationRepository)
    private organizationRepository: OrganizationRepository,
    @InjectRepository(RelationshipRepository)
    private relationshipRepository: RelationshipRepository,
  ) {}
  // eslint-disable-next-line prettier/prettier
  async getOrgRelationship(name: string, page: PageDto): Promise<OrgRelationshipResponseDto[]> {

    await this.checkExistingOrg(name);
    const getResponse = await this.getRelationships(name);

    return getResponse;
  }

  async checkExistingOrg(name: string): Promise<OrganizationEntity> {
    const existingOrg = await this.organizationRepository.findByName(name);
    if (!existingOrg) {
      throw new NotFoundException('Unkown organization name');
    }
    return existingOrg;
  }

  async getRelationships(name: string): Promise<OrgRelationshipResponseDto[]> {
    const relations = await this.relationshipRepository.findParentChildRelationship(name);
    const allRelations = [];
    const parents = [];
    let sisters = [];
    relations.forEach((rel) => {
      if (name == rel.parentName) {
        allRelations.push({
          relationshipType: 'child',
          orgName: rel.childName,
        });
      } else if (name == rel.childName) {
        allRelations.push({
          relationshipType: 'parent',
          orgName: rel.parentName,
        });
        parents.push(rel.parentName);
      }
    });
    if (parents.length > 0) {
      // eslint-disable-next-line prettier/prettier
      sisters = await this.relationshipRepository.findSisterdRelationship(name, parents);
    }
    const sistersList = [];
    sisters.forEach((sis) => {
      if (!sistersList.includes(sis.childName)) {
        allRelations.push({
          relationshipType: 'sister',
          orgName: sis.childName,
        });
        sistersList.push(sis.childName);
      }
    });
    return allRelations;
  }

  // eslint-disable-next-line prettier/prettier
  async postOrganizationsAndRelationships(orgBody: postDataRequestDto): Promise<postResponseDto> {
    let postResponse;

    const relations = this.getRelations(orgBody.orgName, orgBody.children);
    const orgNames = this.getOrgNames(relations);

    // eslint-disable-next-line prettier/prettier
    const postOrg = await this.organizationRepository.postOrganizations(orgNames);
    const postRel = await this.relationshipRepository.postRelationships(relations);

    if (postOrg.success && postRel.success) {
      postResponse = {
        success: true,
        recordsInsertedOnOrganization: postOrg.recordsInsertedOnOrganization,
        recordsInsertedOnRelationship: postRel.recordsInsertedOnRelationship,
      };
    }
    return postResponse;
  }

  getRelations(orgName, children) {
    let orgRelations = [];

    children.forEach((child) => { // for
      orgRelations.push({
        parentName: orgName,
        childName: child.orgName,
      });
      if (child.children) {
        const relation = this.getRelations(child.orgName, child.children);
        orgRelations = orgRelations.concat(relation);
      }
    });

    return orgRelations;
  }

  getOrgNames(relations) {
    const orgNames = [];

    relations.forEach((child) => { // for
      // eslint-disable-next-line prettier/prettier
      if (!(orgNames.filter(org => org.orgName === child.childName).length > 0)) {
        orgNames.push({ orgName: child.childName });
      }
      if(!(orgNames.filter(org => org.orgName === child.parentName).length > 0)){
        orgNames.push({ orgName: child.parentName });
      }
    });

    // orgNames = [...new Set(orgNames).keys()];

    return orgNames;
  }
}

// {
//   "orgName":"Paradise Island",
//   "children":[
//      {
//         "orgName:":"Banana tree",
//         "children":[
//            {
//               "orgName":"Yellow Banana"
//            },
//            {
//               "orgName":"Brown Banana"
//            },
//            {
//               "orgName":"Black Banana"
//            }
//         ]
//      },
//      {
//         "orgName:":"Big banana tree",
//         "children":[
//            {
//               "orgName":"Yellow Banana"
//            },
//            {
//               "orgName":"Brown Banana"
//            },
//            {
//               "orgName":"Green Banana"
//            },
//            {
//               "orgName":"Black Banana",
//               "children":[
//                  {
//                     "orgName":"Phoneutria Spider"
//                  }
//               ]
//            }
//         ]
//      }
//   ]
// }
