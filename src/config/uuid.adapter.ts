import { v4 as uuidv4, validate as isUuid } from 'uuid';

export class Uuid {
  static v4 = () => uuidv4()
  static isUuid = (value: string) => isUuid(value)
}