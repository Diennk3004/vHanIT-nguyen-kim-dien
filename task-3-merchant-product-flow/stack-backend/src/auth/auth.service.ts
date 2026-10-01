import { IUser } from "@/src/types";
import { prisma } from "@/src/utils";
import { BadGatewayException, ForbiddenException, Injectable } from "@nestjs/common";
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
    const accessExpiresIn = this.confService.get<string>("JWT_ACCESS_EXPIRATION") as string;
    const refreshExpiresIn = this.confService.get<string>("JWT_REFRESH_EXPIRATION") as string;
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
          secret: this.confService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
          expiresIn: accessExpiresIn
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
          secret: this.confService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
          expiresIn: refreshExpiresIn
        } as JwtSignOptions
      )
    ]);

    return {
      accessToken,
      refreshToken
    };
  };
  login = async (user: IUser) => {
    const userItem: any = { sub: user.id, username: user.username, email: user.email, phone: user.phone };
    const { accessToken, refreshToken } = await this.generateTokens(userItem);
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(accessToken, salt);
    await prisma.users.update({ where: { id: user.id }, data: { token: hashedRefreshToken } });
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      accessToken,
      refreshToken
    };
  };
  logout = async (user: IUser) => {
    const { id } = user;
    const data: any = await prisma.users.update({ where: { id }, data: { token: null } });
    return {
      user: {
        id: data && data.id ? data.id : 0,
        username: data && data.username ? data.username : "",
        fullname: data && data.fullname ? data.fullname : "",
        email: data && data.email ? data.email : "",
        phone: data && data.phone ? data.phone : ""
      },
      token: data.token
    };
  };
  checkValidToken = async (createAuthDto: CreateAuthDto) => {
    const token: string = createAuthDto.token ? createAuthDto.token : "";
    const payload: any = await this.jwt.verifyAsync(token, {
      secret: this.confService.get<string>("JWT_ACCESS_TOKEN_SECRET")
    });
    const userId: number = parseInt(payload.sub);
    const user: any = await prisma.users.findFirstOrThrow({ where: { id: userId } });
    if (!user || !user.token) {
      throw new ForbiddenException("Access denied");
    }
    const refreshTokenMatches = await bcrypt.compare(token, user.token);
    if (!refreshTokenMatches) {
      throw new ForbiddenException("Access denied");
    }
    let accessToken: string = await this.jwt.signAsync(user, {
      secret: this.confService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
      expiresIn: this.confService.get<string>("JWT_ACCESS_EXPIRATION")
    } as JwtSignOptions);
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(accessToken, salt);
    await prisma.users.update({ where: { id: user.id }, data: { token: hashedRefreshToken } });
    return {
      token,
      user
    };
  };
}
