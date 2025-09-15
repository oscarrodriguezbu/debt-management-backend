import { bcryptAdapter, JwtAdapter } from "../../config";
import { prisma } from "../../postgres";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../domain";


export class AuthService {
  async findById(id: number): Promise<UserEntity> {
    const user = await prisma.user.findFirst({
      where: { id }
    });

    if (!user) throw CustomError.badRequest(`User with id ${id} not found`);
    return UserEntity.fromObject(user);
  }

  private async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) return null;
    return UserEntity.fromObject(user);
  }

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await this.findByEmail(registerUserDto.email);
    if (existUser) throw CustomError.badRequest('Email already exist');

    const { password, ...userData } = registerUserDto;

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: bcryptAdapter.hash(password),
      }
    });

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer('Error while creating JWT');

    return {
      user: userData,
      token
    };
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const existUser = await this.findByEmail(loginUserDto.email);
    if (!existUser) throw CustomError.badRequest('Email not exist');

    const isMatching = bcryptAdapter.compare(loginUserDto.password, existUser.password);
    if (!isMatching) throw CustomError.badRequest('Password is not valid');

    const { password, id, ...userEntity } = UserEntity.fromObject(existUser);

    const token = await JwtAdapter.generateToken({ id: existUser.id });
    if (!token) throw CustomError.internalServer('Error while creating JWT');

    return {
      user: userEntity,
      token: token,
    } 
  }
}