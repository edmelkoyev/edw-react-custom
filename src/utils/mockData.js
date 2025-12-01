import { faker } from '@faker-js/faker';

export function generateUsers(count = 1000) {
  return Array.from({ length: count }, () => ({
    id: `usr-${faker.random.alphaNumeric(5)}`, 
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number({ min: 18, max: 85 }),
    phone: faker.phone.phoneNumber(),
    location: faker.address.country()
  }));
}