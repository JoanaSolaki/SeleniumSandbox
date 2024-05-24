const { mail, secret } = require("../loads.js");

const assert = require("assert");

const {By, Key, Builder, until} = require("selenium-webdriver");
require("geckodriver");

(async function test_simplonline(){
    let driver = await new Builder().forBrowser("firefox").build();

		try {
            driver.get("https://simplonline.co");

            let acceptButton = await driver.wait(until.elementLocated(By.xpath("//span[contains(text(), 'Accepter et continuer')]")));
            if (acceptButton) {
                await acceptButton.click();
            } else {
                console.log('Bouton tout accepter pas trouvée');
            };

            let usernameWrong = await driver.wait(until.elementLocated(By.name("email")),2000);
            await usernameWrong.sendKeys("Chocobo", Key.RETURN);

            let passwordWrong = await driver.findElement(By.name("password"));
            await passwordWrong.sendKeys("Chocobo", Key.RETURN);

            let errorMessageElement = await driver.wait(until.elementLocated(By.css('.sc-6a4c5dd9-0.hpuCSy.sc-7916b41a-0.jqHZDg')), 2000);
            let errorMessage = await errorMessageElement.getText();
            console.log(errorMessage);
            assert(errorMessage.includes('Adresse email invalide'));

            let usernameGood = await driver.wait(until.elementLocated(By.name("email")),2000);
            await usernameGood.click();
            await usernameGood.clear();
            await usernameGood.sendKeys(mail, Key.RETURN);

            let passwordGood = await driver.findElement(By.name("password"));
            await passwordGood.clear();
            await passwordGood.sendKeys(secret, Key.RETURN);

            let submitButton = await driver.findElement(By.css('button[type="submit"]'));
            submitButton.click();

            await driver.wait(until.titleContains('Bienvenue sur Simplonline'), 10000);
            let title = await driver.getTitle();
            assert(title.includes('Bienvenue sur Simplonline'));
            console.log(title);

            let briefButton = await driver.wait(until.elementLocated(By.css('a[href="/briefs/my-briefs"]')));
            briefButton.click();

            await driver.sleep(2000);

            let selenoiumSandboxButton = await driver.wait(until.elementLocated(By.xpath("//a[contains(text(), 'Selenium Sandbox')]")));
            selenoiumSandboxButton.click();

            let optionButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Options')]")));
            optionButton.click();

            let optionButtonMenu = await driver.wait(until.elementLocated(By.css('a[data-key="submitIndividualWork"]')));
            optionButtonMenu.click();

            let submitBriefButton = await driver.wait(until.elementLocated(By.xpath("//span[contains(text(), 'Soumettre un rendu')]")));
            submitBriefButton.click();

            let inputBrief = await driver.wait(until.elementLocated(By.css('input[placeholder="Coller votre URL ici..."]')));
            inputBrief.sendKeys("https://github.com/JoanaSolaki/SeleniumSandbox");

            let inputBriefPlus = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div[3]/div/div/div/div[2]/div/div/div/div/div/button')));
            inputBriefPlus.click();

            let messageBrief = await driver.findElement(By.css('textarea[placeholder="Envoyer un message avec le rendu..."]'));
            messageBrief.click();
            await messageBrief.sendKeys("Voici mon rendu fait avec le test !");

            let submitBriefButtonFinal = await driver.wait(until.elementLocated(By.xpath("//span[contains(text(), 'Envoyer')]")));
            submitBriefButtonFinal.click();

		} catch(e) {
			console.log(e);

		} finally {
            setTimeout(function(){
                driver.quit();
            }, 4000);
		}
}())
