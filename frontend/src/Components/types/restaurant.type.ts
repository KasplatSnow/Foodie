// Define the type for Restaurant data
export interface RestaurantData {
  // id: string
  email: string
  name: string
  zipCode: string
  address: string
  phoneNumber: string
  businessOwnerId: number
  hours: string
  description: string
  cuisine?: string[]
  photo: string[]
  rating?: number
  price?: number
  lat?: number
  lng?: number
}
