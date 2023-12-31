import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { AuthHelper } from '../helper/auth.helper';
import { User } from 'src/users/entity/users.entity';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {

    const { username, password }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { username } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();

    user.username = username;
    user.password = this.helper.encodePassword(password);



    return this.repository.save(user);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const {username, password}: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { username } });

    if (!user) {    
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    console.log(user);
    console.log(user.password);
    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    
    return JSON.stringify( {
        token : this.helper.generateToken(user)
      }
    )
  }

  public async refresh(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }
}