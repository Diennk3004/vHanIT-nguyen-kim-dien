import { CurrentUser, Public, ResponseMessage } from "@/src/decorator";
import { IUser } from "@/src/types";
import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private auth: AuthService,
    private readonly adapterHost: HttpAdapterHost
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("Login user successfully")
  @Post("login")
  login(@CurrentUser() user: IUser) {
    return this.auth.login(user);
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
