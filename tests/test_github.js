const assert = require("assert");

const {By, Key, Builder, until} = require("selenium-webdriver");
require("geckodriver");

(async function test_github(){
    let driver = await new Builder().forBrowser("firefox").build();

		try {
            driver.get("https://github.com/");
            // let acceptButton = await driver.wait(until.elementLocated(By.css('.QS5gu.sy4vM')), 5000);
            //     if (acceptButton) {
            //         await acceptButton.click();
            //     } else {
            //         console.log('Bouton tout accepter pas trouvée');
            //     }
            let signIn = driver.findElement(By.css(".HeaderMenu-link--sign-in"));
            signIn.click();

            await driver.wait(until.titleContains('Sign in'), 10000);
            let title = await driver.getTitle();
            assert(title.includes('Sign in'));
            console.log(title);

            let username = await driver.wait(until.elementLocated(By.name("login")),2000);
            await username.sendKeys("Chocobo", Key.RETURN);
            let password = await driver.findElement(By.name("password"));
            await password.sendKeys("Chocobo", Key.RETURN);

            let errorMessageElement = await driver.wait(until.elementLocated(By.css('#js-flash-container .flash-error')), 2000);
            let errorMessage = await errorMessageElement.getText();
            console.log(errorMessage);
            assert(errorMessage.includes('Incorrect username or password.'));

		} catch(e) {
			console.log(e);

		} finally {
            setTimeout(function(){
                driver.quit();
            }, 4000);
		}
}())
