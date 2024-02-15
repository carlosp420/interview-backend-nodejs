import { CustomersServiceImpl } from '../CustomersServiceImpl';
import { Customer } from '../../domain/Customer';
import { CustomersRepository } from '../../repository/CustomersRepository';

describe('CustomersServiceImpl', () => {
  describe('findByFilter', () => {
    // Prepare
    const repository = {
      findByFilter: jest.fn(() =>
        Promise.resolve([
          {
            id: 'customerId',
            name: 'name',
            lastName: 'lastName',
          },
        ])
      ),
    } as unknown as CustomersRepository;

    const service = new CustomersServiceImpl(repository);

    it('should return customers using paramenter name', async () => {
      // Execute
      const response = await service.findByFilter(new Customer({ name: 'A' }));

      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@ihfintech.com.pe',
        },
      ]);
      expect(repository.findByFilter).toBeCalledWith({
        name: 'A',
      });
    });

    it('should return customers using paramenter lastName', async () => {
      // Execute
      const response = await service.findByFilter(
        new Customer({ lastName: 'A' })
      );

      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@ihfintech.com.pe',
        },
      ]);
      expect(repository.findByFilter).toBeCalledWith({
        lastName: 'A',
      });
    });
  });
});
