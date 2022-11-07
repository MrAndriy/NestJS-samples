import { AuthenticationService } from '../authentication.service'
import { Test } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { getRepositoryToken } from '@nestjs/typeorm'

import { UsersService } from '../../users/users.service'

import User from '../../users/entities/user.entity'
import { mockedConfigService } from '../../utils/mocks/config.service'
import { mockedJwtService } from '../../utils/mocks/jwt.service'

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationService
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService
        },
        {
          provide: JwtService,
          useValue: mockedJwtService
        },
        {
          provide: getRepositoryToken(User),
          useValue: {}
        }
      ]
    }).compile()
    authenticationService = await module.get(AuthenticationService)
  })
  describe('when creating a cookie with jwt access token', () => {
    it('should return a string', () => {
      const userId = 1
      expect(typeof authenticationService.getCookieWithJwtAccessToken(userId)).toEqual('string')
    })
  })

  describe('when creating a cookie with a refresh token', () => {
    it('should return an object', () => {
      const userId = 1
      expect(typeof authenticationService.getCookieWithJwtRefreshToken(userId)).toEqual('object')
    })
  })

  describe('when log out', () => {
    it('should return an array', () => {
      expect(Array.isArray(authenticationService.getCookiesForLogOut())).toEqual(true)
    })

    it('should return an array with two elements', () => {
      expect(authenticationService.getCookiesForLogOut().length).toEqual(2)
    })

    it('should return an array with two elements of type string', () => {
      expect(typeof authenticationService.getCookiesForLogOut()[0]).toEqual('string')
      expect(typeof authenticationService.getCookiesForLogOut()[1]).toEqual('string')
    })
  })
})
