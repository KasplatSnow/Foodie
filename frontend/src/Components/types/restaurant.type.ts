// Define the type for Restaurant data
export interface RestaurantData {
  id: string
  name: string
  address: string
  contactInfo: string
  hours: string
  description: string
  photos: string[]
  zipcode: string
  price?: number // Optional: Price level (1 = Low, 2 = Medium, 3 = High)
  rating?: number // Optional: Rating out of 5
  categories?: string[] // Optional: Array of categories
  lat?: number // Optional: Latitude for marker placement
  lng?: number // Optional: Longitude for marker placement
}
