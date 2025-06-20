import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerRepository } from './repository/customer.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService,{
    provide: 'CustomerRepository',
    useClass: CustomerRepository
  }],
  exports : [CustomerService,'CustomerRepository'],
})
export class CustomerModule { }
