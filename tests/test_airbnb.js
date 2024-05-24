const assert = require("assert");

const {By, Key, Builder, until} = require("selenium-webdriver");
require("geckodriver");

(async function test_airbnb(){
    let driver = await new Builder().forBrowser("firefox").build();

    const variantes = [
        { city: "Nîmes", arrivalDate: "19/06/2024", startDate: "20/06/2024", adults: 2, children: 1, babies: 1 },
        { city: "Paris", arrivalDate: "10/06/2024", startDate: "15/06/2024", adults: 3, children: 2, babies: 0 },
        { city: "Marseille", arrivalDate: "05/06/2024", startDate: "10/06/2024", adults: 1, children: 0, babies: 2 }
    ];

    try {
        const randomIndex = Math.floor(Math.random() * variantes.length);
        const variante = variantes[randomIndex];
    
        driver.get("https://www.airbnb.fr/");
        
        let acceptButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Continuer sans accepter')]")));
        if (acceptButton) {
            await acceptButton.click();
        } else {
            console.log('Bouton tout accepter pas trouvée');
        };
        
        let destinationInput = await driver.wait(until.elementLocated(By.css('input[data-testid="structured-search-input-field-query"]')), 4000);
        destinationInput.click();
        await destinationInput.sendKeys(variante.city, Key.RETURN);

        let inputArrival = await driver.wait(until.elementLocated(By.css('div[data-testid="structured-search-input-field-split-dates-0"]')));
        await inputArrival.click();

        let dateArrival = await driver.wait(until.elementLocated(By.css(`div[data-testid="calendar-day-${variante.arrivalDate}"]`)));
        await dateArrival.click();

        let inputStart = await driver.wait(until.elementLocated(By.css('div[data-testid="structured-search-input-field-split-dates-1"]')));
        await inputStart.click();

        let dateStart = await driver.wait(until.elementLocated(By.css(`div[data-testid="calendar-day-${variante.startDate}"]`)));
        await dateStart.click();

        let traveler = await driver.wait(until.elementLocated(By.css('div[data-testid="structured-search-input-field-guests-button"]')));
        await traveler.click();

        let travelerAdult = await driver.wait(until.elementLocated(By.css('button[data-testid="stepper-adults-increase-button"]')));
        for (let i = 0; i < variante.adults; i++) {
            await travelerAdult.click();
        }

        let travelerChildren = await driver.wait(until.elementLocated(By.css('button[data-testid="stepper-children-increase-button"]')));
        for (let i = 0; i < variante.children; i++) {
            await travelerChildren.click();
        }

        let travelerBaby = await driver.wait(until.elementLocated(By.css('button[data-testid="stepper-infants-increase-button"]')));
        for (let i = 0; i < variante.babies; i++) {
            await travelerBaby.click();
        }

        let searchButton = await driver.wait(until.elementLocated(By.css('button[data-testid="structured-search-input-search-button"]')));
        await searchButton.click();

        await driver.wait(until.titleContains(variante.city), 2000);
        let title = await driver.getTitle();
        assert(title.includes(variante.city));
        console.log(title);

    } catch(e) {
        console.log(e);

    } finally {
        setTimeout(function(){
            driver.quit();
        }, 4000);
    }
}())
