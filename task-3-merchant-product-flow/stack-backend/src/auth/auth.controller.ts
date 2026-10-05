import { CurrentUser, Public, ResponseMessage } from "@/src/decorator";
import { IUser } from "@/src/types";
import { Body, Controller, Get, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto";
import { ConfigService } from "@nestjs/config";
import { LocalAuthGuard } from "./local-auth.guard";
import ms from "ms";
@Controller("auth")
export class AuthController {
  constructor(
    private auth: AuthService,
    private confService: ConfigService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("Login user successfully")
  @Post("login")
  async login(@CurrentUser() user: IUser, @Res({ passthrough: true }) res: Response) {
    const result: any = await this.auth.login(user);
    // Cách 1: Lấy token từ localStorage bên frontend trả về
    // Cách 2: Lấy token lưu từ cookie bên backend
    /* res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: ms(this.confService.get<string>("JWT_ACCESS_EXPIRATION") as string)
    });
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: ms(this.confService.get<string>("JWT_REFRESH_EXPIRATION") as string)
    }); */
    return result;
  }

  @Put("refresh-token")
  refresh(@CurrentUser() user: IUser, @Body() createAuthDto: CreateAuthDto) {
    return this.auth.refreshToken(user, createAuthDto);
  }

  @Get("profile")
  getProfile(@CurrentUser() user: IUser) {
    return user;
  }

  @Post("logout")
  async logout(@CurrentUser() user: IUser) {
    return this.auth.logout(user);
  }
}
