import { CurrentUser, Public, ResponseMessage } from "@/src/decorator";
import { IUser } from "@/src/types";
import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
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
    res.cookie("accessToken", result.accessToken, {
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
    });
    return result;
  }

  @Post("refresh")
  async refresh(@Req() req: Request) {
    const token: string = req.cookies["token"];
    console.log("token = ", token);
    return true;
  }

  @ResponseMessage("Check valid token successfully")
  @Post("check-valid-token")
  checkValidToken(@Body() createAuthDto: CreateAuthDto) {
    return this.auth.checkValidToken(createAuthDto);
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
