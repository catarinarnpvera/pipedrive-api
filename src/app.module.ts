import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { OrganizationRepository } from 'repositories/organization.repository';
import { RelationshipRepository } from 'repositories/relationship.repository';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.resolveRootPath(__dirname).load('config/**/!(*.d).{ts,js}'),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([OrganizationRepository, RelationshipRepository]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
