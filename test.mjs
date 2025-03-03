import process from 'node:process';

import appium from 'appium';
import { remote } from 'webdriverio';

const APPIUM_HOST = '127.0.0.1';
const APPIUM_PORT = 4723;
const BASE_PATH = '/';

let driver;
let appiumServer;

// Start Appium server
console.log('Starting Appium server...');
appiumServer = await appium.main({
  address: APPIUM_HOST,
  port: APPIUM_PORT,
  basePath: BASE_PATH,
  allowCors: true,
});

console.log(`✅ Appium server started on ${APPIUM_HOST}:${APPIUM_PORT}`);

// Setup driver
const capabilities = {
  platformName: 'iOS',
  'appium:app': 'samples/Wikipedia.app', // Path to the .app file or .ipa
  'appium:automationName': 'XCUITest', // Use XCUITest for iOS
  // platformName: 'Android',
  // 'appium:automationName': 'UiAutomator2',
  // 'appium:deviceName': 'Android',
  // 'appium:app': 'samples/wikipedia.apk',
  // 'appium:appWaitPackage': 'com.google.android.permissioncontroller',
  // 'appium:appWaitActivity': 'com.android.permissioncontroller.permission.ui.GrantPermissionsActivity',
};

const wdOpts = {
  hostname: APPIUM_HOST,
  port: APPIUM_PORT,
  capabilities,
};

driver = await remote(wdOpts);
console.log(`🔄 Initializing session...`);
console.log(`✅ Session started!`);

// Run test
try {
  console.log('🔍 Running test...');

  // const searchBox = await driver.elementByAccessibilityId('Search Wikipedia');
  // await searchBox.click();

  // const allowButton = await driver.$('//*[@text="Allow"]');
  // await allowButton.click();

  // const continueButton = await driver.$('//*[@text="CONTINUE"]');
  // await continueButton.click();

  const selector = `value CONTAINS 'Next'`;
  const nextButton = await driver.$(`-ios predicate string:${selector}`)
  await nextButton.click()

  console.log('✅ Test Passed: Search box clicked successfully!');
} catch (error) {
  console.error('❌ Test failed:', error);
}

// Stop Appium server
if (driver) {
  console.log('🔴 Quitting driver session...');
  await driver.pause(1000);
  await driver.deleteSession();
}
if (appiumServer) {
  console.log('🔴 Stopping Appium server...');
  await appiumServer.close();
}
console.log('✅ Appium server stopped.');
process.exit(0);
