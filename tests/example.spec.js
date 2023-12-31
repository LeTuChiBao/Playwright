import { test } from "@playwright/test"; // expect isn't being used
const {SampleAppPage} = require("../models/sameple-app.model")
import * as dotenv from 'dotenv'
dotenv.config() 
let username = process.env.USERNAME
let password = process.env.PASSWORD

test.describe.parallel('suite',()=> {
  test("login success", async ({ page }) => {
    console.log(process.env.USERNAME)
    console.log(username)
    const samepleAppPage = new SampleAppPage(page)
    await samepleAppPage.navigateToSampleApp()
    await samepleAppPage.fillUsernameField(username)
    await samepleAppPage.fillPasswordField(password)
    await samepleAppPage.clickLoginButton()
    await samepleAppPage.expectedLoginTextTobe(`Welcome, ${username}!`)

  });

  test("wrong password", async ({ page }) => {
    const samepleAppPage = new SampleAppPage(page)
    await samepleAppPage.navigateToSampleApp()
    await samepleAppPage.fillUsernameField(username)
    await samepleAppPage.fillPasswordField("Wrongpass")
    await samepleAppPage.clickLoginButton()
    await samepleAppPage.expectedLoginTextTobe("Invalid username/password")
  });

  test("No User name", async ({ page }) => {
    const samepleAppPage = new SampleAppPage(page)
    await samepleAppPage.navigateToSampleApp()
    await samepleAppPage.fillUsernameField("")
    await samepleAppPage.fillPasswordField(password)
    await samepleAppPage.clickLoginButton()
    await samepleAppPage.expectedLoginTextTobe("Invalid username/password")
  });

  test("Logout", async ({ page }) => {
    const samepleAppPage = new SampleAppPage(page)
    await samepleAppPage.navigateToSampleApp()
    await samepleAppPage.fillUsernameField(username)
    await samepleAppPage.fillPasswordField(password)
    await samepleAppPage.clickLoginButton()
    await samepleAppPage.expectedLoginTextTobe(`Welcome, ${username}!`)
    await samepleAppPage.clickLogoutButton()
    await samepleAppPage.expectedLoginTextTobe("User logged out.")
  });
})
