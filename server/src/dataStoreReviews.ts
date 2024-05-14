import { monitors } from "./dataStore";
import { Review } from "./model/review";
import { faker } from '@faker-js/faker';

let reviewIdCounter: number = 1;

export function generateReviewId(): number {
    return reviewIdCounter++;
}

const ratings = [1, 2, 3, 4, 5];

export function createReview(monitorId: number): Review {
    const id = generateReviewId();
    const rating = ratings[faker.number.int({ min: 0, max: ratings.length - 1 })];
    const comment = faker.lorem.sentence();

    return new Review(id, monitorId, rating, comment);
}


const reviews: Review[] = [];

/*monitors.forEach((monitor) => {
    const monitorReviews = createReview(monitor.getId());
    reviews.push(monitorReviews);
});*/

export default reviews;