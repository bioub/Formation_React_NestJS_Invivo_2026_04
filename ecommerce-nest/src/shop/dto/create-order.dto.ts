import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The date of the order',
    example: '2021-01-01T00:00:00.000Z',
  })
  date: Date; // Date de la commande

  @ApiProperty({
    description: 'The IDs of the products',
    example: [1, 2, 3],
  })
  productIds: number[]; // Liste des IDs des produits

  @ApiProperty({
    description: 'The ID of the user',
    example: 1,
  })
  userId: number; // ID de l'utilisateur qui passe la commande
}
