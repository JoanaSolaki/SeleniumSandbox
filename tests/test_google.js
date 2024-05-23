// // const {By, Key, Builder, WebElementCondition, until} = require("selenium-webdriver");
// const {Browser} = require('selenium-webdriver');
// const {suite} = require('selenium-webdriver/testing');
// const firefox = require('selenium-webdriver/firefox');
// // const assert = require("assert");

const {By, Key, Builder, until} = require("selenium-webdriver");
require("geckodriver");

(async function test_google(){
    let driver = await new Builder().forBrowser("firefox").build();

		try {
            driver.get("https://www.google.fr/");
            let acceptButton = await driver.wait(until.elementLocated(By.css('.QS5gu.sy4vM')), 5000);
                if (acceptButton) {
                    await acceptButton.click();
                } else {
                    console.log('Bouton tout accepter pas trouvée');
                }
            let textBox = driver.findElement(By.name("q"));
            textBox.sendKeys("Chocobo", Key.RETURN);
            let chocoboButton = setInterval(function () {
                driver.findElement(By.css(".XjRuUc.rBG7Lb.B28vwe"));
                chocoboButton.click();
            }, 2000)

		} catch(e) {
			console.log(e);

		} finally {
            setInterval(function(){
                driver.quit();
            }, 10000);
		}
}())
