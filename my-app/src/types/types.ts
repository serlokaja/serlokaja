export interface User { 
  id: number,
  username: string, 
  telp: string, 
  password: string
}

export interface UserBookingBuilding {
  id: number;
  username: string;
  telp: string;
  password: string;
  user_id: number;
  building_id: number;
  duration: number;
  status: string;
  building_name: string;
  address: string;
  coordinate: string;
  price: string;
  size: string;
  number_of_rooms: number;
  description: string;
  provider_id: number;
}

export interface Building {
  id: number;
  building_name: string;
  address: string;
  coordinate: string;
  status: string
  price: string;
  size: string;
  number_of_rooms: number;
  description: string;
  provider_id: number;
}

export interface Booking {
  id: number; 
  user_id: number;  
  building_id: number;  
  duration: number; 
  status: string;
}