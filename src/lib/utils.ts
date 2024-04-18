import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

export const isValidEmail = (email: string) => emailRegex.test(email);
export const isValidPhoneNumber = (phoneNumber: string) => phoneRegex.test(phoneNumber);