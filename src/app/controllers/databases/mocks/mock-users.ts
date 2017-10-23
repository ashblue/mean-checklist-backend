import faker = require('faker');

const password = 'asdfasdf';

export const mockUsers = [
    {
        name: faker.name.findName(),
        email: 'asdf@asdf.com',
        password,
    },
    {
        name: faker.name.findName(),
        email: 'asdf@qwerty.com',
        password,
    },
    {
        name: faker.name.findName(),
        email: 'qwerty@qwerty.com',
        password,
    },
];
