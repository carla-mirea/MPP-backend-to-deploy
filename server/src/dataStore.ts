import { Monitor } from "./model/monitor";
import { faker } from '@faker-js/faker';
import { Review } from "./model/review";
import { createReview } from "./dataStoreReviews";
import db from "./db";

let monitorIdCounter: number = 1;

export function generateUniqueId(): number {
    return monitorIdCounter++;
}

const brands = [
    "Acer",
    "Asus",
    "Dell",
    "HP",
    "LG",
    "Samsung",
    "BenQ",
    "ViewSonic",
    "Alienware",
    "MSI",
  ];

const refreshRates = ["60Hz", "120Hz", "144Hz", "240Hz"];

export function createMonitor(): Monitor {
    const id = generateUniqueId();
    const brand = brands[faker.number.int({min: 0, max: brands.length - 1})];
    const refreshRate = refreshRates[faker.number.int({min: 0, max: refreshRates.length - 1})];
    const image = faker.image.url();

    const newMonitor = new Monitor(id, brand, refreshRate, image);

    // Insert the new monitor into the database
    const sql = `INSERT INTO monitors (id, brand, refreshRate, pictureUrl) VALUES (?, ?, ?, ?)`;
    const params = [newMonitor.getId(), newMonitor.getBrand(), newMonitor.getRefreshRate(), newMonitor.getPictureUrl()];

    db.run(sql, params, (err) => {
        if (err) {
            console.error('Error inserting monitor into database:', err);
        } else {
            console.log('Monitor inserted into database:', newMonitor);
        }
    });

    return newMonitor;
}

export const monitors: Monitor[] = Array.from({ length: 20 }, () => {
    const newMonitor = createMonitor();
    
    return newMonitor;
});