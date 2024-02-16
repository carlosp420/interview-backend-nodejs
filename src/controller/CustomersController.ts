import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersService } from '../service/CustomersService';
import { Customer } from '../domain/Customer';

export class CustomersController {
  constructor(private service: CustomersService) {}

  async findByFilter(event: APIGatewayProxyEvent) {
    const name = event.queryStringParameters?.name;
    const lastName = event.queryStringParameters?.lastName;

    if (!name && !lastName) {
      return this.apiResponseBadRequestError();
    }

    // return when user sent "name" in query
    if (name && !lastName) {
      return this.apiResponseOk(
        await this.service.findByFilter(new Customer({ name }))
      );
    }

    // return when user sent "lastName" in query
    if (!name && lastName) {
      return this.apiResponseOk(
        await this.service.findByFilter(new Customer({ lastName }))
      );
    }

    // return when user sent "name" and "lastName" in query
    return this.apiResponseOk(
      await this.service.findByFilter(new Customer({ name, lastName }))
    );
  }

  apiResponseBadRequestError() {
    return {
      statusCode: 400,
      isBase64Encoded: false,
    };
  }

  apiResponseOk(customers: Customer[]) {
    return {
      statusCode: 200,
      isBase64Encoded: false,
      body: JSON.stringify(customers),
    };
  }
}
