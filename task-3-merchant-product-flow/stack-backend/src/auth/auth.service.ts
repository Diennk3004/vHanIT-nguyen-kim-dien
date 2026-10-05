import { IUser } from "@/src/types";
import { prisma } from "@/src/utils";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { compareSync } from "bcryptjs";
import { CreateAuthDto } from "./dto";
@Injectable()
export class AuthService {
  constructor(
    private confService: ConfigService,
    private jwt: JwtService
  ) {}

  validateUser = async (username: string, password: string) => {
    let user: any = await prisma.users.findUnique({ where: { username } });
    if (user) {
      const isValid = compareSync(password, user.password);
      if (isValid === true) {
        return user;
      }
    }
    return null;
  };
  generateTokens = async (user: IUser) => {
    const { id, username, email, phone } = user;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: id,
          username,
          email,
          phone
        },
        {
          secret: this.confService.get<string>("JWT_SECRET"),
          expiresIn: this.confService.get<string>("JWT_EXPIRATION") as string
        } as JwtSignOptions
      ),
      this.jwt.signAsync(
        {
          sub: id,
          username,
          email,
          phone
        },
        {
          secret: this.confService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: this.confService.get<string>("JWT_REFRESH_EXPIRATION") as string
        } as JwtSignOptions
      )
    ]);
    return {
      accessToken,
      refreshToken
    };
  };
  login = async (user: IUser) => {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(accessToken, salt);
    await prisma.users.update({ where: { id: user.id }, data: { token: hashedRefreshToken } });
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        phone: user.phone
      },
      accessToken,
      refreshToken
    };
  };
  refreshToken = async (user: IUser, createAuthDto: CreateAuthDto) => {
    const refreshToken: string = createAuthDto.token ?? "";
    const payload: any = await this.jwt.verifyAsync(refreshToken, {
      secret: this.confService.get<string>("JWT_REFRESH_SECRET")
    });
    const { sub, username, email, phone } = payload;
    const accessToken: string = await this.jwt.signAsync(
      {
        sub,
        username,
        email,
        phone
      },
      {
        secret: this.confService.get<string>("JWT_SECRET"),
        expiresIn: this.confService.get<string>("JWT_EXPIRATION") as string
      } as JwtSignOptions
    );
    return { user: { id: sub, username, email, phone, fullname: user.fullname }, accessToken };
  };
  logout = async (user: IUser) => {
    await prisma.users.update({ where: { id: user.id }, data: { token: null } });
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        phone: user.phone
      }
    };
  };
}
