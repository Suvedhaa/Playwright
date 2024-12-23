import { test, expect } from "@playwright/test";
import { Config } from './utils/read-env-utils';
import { readCsvFile } from './utils/read-csv-utils';

const csvFilePath = './tests/api-tests/test-data/test-data-post-create-users.csv';
const parsedData = readCsvFile(csvFilePath);

let response, responseBody, statusCode, statusMessage, name, job, id, createdAt, newNameValue, newJobValue;

test.describe.serial("POST Create API tests", () => {
    test("POST - Create - test1 - To create and view the response body", async ({ request }) => {
        newNameValue = parsedData[0].newName;
        newJobValue = parsedData[0].newJob;

        response = await request.post(`${process.env.BASE_URL_Users}`, {
            data: {
                "name": newNameValue,
                "job": newJobValue
            }
        });

        responseBody = await response.json();
        console.log(responseBody);

        statusCode = response.status();
        statusMessage = response.statusText();
        name = responseBody.name;
        job = responseBody.job;
        id = responseBody.id;
        createdAt = responseBody.createdAt;
    });

    test("test2 - To verify the status code and status message", async () => {
        await expect(statusCode).toBe(201);
        await expect(statusMessage).toBe("Created");
        console.log(`Status code = ${statusCode} , Status message = ${statusMessage}`);
    });

    test("test3 - To verify whether the id and createdAt fields generated for the newly created user", async () => {
        await expect(responseBody).toHaveProperty("id");
        await expect(responseBody).toHaveProperty("createdAt");
        console.log(`id = ${id} , createdAt = ${createdAt}`);
    });

    test("test4 - To verify whether the name and job of the created user is same as the given user details", async () => {
        await expect(name).toBe(newNameValue);
        await expect(job).toBe(newJobValue);
        console.log(`name = ${name} , job = ${job}`);
    });

    test("test5 - To verify whether all the necessary fields are present in the response body", async () => {
        await Promise.all([
            expect(responseBody).toHaveProperty("name"),
            expect(responseBody).toHaveProperty("job"),
            expect(responseBody).toHaveProperty("id"),
            expect(responseBody).toHaveProperty("createdAt")
        ]);
        console.log(responseBody);
    });

    test("test6 - To verify whether all the fields in the response body are string fields", async () => {
        await Promise.all([
            expect(typeof name).toBe('string'),
            expect(typeof job).toBe('string'),
            expect(typeof id).toBe('string'),
            expect(typeof createdAt).toBe('string')
        ]);
    });
});
