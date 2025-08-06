import { CreateCustomerDto } from '@/modules/customer/dto/customer.create.dto';
import { CustomerResponseDto } from '@/modules/customer/dto/customer.res.dto';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            // Map CreateCustomerDto to CustomerEntity
            createMap(mapper, CreateCustomerDto, CustomerEntity);

            // Map CustomerEntity to CustomerResponseDto
            createMap(
                mapper,
                CustomerEntity,
                CustomerResponseDto,
                forMember(
                    (dest) => dest.id,
                    mapFrom((src) => src.id),
                ),
                forMember(
                    (dest) => dest.email,
                    mapFrom((src) => src.email),
                ),
                forMember(
                    (dest) => dest.name,
                    mapFrom((src) => src.name),
                ),
                // // Explicitly ignore sensitive fields like password
                // forMember(
                //     (dest) => dest.password,
                //     mapFrom(() => undefined),
                // ),
            );
        };
    }
}