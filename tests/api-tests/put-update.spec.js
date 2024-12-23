import { test, expect } from "@playwright/test";
import { Config } from './utils/read-env-utils';
import { readCsvFile } from './utils/read-csv-utils';

const csvFilePath = './tests/api-tests/test-data/test-data-post-put-delete-users.csv';
const parsedData = readCsvFile(csvFilePath);

let response, responseBody, statusCode, statusMessage, name, job, phone, isCreate, isUpdate, id, createdAt, updatedAt, newNameValue, newJobValue, newPhoneValue, isCreateValue, updateNameValue, updateJobValue, updatePhoneValue, isUpdateValue;

test.describe.serial("PUT Update API tests", () => {
    test("POST - Create - test1 - To create and view the response body", async ({ request }) => {
        newNameValue = parsedData[0].newName;
        newJobValue = parsedData[0].newJob;
        newPhoneValue = parsedData[0].newPhone;
        isCreateValue = parsedData[0].isCreate;

        response = await request.post(`${process.env.BASE_URL_Users}`, {
            data: {
                "name": newNameValue,
                "job": newJobValue,
                "phone": newPhoneValue,
                "isCreate": isCreateValue
            }
        });

        responseBody = await response.json();
        console.log(responseBody);

        createdAt = responseBody.createdAt;
        isCreate = responseBody.isCreate;
    });

    test("PUT - Update - test2 - To update and view the response body", async ({ request }) => {
        updateNameValue = parsedData[0].updateName;
        updateJobValue = parsedData[0].updateJob;
        updatePhoneValue = parsedData[0].updatePhone;
        isUpdateValue = parsedData[0].isUpdate;

        id = responseBody.id;

        response = await request.put(`${process.env.BASE_URL_Users}/${id}`, {
            data: {
                "name": updateNameValue,
                "job": updateJobValue,
                "phone": updatePhoneValue,
                "isUpdate": isUpdateValue
            }
        });

        responseBody = await response.json();
        console.log(responseBody);

        statusCode = response.status();
        statusMessage = response.statusText();
        name = responseBody.name;
        job = responseBody.job;
        phone = responseBody.phone;
        isUpdate = responseBody.isUpdate;
        updatedAt = responseBody.updatedAt;
    });

    test("test3 - To verify the status code and status message", async () => {
        await expect(statusCode).toBe(200);
        await expect(statusMessage).toBe("OK");
        console.log(`Status code = ${statusCode} , Status message = ${statusMessage}`);
    });

    test("test4 - To verify whether the updatedAt field is generated for the updated user", async () => {
        await expect(responseBody).toHaveProperty("updatedAt");
        console.log(`updatedAt = ${updatedAt}`);
    });

    test("test4 - To verify whether the name and job of the created user is same as the given user details", async () => {
        await Promise.all([
            expect(name).toBe(updateNameValue),
            expect(job).toBe(updateJobValue),
            expect(phone).toBe(updatePhoneValue),
            expect(isUpdate).toBe(isUpdateValue)
        ]);
    });

    test("test6 - To verify whether all the necessary fields are present in the response body", async () => {
        await Promise.all([
            expect(responseBody).toHaveProperty("name"),
            expect(responseBody).toHaveProperty("job"),
            expect(responseBody).toHaveProperty("phone"),
            expect(responseBody).toHaveProperty("isUpdate"),
            expect(responseBody).toHaveProperty("updatedAt")
        ]);
        console.log(responseBody);
    });

    test("test7 - To verify isCreate, createdAt and id field does not present in the response body", async () => {
        await expect(responseBody).not.toHaveProperty("isCreate");
        await expect(responseBody).not.toHaveProperty("id");
        await expect(responseBody).not.toHaveProperty("createdAt");
    });

    test("test8 - To verify whether all the fields in the response body are string fields", async () => {
        await Promise.all([
            expect(typeof name).toBe('string'),
            expect(typeof job).toBe('string'),
            expect(typeof phone).toBe('string'),
            expect(typeof isUpdate).toBe('string'),
            expect(typeof updatedAt).toBe('string')
        ]);
    });
});
