import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class PageParams{
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    page?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    records?: number;

}