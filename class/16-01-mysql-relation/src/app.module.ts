import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/boards/board.module';
import { Board } from './apis/boards/entities/board.entity';

@Module({
  imports: [
    BoardModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dldpdma96',
      database: '16-01-mysql-relation',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true
    })
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}


