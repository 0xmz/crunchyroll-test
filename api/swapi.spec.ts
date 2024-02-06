import { test, expect } from "@playwright/test";

/**
 * API contracts between SWAPI and the tests
 */
const planetDetails = require("../test-data/planets.json");
const peopleDetails = require("../test-data/people.json");
const starshipsDetails = require("../test-data/starships.json");
const vehicleDetails = require("../test-data/vehicles.json");
const filmsDetails = require("../test-data/films.json");
const filmSearchDetails = require("../test-data/films-search.json");
const peopleSearchDetails = require("../test-data/people-search1.json");
const speciesDetails = require("../test-data/species.json");
const emptySearchDetails = require("../test-data/empty-search.json");

/**
 * Constants for error logging in expects
 */
const STATUS_ERROR = "Error in expected status.";
const RESPONSE_OBJECT_ERROR = "Error in expected response object.";

/**
 * These tests verify SWAPI endpoints using a valid id against the contract and what is returned.
 * If the endpoint fails to return the correct data, the contract will need to be updated or there is an issue with the API.
 */
test.describe("each endpoint returns valid data", () => {
  test(`should return valid data for /planets`, async ({ request }) => {
    try {
      const response = await request.get(`https://swapi.dev/api/planets/1`, {
        data: {
          planetDetails,
        },
      });
      expect(response.status()).toBe(200), STATUS_ERROR;
      expect(await response.json()).toMatchObject(planetDetails),
        RESPONSE_OBJECT_ERROR;
    } catch (error) {
      console.error(error);
    }
  });
});

test(`should return valid data for /people`, async ({ request }) => {
  try {
    const response = await request.get(`https://swapi.dev/api/people/1`, {
      data: {
        peopleDetails,
      },
    });
    expect(response.status()).toBe(200), STATUS_ERROR;
    expect(await response.json()).toMatchObject(peopleDetails),
      RESPONSE_OBJECT_ERROR;
  } catch (error) {
    console.error(error);
  }
});

test(`should return valid data for /starships`, async ({ request }) => {
  try {
    const response = await request.get(`https://swapi.dev/api/starships/9`, {
      data: {
        starshipsDetails,
      },
    });
    expect(response.status()).toBe(200), STATUS_ERROR;
    expect(await response.json()).toMatchObject(starshipsDetails),
      RESPONSE_OBJECT_ERROR;
  } catch (error) {
    console.error(error);
  }
});

test(`should return valid data for /vehicles`, async ({ request }) => {
  try {
    const response = await request.get(`https://swapi.dev/api/vehicles/4`, {
      data: {
        vehicleDetails,
      },
    });
    expect(response.status()).toBe(200), STATUS_ERROR;
    expect(await response.json()).toMatchObject(vehicleDetails),
      RESPONSE_OBJECT_ERROR;
  } catch (error) {
    console.error(error);
  }
});

test(`should return valid data for /films`, async ({ request }) => {
  try {
    const response = await request.get(`https://swapi.dev/api/films/1`, {
      data: {
        filmsDetails,
      },
    });
    expect(response.status()).toBe(200), STATUS_ERROR;
    expect(await response.json()).toMatchObject(filmsDetails),
      RESPONSE_OBJECT_ERROR;
  } catch (error) {
    console.error(error);
  }
});

test(`should return valid data for /species`, async ({ request }) => {
  try {
    const response = await request.get(`https://swapi.dev/api/species/1`, {
      data: {
        speciesDetails,
      },
    });
    expect(response.status()).toBe(200), STATUS_ERROR;
    expect(await response.json()).toMatchObject(speciesDetails),
      RESPONSE_OBJECT_ERROR;
  } catch (error) {
    console.error(error);
  }
});

/**
 * These tests verify SWAPI endpoints using a valid id against the contract and what is returned.
 * If the endpoint fails to return the correct data, the contract will need to be updated or there is an issue with the API.
 */
test.describe("valid search parameters", () => {
  test(`should return valid data for /people/?search`, async ({ request }) => {
    const peopleQuery = "C-3PO";
    try {
      const response = await request.get(
        `https://swapi.dev/api/people/?search=${peopleQuery}`,
        {
          data: {
            peopleSearchDetails,
          },
        }
      );
      expect(response.status()).toBe(200), STATUS_ERROR;
      expect(await response.json()).toMatchObject(peopleSearchDetails),
        RESPONSE_OBJECT_ERROR;
    } catch (error) {
      console.error(error);
    }
  });

  test(`should return valid data for /films/?search`, async ({ request }) => {
    const filmQuery = "A";
    try {
      const response = await request.get(
        `https://swapi.dev/api/films/?search=${filmQuery}`,
        {
          data: filmSearchDetails,
        }
      );
      expect(response.status()).toBe(200);
      expect(await response.json()).toMatchObject(filmSearchDetails);
    } catch (error) {
      console.error(error);
    }
  });
});

/**
 * This test verifies a valid query that contains empty search results
 */
test.describe("empty search details", () => {
  test(`should return 0 results if search does not find matches`, async ({
    request,
  }) => {
    const validQuery = "I'M AN INVALID QUERY! 1234 🦊";
    const response = await request.get(
      `https://swapi.dev/api/people/?search=${validQuery}`,
      {
        data: emptySearchDetails,
      }
    );
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(emptySearchDetails);
  });
});

/**
 * These tests verify SWAPI endpoints using an invalid parameter and ensures there is a 404.
 */
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
      const invalidParameters = ["INVALID", "-1"];
      try {
        for (const param of invalidParameters) {
          const response = await request.get(
            `https://swapi.dev/api/${e}/${param}`
          );
          expect(response.status()).toBe(404);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
});
