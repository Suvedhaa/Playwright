import { test, expect } from "@playwright/test";

test("API test1", async ({request}) => {

    let response = await request.get('https://reqres.in/api/users/2');
    console.log( await response.json());

    const statusCode = await response.status();
    console.log("Status code = " + statusCode);

    await expect (statusCode).toBe(200);

}
);