import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PostDataRequestDto,
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
    let allRelations = [];
    const parents = [];
    relations.forEach((rel) => {
      if (name == rel.parentName) {
        allRelations.push({
          relationshipType: 'child',
          orgName: rel.childName,
        });
      }
      if (name == rel.childName) {
        allRelations.push({
          relationshipType: 'parent',
          orgName: rel.parentName,
        });
        parents.push(rel.parentName);
      }
    });
    if (parents.length > 0) {
      const sistersList = await this.getSisters(name, parents);
      allRelations = allRelations.concat(sistersList);
      return this.sortRelationNames(allRelations);
    }
    return this.sortRelationNames(allRelations);
  }

  // eslint-disable-next-line prettier/prettier
  async postOrganizationsAndRelationships(orgBody: PostDataRequestDto): Promise<postResponseDto> {

    const relations = this.getRelations(orgBody.orgName, orgBody.children);
    const orgNames = this.getOrgNames(relations);

    // eslint-disable-next-line prettier/prettier
    const postOrg = await this.organizatpionRepository.postOrganizations(orgNames);
    const postRel = await this.relationshipRepository.postRelationships(relations);

    if (postOrg.success && postRel.success) {
      return {
        success: true,
        recordsInsertedOnOrganization: postOrg.recordsInsertedOnOrganization,
        recordsInsertedOnRelationship: postRel.recordsInsertedOnRelationship,
      };
    }
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

  async getSisters(name, parents) {
    const sisters = await this.relationshipRepository.findSistersRelationship(name, parents);

    return sisters.map((sis) => {
      return {
        relationshipType: 'sister',
        orgName: sis.childName,
      };
    });
  }

  sortRelationNames(allRelations) {
    return allRelations.sort((a, b) => (a.orgName > b.orgName ? 1 : -1));
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
