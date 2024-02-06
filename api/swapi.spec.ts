import { test, expect } from "@playwright/test";

const planetDetails = require("../test-data/planets.json");

test.describe("/planets endpoint valid response", () => {
  test(`should return valid data for /planets}`, async ({ request }) => {
    const response = await request.get(`https://swapi.dev/api/planets/1`, {
      data: planetDetails,
    });
    const responseBody = await response.json();
    console.log("Response body: ", responseBody);
    expect(response.status()).toBe(200);
    for (const property of Object.keys(planetDetails)) {
      expect(responseBody).toHaveProperty(property, planetDetails[property]);
    }
  });
});

// test.describe("/planets endpoint valid response", () => {
//   test(`should return valid data for /planets}`, async ({ request }) => {
//     const response = await request.get(`https://swapi.dev/api/planets/1`, {
//       data: planetDetails,
//     });
//     const responseBody = await response.json();
//     console.log("Response body: ", responseBody);
//     expect(response.status()).toBe(200);
//     for (const property of Object.keys(planetDetails)) {
//       expect(responseBody).toHaveProperty(property, planetDetails[property]);
//     }
//   });
// });

test.describe("SWAPI endpoint search", () => {});

test.describe("SWAPI Invalid Response Codes", () => {
  const ENDPOINTS = [
    "planets",
    "people",
    "starships",
    "vehicles",
    "films",
    "species",
  ];

  for (const endpoint of ENDPOINTS) {
    test(`should return 404 for each ${endpoint}`, async ({ request }) => {
      const response = await request.get(
        `https://swapi.dev/api/${endpoint}/INVALID_PARAMETER`
      );
      const responseBody = await response.json();
      expect(response.status()).toBe(404);
    });
  }
});
