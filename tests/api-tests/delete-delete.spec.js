import { test, expect } from "@playwright/test";
import { Config } from './utils/read-env-utils';
import { readCsvFile } from './utils/read-csv-utils';

const csvFilePath = './tests/api-tests/test-data/test-data-post-put-delete-users.csv';
const parsedData = readCsvFile(csvFilePath);

let response, responseBody, statusCode, statusMessage, name, job, phone, isCreate, isUpdate, id, createdAt, updatedAt, newNameValue, newJobValue, newPhoneValue, isCreateValue, updateNameValue, updateJobValue, updatePhoneValue, isUpdateValue;

test.describe.serial("Delete API tests", () => {
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

    test("DELETE - Delete - test3 - To delete and view the response body", async ({ request }) => {

        id = responseBody.id;

        response = await request.delete(`${process.env.BASE_URL_Users}/${id}`);

        statusCode = response.status();
        statusMessage = response.statusText();

    });

    test("test4 - To verify the status code and status message", async () => {
        await expect(statusCode).toBe(204);
        await expect(statusMessage).toBe("No Content");
        console.log(`Status code = ${statusCode} , Status message = ${statusMessage}`);
    });
});
