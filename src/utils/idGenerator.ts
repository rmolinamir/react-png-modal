// Libraries
import { v4 as uuidv4 } from 'uuid';

// function S4() {
//   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
// }

export function idGenerator(): string {
  return uuidv4();
}
