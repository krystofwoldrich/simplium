# Simplium

Simplium is a simple and lightweight Appium script to launch and test iOS or Android apps with Appium. This repository provides a minimal Appium setup to automate interactions on iOS or Android devices and simulators.

## Why?

I enjoy the simplicity of Maestro Mobile, but I miss the Jest matchers for asserting complex JavaScript objects. I’ve also tried Detox, which is super simple to run on iOS, but I encountered issues with Android tests changing the behavior of the app’s context providers.

So, I thought, there must be a way to use Appium in a simple manner without a complex setup. And if not, I'll create something new.

## Get started

```bash
cd samples
unzip wikipedia.zip
cd ..

yarn

node test.mjs
```
