export {}

declare global {
  interface Apartment {
    name: string
    image: string[]
    video: string
    media_type: string
    price: string
    location: string
    slug: string
  }
  interface ApartmentRequest {
    id: number
    size: string
    location: string
    minPrice: string
    maxPrice: string
    amenities: string[]
    move_in_date: string
    note: string
    matches: number
    status: string
    date: string
    slug: string
  }
}
