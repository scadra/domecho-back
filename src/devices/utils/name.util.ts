import { DEFAULT_VALUE } from 'src/shared/constants/model.const';

type FriendlyNamePattern = {
  type?: string;
  name?: string;
  extra?: string;
};

export class NameUtil {
  static getRoom(device: string): string {
    return device.split(this.getSeparator())[1];
  }
  static getType(device: string): string {
    return device.split(this.getSeparator())[0];
  }
  static getExtra(device: string): string {
    return device.split(this.getSeparator())[2];
  }
  static hasExtra(device: string): boolean {
    return device.split(this.getSeparator()).length === 3;
  }
  static hasType(device: string): boolean {
    return device.split(this.getSeparator())[0] !== DEFAULT_VALUE;
  }
  static hasRoom(device: string): boolean {
    return device.split(this.getSeparator())[1] !== DEFAULT_VALUE;
  }
  static generateFriendlyName(pattern: FriendlyNamePattern): string {
    let friendlyName = '';
    friendlyName += this.checkIfPatternExist(pattern.type);
    friendlyName += this.getSeparator();
    friendlyName += this.checkIfPatternExist(pattern.name);
    if (pattern.extra) {
      friendlyName += this.getSeparator();
      friendlyName += pattern.extra;
    }
    return friendlyName;
  }

  static checkIfPatternExist(value: string): string {
    if (!value) {
      return DEFAULT_VALUE;
    }
    return value;
  }

  static getSeparator(): string {
    return '-';
  }
}
