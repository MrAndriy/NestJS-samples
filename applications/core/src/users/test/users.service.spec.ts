import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UsersService } from '../users.service'
import User from '../entities/user.entity'

describe('The UsersService', () => {
  let usersService: UsersService
  let findOneBy: jest.Mock
  let create: jest.Mock
  let save: jest.Mock
  let update: jest.Mock

  beforeEach(async () => {
    findOneBy = jest.fn()
    create = jest.fn()
    save = jest.fn()
    update = jest.fn()

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy,
            create,
            save,
            update
          }
        }
      ]
    }).compile()
    usersService = await module.get(UsersService)
  })

  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User
      beforeEach(() => {
        user = new User()
        findOneBy.mockReturnValue(Promise.resolve(user))
      })
      it('should return the user', async () => {
        const fetchedUser = await usersService.getByEmail('test@test.com')
        expect(fetchedUser).toEqual(user)
      })
    })
    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOneBy.mockReturnValue(undefined)
      })

      it('should throw an error', async () => {
        await expect(usersService.getByEmail('test@test.com')).rejects.toThrow()
      })
    })
  })

  describe('when getting a user by id', () => {
    describe('and the user is matched', () => {
      let user: User
      beforeEach(() => {
        user = new User()
        findOneBy.mockReturnValue(Promise.resolve(user))
      })

      it('should return the user', async () => {
        const fetchedUser = await usersService.getById(1)
        expect(fetchedUser).toEqual(user)
      })
    })

    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOneBy.mockReturnValue(undefined)
      })

      it('should throw an error', async () => {
        await expect(usersService.getById(1)).rejects.toThrow()
      })
    })
  })

  describe('when creating a user', () => {
    describe('and the user is created successfully', () => {
      let user: User
      beforeEach(() => {
        user = new User()
        create.mockReturnValue(Promise.resolve(user))
      })

      it('should return the user', async () => {
        const createdUser = await usersService.create({
          email: 'email',
          name: 'name',
          password: 'password'
        })
        expect(createdUser).toEqual(user)
      })
    })
  })
})
