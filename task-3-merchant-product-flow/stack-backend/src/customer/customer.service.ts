import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateCustomerDto, LoginCustomerDto } from "./dto";
import { getHashPassword, prisma } from "@/src/utils";
import { compareSync } from "bcryptjs";
import { ICustomer } from "@/src/types";
@Injectable()
export class CustomerService {
  constructor(private confService: ConfigService) {}
  create = (createCustomerDto: CreateCustomerDto) => {
    return prisma.customer.create({
      data: {
        fullname: createCustomerDto.fullname ?? "",
        mobile: createCustomerDto.mobile ?? "",
        email: createCustomerDto.email ?? "",
        password: getHashPassword(createCustomerDto.password ?? "")
      }
    });
  };
  login = async (loginCustomerDto: LoginCustomerDto) => {
    const customerItem: ICustomer | null = await prisma.customer.findFirst({
      where: {
        OR: [{ mobile: loginCustomerDto.username }, { email: loginCustomerDto.username }]
      }
    });
    if (customerItem) {
      const isValid = compareSync(loginCustomerDto.password, customerItem.password);
      if (isValid) {
        return true;
      } else {
        return false;
      }
    }
  };
}
