export interface Item {
  id: string
  type: string
  name: string
  imageUrl: string
  count?: number
  cooldown?: number
  charges?: number
  maxCharges?: number 
}