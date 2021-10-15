"use strict";
const assert = require('assert');
const assertChai = require('chai/lib/chai/interface/assert');

const {Builder, By, until} = require('selenium-webdriver');
const faker = require('faker');

describe('hooks', async function () {
  const driver = await new Builder()
    .forBrowser('firefox')
    .build();
  before(async function () {

  });

  after(async function () {
    await driver.quit();
    // runs once after the last test in this block
  });

});

describe('1', function () {


  it('1', async function () {

    const driver = await new Builder()
      .forBrowser('firefox')
      .build();
    await driver.get('https://appfollow.io/ru');
    const allowCookies = await driver.findElement(By.className('guide-header__title'));
    await driver.wait(until.elementIsVisible(allowCookies), 10000, "Allow cookies button is absent");
    await allowCookies.click();

    const element = await driver.findElement(By.className('open_signup_popup'));
    await element.click();

    const regForm = await driver.findElement(By.className('register'));
    await driver.wait(until.elementIsVisible(regForm), 10000, "Register form isn\'t shown");

    const emailField = await driver.findElement(By.name('email'));
    await emailField.sendKeys((faker.internet.email()));
    //await emailField.sendKeys(faker.name.lastName(faker.name.gender()) + '@gmail.com');

    const fullNameField = await driver.findElement(By.name('full_name'));
    await fullNameField.sendKeys(faker.name.lastName(faker.name.gender()));

    const companyField = await driver.findElement(By.name('company'));
    await companyField.sendKeys(faker.random.word());

    const positionSelector = await driver.findElement(By.className('register-form__dropdown-wrapper'));
    await positionSelector.click();

    const positionSelectorStudent = await driver.findElement(By.xpath('//*[@id="signup-payed-position"]/option[15]'));
    await driver.wait(until.elementIsVisible(positionSelectorStudent), 10000, "For some reasons can\'t see dropdown");
    await positionSelectorStudent.click();

    const signUpButton = await driver.findElement(By.id('payed-signup-button'));
    await driver.wait(until.elementIsVisible(signUpButton), 10000, "Signup button is absent");
    await signUpButton.click();

    await driver.sleep(2000);

    async function checkCondition() {
      const signUpError = await driver.findElement(By.id('signup-payed-error'));//элемент с ошибкой
      const confirmationForm = await driver.findElement(By.className('validate'));
      if (typeof confirmationForm === element) {
        const a = new Promise(resolve => setTimeout(function () {
          resolve("Success!");
        }, 10000));
        console.log(a.resolved);
      }
      else if (typeof signUpError === element) {
        throw new Error('Some field filled incorrect, check data.')
      }
      else {
        throw new Error('After click on signUp button appear undefined problem');
      }

    }

    await checkCondition();

    //
    // //await driver.findElement(By.id('signup-payed-error'));//элемент с ошибкой
    //
    // const confirmationForm = await driver.findElement(By.className('validate'));
    // await driver.wait(until
    //   .elementIsVisible(confirmationForm), 5000, "After click register button Test not finished correctly.")
    // ;

    // await driver.quit();

  }).timeout(20000);

});
