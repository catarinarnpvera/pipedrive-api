import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from 'src/app.service';

describe('AppController (e2e)', () => {
  let app: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // app = moduleFixture.createNestApplication();
    // await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  it('should insert organizations', async () => {
    const mock = {
      orgName: 'Paradise Island',
      children: [
        {
          orgName: 'Banana tree',
          children: [
            {
              orgName: 'Yellow Banana',
            },
            {
              orgName: 'Brown Banana',
            },
            {
              orgName: 'Black Banana',
            },
          ],
        },
      ],
    };

    return request(app.postOrganizationsAndRelationships(mock))
      .post('/')
      .expect(200)
      .then((result) => {
        expect(result.body.success).toEqual(true),
          expect(result.body.recordsInsertedOnOrganization).toEqual(5),
          expect(result.body.recordsInsertedOnRelationship).toEqual(4);
      });
  });
});
