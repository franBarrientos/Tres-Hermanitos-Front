import { SubscribeManagerRx } from "../utils/subscribeManagerRx";

export const modalesRX = new SubscribeManagerRx<[string, boolean]>() 
export const updateCategoriesRX = new SubscribeManagerRx<boolean>() 
export const updatePurchasesRX = new SubscribeManagerRx<boolean>() 
export const showHome = new SubscribeManagerRx<boolean>() 