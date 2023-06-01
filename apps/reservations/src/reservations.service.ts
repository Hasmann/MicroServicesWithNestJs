import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './reservations/dto/create-reservation.dto';
import { UpdateReservationDto } from './reservations/dto/update-reservation.dto';
import { reservationRepository } from './reservations.repository';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
@Injectable()
export class ReservationsService {
  constructor(
    private reservationRepo: reservationRepository,
    @Inject(PAYMENTS_SERVICE) private paymentsService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto, user: UserDto) {
    const email = user.email;
    return this.paymentsService
      .send('create_charge', { ...createReservationDto.charge, email })
      .pipe(
        map(async (response) => {
          console.log(response);
          const reservation = this.reservationRepo.create({
            ...createReservationDto,
            userId: user._id,
            InvoiceId: response.id,
            timestamp: new Date(),
          });
        }),
      );
  }

  async findAll() {
    return this.reservationRepo.findAll();
  }

  async findOne(_id: string) {
    return this.reservationRepo.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepo.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationRepo.findOneAndDelete({ _id });
  }
}
