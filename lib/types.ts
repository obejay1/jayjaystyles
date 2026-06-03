export type Product={id:string;name:string;price:number;category:string;type:'product'|'service';description:string;image:string;featured?:boolean;bestseller?:boolean;stock:number};
export type Order={id:string;items:{id:string;name:string;price:number;qty:number}[];subtotal:number;shipping:number;tax:number;total:number;paymentMethod:string;status:string;createdAt:string;customer?:{name:string;phone:string;address:string}};
export type Session={id:string;userId:string;email:string;loginAt:string;userAgent:string};
