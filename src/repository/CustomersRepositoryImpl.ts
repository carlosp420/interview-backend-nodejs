import axios from 'axios';
import { CustomersRepository } from './CustomersRepository';
import { Customer } from '../domain/Customer';

type RandomUser = {
  id: {
    value: string;
  };
  name: {
    first: string;

    last: string;
  };
  dob: {
    date: string;
  };
};

export class CustomersRepositoryImpl implements CustomersRepository {
  async findByFilter(customer: Customer): Promise<Customer[]> {
    const result = await axios.get('https://randomuser.me/api/?results=100');
    if (!result.data.results) {
      return [];
    }

    return result.data.results
      .filter(
        (item: RandomUser) =>
          item.name.first.toLowerCase().includes(customer.name.toLowerCase()) ||
          item.name.last.toLowerCase().includes(customer.name.toLowerCase())
      )
      .map(
        (item: RandomUser) =>
          new Customer({
            id: item.id.value,
            name: item.name.first,
            lastName: item.name.last,
            dateOfBirth: item.dob.date,
          })
      );
  }
}
