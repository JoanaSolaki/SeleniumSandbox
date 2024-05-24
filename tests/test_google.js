const assert = require("assert");

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
            
            await driver.wait(until.titleContains('Chocobo'), 10000);
                let title = await driver.getTitle();
                assert(title.includes('Chocobo'));
            // let chocoboButton = setInterval(function () {
            //     driver.findElement(By.css(".XjRuUc.rBG7Lb.B28vwe"));
            //     chocoboButton.click();
            // }, 2000)

		} catch(e) {
			console.log(e);

		} finally {
            setTimeout(function(){
                driver.quit();
            }, 4000);
		}
}())
