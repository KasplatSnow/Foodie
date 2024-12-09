import { Restaurant } from '@mui/icons-material'

export interface Restaurant {
  restaurantID: number
  name: string
  address: string
  zipCode: string
  phoneNumber: string
  email: string
  cuisine: string
  hours: string
  description: string
  rating: number
  price: number
  ownerID?: string
  reviewID?: string[]
}

export const mockRestaurant: Restaurant[] = [
  {
    restaurantID: 22,
    name: 'Cheese Cake Factory',
    address: '123 Street St',
    zipCode: '12345',
    phoneNumber: '123-4567-7890',
    email: 'test@gmail.com',
    cuisine: 'American',
    hours: '9 AM - 9 PM',
    description: 'Best burgers in town!',
    rating: 4.5,
    price: 2,
    ownerID: '101',
    reviewID: ['1', '2', '3'],
  },
  {
    restaurantID: 33333,
    name: 'Pho Ha Noi',
    address: '969 Story Rd',
    zipCode: '95122',
    phoneNumber: '408-399-3002',
    email: 'login@outlook.com',
    cuisine: 'Vietnamese',
    hours: '10 AM - 10 PM',
    description: 'Authentic Vietnamese restaurant.',
    rating: 4.0,
    price: 2,
    ownerID: '102',
    reviewID: ['4', '5'],
  },
  {
    restaurantID: 334,
    name: 'Starbucks',
    address: '456 Elm St',
    zipCode: '67890',
    phoneNumber: '555-5678',
    email: 'test@outlook.com',
    cuisine: 'American',
    hours: '10 AM - 10 PM',
    description: 'Coffee',
    rating: 4.8,
    price: 3,
    ownerID: '102',
    reviewID: ['4', '5'],
  },
  {
    restaurantID: 233,
    name: 'Starbucks',
    address: '123 Street St',
    zipCode: '67890',
    phoneNumber: '4232rr2r',
    email: 'test@outlook.com',
    cuisine: 'American',
    hours: '10 AM - 10 PM',
    description: 'Coffee',
    rating: 4.8,
    price: 3,
    ownerID: '102',
    reviewID: ['4', '5'],
  },
  {
    restaurantID: 899,
    name: 'Starbucks',
    address: '123 Street St',
    zipCode: '67890',
    phoneNumber: '4232rr2r',
    email: 'test@outlook.com',
    cuisine: 'American',
    hours: '10 AM - 10 PM',
    description: 'Coffee',
    rating: 4.8,
    price: 3,
    ownerID: '102',
    reviewID: ['4', '5'],
  },
  {
    restaurantID: 32334,
    name: 'Starbucks',
    address: '456 Street St',
    zipCode: '67890',
    phoneNumber: '4232rr2r',
    email: 'test@outlook.com',
    cuisine: 'American',
    hours: '10 AM - 10 PM',
    description: 'Coffee',
    rating: 4.8,
    price: 3,
    ownerID: '102',
    reviewID: ['4', '5'],
  },
  {
    restaurantID: 909,
    name: 'Starbucks',
    address: '123 Street St',
    zipCode: '67890',
    phoneNumber: '4232rr2r',
    email: 'test@outlook.com',
    cuisine: 'American',
    hours: '10 AM - 10 PM',
    description: 'Coffee',
    rating: 4.8,
    price: 3,
    ownerID: '102',
    reviewID: ['4', '5'],
  },
]
