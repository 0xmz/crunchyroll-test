import { test, expect } from "@playwright/test";

const planetDetails = require("../test-data/planets.json");
const peopleDetails = require("../test-data/people.json");
const starshipsDetails = require("../test-data/starships.json");
const vehicleDetails = require("../test-data/vehicles.json");
const filmsDetails = require("../test-data/films.json");
const filmSearchDetails = require("../test-data/films-search.json");
const peopleSearchDetails = require("../test-data/people-search1.json");

test.describe("each endpoint returns valid data", () => {
  test(`should return valid data for /planets`, async ({ request }) => {
    const response = await request.get(`https://swapi.dev/api/planets/1`, {
      data: {
        planetDetails,
      },
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(planetDetails);
  });
});

test(`should return valid data for /people`, async ({ request }) => {
  const response = await request.get(`https://swapi.dev/api/people/1`, {
    data: {
      peopleDetails,
    },
  });
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject(peopleDetails);
});

test(`should return valid data for /starships`, async ({ request }) => {
  const response = await request.get(`https://swapi.dev/api/starships/9`, {
    data: starshipsDetails,
  });
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject(starshipsDetails);
});

test(`should return valid data for /vehicles`, async ({ request }) => {
  const response = await request.get(`https://swapi.dev/api/vehicles/4`, {
    data: vehicleDetails,
  });
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject(vehicleDetails);
});

test(`should return valid data for /films`, async ({ request }) => {
  const response = await request.get(`https://swapi.dev/api/films/1`, {
    data: filmsDetails,
  });
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject(filmsDetails);
});

test.describe("valid search parameters", () => {
  test(`should return valid data for /people/?search`, async ({ request }) => {
    const peopleQuery = "C-3PO";
    const response = await request.get(
      `https://swapi.dev/api/people/?search=${peopleQuery}`,
      {
        data: peopleSearchDetails,
      }
    );
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(peopleSearchDetails);
  });

  test(`should return valid data for /films/?search`, async ({ request }) => {
    const filmQuery = "A";
    const response = await request.get(
      `https://swapi.dev/api/films/?search=${filmQuery}`,
      {
        data: filmSearchDetails,
      }
    );
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(filmSearchDetails);
  });
});

test.describe("invalid parameter returns 404", () => {
  const endpoints = [
    "planets",
    "people",
    "starships",
    "vehicles",
    "films",
    "species",
  ];
  for (const e of endpoints) {
    test(`should return 404 for each ${e}`, async ({ request }) => {
      const response = await request.get(
        `https://swapi.dev/api/${e}/INVALID_PARAMETER`
      );
      expect(response.status()).toBe(404);
    });
  }
});
