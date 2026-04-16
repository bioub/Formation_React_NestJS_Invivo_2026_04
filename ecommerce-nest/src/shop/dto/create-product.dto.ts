import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Smartphone',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'A very powerful smartphone',
  })
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 599.99,
  })
  price: number;

  @ApiProperty({
    description: 'The ID of the category',
    example: 1,
  })
  categoryId: number; // On utilise l'ID plutôt que l'objet entier pour la création
}
