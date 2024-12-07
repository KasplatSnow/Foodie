-- starting users
insert into user (email, username, password, role, phone_number)
values ("owenowner@gmail.com", "owenowner", "owenowner", "BUSINESS", "(123)123-1234");

insert into user (email, username, password, role, phone_number)
values ("mollymember@gmail.com", "mollymember", "mollymember", "USER", "(123)456-7890");

insert into user (email, username, password, role, phone_number)
values ("annaadmin@gmail.com", "annaadmin", "annaadmin", "ADMIN", "(999)999-9999");

-- 1st restaurant
insert into restaurant (name, ownerID, address, zip_code, phone_number, hours, description, rating, price, email, lng, lat)
values ("Pho Ha Noi", 1, "123 Main St, San Jose, CA", "95122", "(408)239-09888", "9:00 AM - 9:00 PM", "Our special Northern Pho with lean broth, fresh noodle and Costco Angus steak are the signature what make our Beef Pho so popular. Besides our infamous Beef Pho and Chicken Pho, a few of our other popular dishes are Dungeness/shrimp/pork egg roll, the Rôti Chicken + egg noodle, the Shaken Beef, Nem Nuong Roll, and Bamboo Shoot noddle Soup + Duck Salad. Our beef Pho, we cook 180 lbs of bone/marrow to serve you only 200 bowls of pho. We cook in the largest Pho pot in the USA 500 liters. We guarantee you, we are the only Vietnamese restaurant in San Francisco Bay Area use that much bone/marrow to cook. By the time you get your bowl, it's about 24 hours of cooking and preparation. We only use Free-Ranged chicken and local produces. We make/cook fresh everything in house, from our dressing to our crispy fried shallot, from our Nuoc Mam sauce to our fresh squeeze orange juice. We use the highest quality products to serve you and our community. Please join us and taste it for yourself. Thank you.", 3.8, 2, "phohanoi@gmail.com", -121.857991, 37.331784);

insert into cuisine (restaurantID, cuisine)
values (1, "Vietnamese");

insert into cuisine (restaurantID, cuisine)
values (1, "Noodles");

insert into cuisine (restaurantID, cuisine)
values (1, "Pho");

insert into cuisine (restaurantID, cuisine)
values (1, "Asian");

insert into photo (restaurantID, photo)
values (1, "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/8590bd37-51ee-4cad-b76e-22b401a449b7.57");

insert into photo (restaurantID, photo)
values (1, "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/12/ef/b1/photo0jpg.jpg?w=900&h=500&s=1");

insert into review (review_text, rating, userID, restaurantID)
values ("Being in San Jose for an event, we knew we would have to grab lunch in the area. Companion suggested we have Vietnamese food, considering how good it is in San Jose compared to other parts of the Bay. He chose Pho Ha Noi for us, and it was a winner! We arrived at the restaurant on a weekend afternoon. Once there, we signed up via their Yelp waitlist. We didn't have to wait more than 10 minutes, which was great. What surprised us both was how massive the restaurant was. There's a constant flow of customers, workers bussing tables, and dining space inside and outside. We sat outside since we had my puppy. While dining, service was fast in terms of food but nonexistent in terms of being checked on. Many dishes looked tasty, but I got a Small Pho Ga Thit Dui with Regular Noodles and a chicken thigh pho. The broth was light and flavorful. The noodles were ample, and the chicken thigh was tender and bountiful. Though I had a small, I couldn't finish--so comforting and filling! He had the Pho Tai Bo Vien, which he enjoyed. It's great that you can choose the size and type of noodles. The pairings and sauces came with our fresh dishes and were a great addition. Pho Ha Noi has multiple locations in the Bay Area, but their Little Saigon spot is super popular and a great place to get food! Parking is pretty easy in Vietnam Town's parking lot. I'd come again here for pho, but I would also like to try other spots.", 4.0, 2, 1);

-- 2nd restaurant
insert into restaurant (name, ownerID, address, zip_code, phone_number, hours, description, rating, price, email, lng, lat)
values ("Sushi Koya", 1, "2424 Almaden Rd, San Jose, CA", "95125", "(408)960-6339", "11:30 AM - 2:30 PM, 5:00 PM - 9:30 PM", "Welcome to SUSHI KOYA, where authentic Japanese cuisine meets contemporary dining in San Jose, CA. We are inviting you to savor our amazing, fresh dishes and discover why we have so many delighted returning customers. Whether you're craving traditional sushi or the teriyaki, SUSHI KOYA promises a memorable dining experience that combines flavor, flair, and friendly service. Join us and indulge in the essence of Japan right here in San Jose.", 4.3, 3, "sushikoya@gmail.com", -121.880797, 37.290432);

insert into cuisine (restaurantID, cuisine)
values (2, "Japanese");

insert into cuisine (restaurantID, cuisine)
values (2, "Sushi");

insert into cuisine (restaurantID, cuisine)
values (2, "Seafood");

insert into cuisine (restaurantID, cuisine)
values (2, "Asian");

insert into photo (restaurantID, photo)
values (2, "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/bdc3952c-f2ef-454c-80f9-b816a7919cd4.jpg");

