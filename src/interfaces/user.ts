type customer = {
  id?: number;
  dni?: string;
  addres?: string;
};

export interface UserDto {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  age: number;
  city?: string;
  province?: string;
  customer?: customer | null;
}
