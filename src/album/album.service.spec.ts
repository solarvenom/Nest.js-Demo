import { Test, TestingModule, MockFactory } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AlbumService } from './album.service';
import { AlbumEntity } from './entities/album.entity';
import { MockType } from './types/mock.type'
import { albumDetailsQueryResult } from './seeds/albumDetailsQueryResult.mock';
import { albumDetailsExpectedResult } from './seeds/albumDetailsExpectedResult.mock';
import { AlbumRepository } from './album.repository';

describe('AlbumService', () => {
  let service: AlbumService;
  let repositoryMock: MockType<AlbumRepository>;
  let dataSourceMock: MockType<DataSource>;

  beforeAll(async () => {
    const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(() => ({
      createEntityManager: jest.fn()
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        AlbumRepository,
        {
          provide: DataSource,
          useFactory: dataSourceMockFactory,
        },
        {
          provide: getRepositoryToken(AlbumEntity),
          useFactory: () => repositoryMock,
        }
      ],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    const repository = module.get<AlbumRepository>(AlbumRepository)
    dataSourceMock = module.get<MockType<DataSource>>(DataSource)

    repositoryMock = {
      getAlbumDetailsByUUID: jest.fn()
    }

    Object.assign(repository, repositoryMock);
  });

  it('should return all available data related to an album in the correct shape', async () => {
    repositoryMock.getAlbumDetailsByUUID.mockReturnValue(albumDetailsQueryResult)
    const albumDetails = await service.getAlbumByUUID('39c727d0-5a9b-4493-b1bc-70b654ae8453')

    expect(JSON.stringify(albumDetails)).toEqual(JSON.stringify(albumDetailsExpectedResult))
  })
});
