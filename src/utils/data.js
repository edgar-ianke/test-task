import { faker, Faker, ru } from "@faker-js/faker";

const customFaker = new Faker({ locale: [ru] });

const cities = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
  "Нижний Новгород",
  "Челябинск",
  "Самара",
  "Омск",
  "Ростов-на-Дону",
];
const institutions = ["МГУ", "СПбГУ", "НГУ", "КФУ", "УрФУ", "ТПГУ", "НИУ ВШЭ"];
const professions = ["Программист", "Инженер", "Учитель", "Врач", "Юрист", "Дизайнер", "Экономист", "Журналист"];

export function createMockData() {
  const data = {};
  for (let i = 0; i < 100; i++) {
    const sex = Math.random() > 0.5 ? "female" : "male";
    data[i + 1] = {
      avatar: null,
      id: i + 1,
      firstName: customFaker.person.firstName(sex),
      middleName: customFaker.person.middleName(sex),
      lastName: customFaker.person.lastName(sex),
      birthPlace: faker.helpers.arrayElement(cities),
      education: faker.helpers.arrayElement(institutions),
      occupation: faker.helpers.arrayElement(cities),
      profession: faker.helpers.arrayElement(professions),
      birthDate:  faker.date.birthdate(),
    };
  }
  return data;
}

export const data = createMockData();
