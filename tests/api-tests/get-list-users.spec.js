import { test, expect } from "@playwright/test";
import { Config } from './utils/read-env-utils';
import { readCSV } from './utils/read-csv-utils';

test("GET - List Users - test1 - To view response body", async ({ request }) => {
    const response = await request.get(`${process.env.BASE_URL}`);
    const responseBody = await response.json();
    console.log(responseBody);
});

test("GET - List Users - test2 - To verify status code and message", async ({ request }) => {
    const response = await request.get(`${process.env.BASE_URL}`);
    const statusCode = response.status();
    const statusMessage = response.statusText();

    console.log(`Status code = ${statusCode} , Status message = ${statusMessage}`);

    await expect(statusCode).toBe(200);
    await expect(statusMessage).toBe("OK");
});

test("GET - List Users - test3 - To verify the fields in the response body", async ({ request }) => {
    const response = await request.get(`${process.env.BASE_URL}`);
    const responseBody = await response.json();
    console.log(responseBody);

    await expect(responseBody).toHaveProperty('page');
    await expect(responseBody).toHaveProperty('per_page');
    await expect(responseBody).toHaveProperty('total');
    await expect(responseBody).toHaveProperty('total_pages');
    await expect(responseBody).toHaveProperty('data');
    await expect(responseBody).toHaveProperty('support');
});

test("GET - List Users - test4 - To verify the fields in the data array", async ({ request }) => {
    const response = await request.get(`${process.env.BASE_URL}`);
    const responseBody = await response.json();
    const data = responseBody.data;

    data.forEach(user => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('first_name');
        expect(user).toHaveProperty('last_name');
        expect(user).toHaveProperty('avatar');
    });
});

test("GET - List Users - test5 - To verify the values of the fields in the data array - w/o test-data.csv", async ({ request }) => {
    const response = await request.get(`${process.env.BASE_URL}`);
    const responseBody = await response.json();
    const data = responseBody.data;

    console.log(data[0]);

    await expect(data[0].id).toBe(1);
    await expect(data[0].email).toBe("george.bluth@reqres.in");
    await expect(data[0].first_name).toBe("George");
    await expect(data[0].last_name).toBe("Bluth");
    await expect(data[0].avatar).toBe("https://reqres.in/img/faces/1-image.jpg");
});

test("GET - List Users - test6 - To verify the values of the fields in the data array", async ({ request }) => {
    const response = await request.get(`${process.env.BASE_URL}`);
    const responseBody = await response.json();
    const totalResults = responseBody.total;

    const newResponse = await request.get(`${process.env.BASE_URL}?per_page=${totalResults}`);
    const newResponseBody = await newResponse.json();

    const data = newResponseBody.data;

    const testData = await readCSV('tests/api-tests/test-data/test-data-get-list-users.csv');

    for (const [index, expectedUser] of testData.entries()) {
        const actualUser = data[index];
        console.log(actualUser);

        await expect(actualUser.id).toBe(parseInt(expectedUser.id));
        await expect(actualUser.email).toBe(expectedUser.email);
        await expect(actualUser.first_name).toBe(expectedUser.first_name);
        await expect(actualUser.last_name).toBe(expectedUser.last_name);
        await expect(actualUser.avatar).toBe(expectedUser.avatar);
    }
});

test("GET - List Users - test7 - To verify whether default page value 1 is shown", async ({ request }) => {
    const response = await request.get(`${process.env.BASE_URL}`);
    const responseBody = await response.json();
    const page = responseBody.page;
    console.log(`Page = ${page}`);
    await expect(page).toBe(1);
});

test("GET - List Users - test8 - To verify whether default per user page limit value 6 is shown", async ({ request }) => {
    const response = await request.get(`${process.env.BASE_URL}`);
    const responseBody = await response.json();
    const perPage = responseBody.per_page;
    console.log(`User per page = ${perPage}`);
    await expect(perPage).toBe(6);
});

test("GET - List Users - test9 - To verify the total pages value with dynamic per page value and total users", async ({ request }) => {
    const perPageValue = 19; // give any value

    const response = await request.get(`${process.env.BASE_URL}?per_page=${perPageValue}`);
    const responseBody = await response.json();

    const page = responseBody.page;
    const total = responseBody.total;
    const per_page = responseBody.per_page;
    const total_pages = responseBody.total_pages;

    const expectedTotalPages = Math.ceil(total / per_page);

    console.log(`Page: ${page}, Total: ${total}, Per Page: ${per_page}, Total Pages: ${total_pages}, Expected Total Pages: ${expectedTotalPages}`);

    await expect(total_pages).toBe(expectedTotalPages);
});

test("GET - List Users - test10 - To verify the page value when page=pageValue given as a param", async ({ request }) => {
    const pageValue = 2; // give any value
    const response = await request.get(`${process.env.BASE_URL}?page=${pageValue}`);
    const responseBody = await response.json();
    const page = responseBody.page;
    console.log(`Page = ${page}`);
    await expect(page).toBe(pageValue);
});

test("GET - List Users - test11 - To verify 404 Not found error thrown - when invalid url is given", async ({ request }) => {
    const response = await request.get('https://reqres.in/apiusers');
    const statusCode = response.status();
    const statusMessage = response.statusText();

    console.log(`Status code = ${statusCode} , Status message = ${statusMessage}`);

    await expect(statusCode).toBe(404);
    await expect(statusMessage).toBe("Not Found");
});