insert into photo (restaurantID, photo)
values (2, "https://www.sushikoyasj.com/wp-content/uploads/sushikoyasj.com/2021/09/1.jpg");

insert into review (review_text, rating, userID, restaurantID)
values ("Jumbo Servings! Hole-in-the-wall Japanese dining out of the blue on Almaden Rd, south end of Willow Glen. You don't believe what you are reading? Go check out their Udon dish.. It's too big for one!", 5.0, 2, 2);

-- 3rd restaurant
insert into restaurant (name, ownerID, address, zip_code, phone_number, hours, rating, price, email, lng, lat)
values ("Campus Burgers", 1, "108 Paseo De San Antonio, San Jose, CA", "95113", "(408)352-5507", "11:00 AM - 12:00 AM", 4.2, 1, "campusburgers@gmail.com", -121.886380, 37.333526);

insert into cuisine (restaurantID, cuisine)
values (3, "Burger");

insert into photo (restaurantID, photo)
values (3, "https://s3-media0.fl.yelpcdn.com/bphoto/5PEXxPnH3VN75qureYaeXA/348s.jpg");

insert into photo (restaurantID, photo)
values (3, "https://www.kron4.com/wp-content/uploads/sites/11/2024/08/vlcsnap-2024-08-27-19h04m16s249.png?w=1280");

insert into review (review_text, rating, userID, restaurantID)
values ("amazing burgers, nice staff, quick service, 10/10 recommend!! spectacular vibes!! i go everyday", 5.0, 2, 3);

-- 4th restaurant
insert into restaurant (name, ownerID, address, zip_code, phone_number, hours, description, rating, price, email, lng, lat)
values ("Lacàphê", 1, "740 Story Rd Ste 5, San Jose, CA", "95122", "(408)564-6237", "9:00 AM - 7:00 PM", "We deliver coffee, tea, and happiness! The founders are a mix of thinkers and dreamers that came from different professional background- hospitality, F&B, and law. During quarantine, we felt bored with our corporate job and wanted to do something different and ambitious. The idea of opening a Vietnamese coffee shop came to mind. Over the years, we received an immense amount of support from the Vietnamese community who wanted a sip of their home country. Lacàphê has brought us so much opportunities, creativity, and lessons that we can’t imagine. We believe that Lacàphê can be so much more, not just a typical coffee shop.", 4.4, 2, "lacaphe@gmail.com", -121.858201, 37.328372);

insert into cuisine (restaurantID, cuisine)
values (4, "Coffee");

insert into cuisine (restaurantID, cuisine)
values (4, "Tea");

insert into photo (restaurantID, photo)
values (4, "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/store/header/671d3ea8-69e6-455c-939d-29a969e405ce.jpg");

insert into review (review_text, rating, userID, restaurantID)
values ("Cute modern vietnamese cafe that has drinks that bring me back to Vietnam! Lacaphe's menu is a good representation of what hip coffee shops in Vietnam are like all over the country. With egg coffees, lotus teas and peach lemongrass teas. The Signature Saigon is a traditional ca phe sua da (Vietnamese iced coffee) but with a salty cream on top. The salted cream cuts through the richness of the coffee and actually tastes salted. The coffee is super smooth and is very solid. Would definitely recommend the coffee because it's definitely a strength. If you're from OC it's more similar to Phin in taste than it is Da Vien. I also got the lychee tea 0% sweet because it was one of the only teas they could do 0% but it was still very very sweet. I think because there's some type of lychee syrup that they use for the flavor. I personally wasn't a fan of the tea. Parking can be hard on the weekends and there isn't too much seating as the store is pretty small. Overall, Lacaphe is an awesome coffee shop to try traditional Vietnamese coffees! I will definitely be trying out other items on their menu in the future.", 4.0, 2, 4);

-- 5th restaurant
insert into restaurant (name, ownerID, address, zip_code, phone_number, hours, rating, price, email, lng, lat)
values ("Kakuna Sushi", 1, "3095 Mckee Rd, San Jose, CA", "95127", "(408)708-7781", "11:15 AM - 9:00 PM", 4.6, 2, "kakunasushi@gmail.com", -121.837616, 37.374345);

insert into cuisine (restaurantID, cuisine)
values (5, "Sushi");

insert into cuisine (restaurantID, cuisine)
values (5, "Ramen");

insert into cuisine (restaurantID, cuisine)
values (5, "Asian");

insert into photo (restaurantID, photo)
values (5, "https://preview.redd.it/kakuna-sushi-just-opened-on-mckee-and-white-road-v0-m0u171dyqm1d1.jpg?width=640&crop=smart&auto=webp&s=b38b4463960dc09b20c63340b95a965bb7f7dd22");

insert into review (review_text, rating, userID, restaurantID)
values ("I've eaten here a few times (both dine in and take out) and the high quality has stayed consistent each and every time! The nigiris are HUGE and of great value even though they only come in orders of 1. The rolls are filling and flavorful! And the prices are extremely affordable and competitive!! Service has always been so friendly and quick! The interior and tables are clean and spacious despite the smaller space they have. Will definitely be a regular at Kakuna now, especially since it's so close!! (My fav roll is the aloha roll which is not pictured.. but its sooo good)", 5.0, 2, 5);
