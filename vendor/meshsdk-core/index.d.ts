export type BrowserWalletInfo = { name: string; icon?: string; version?: string };
export type EnabledWallet = {
  getUsedAddresses(): Promise<string[]>;
  getRewardAddresses(): Promise<string[]>;
};
export declare class BrowserWallet {
  static getAvailableWallets(): Promise<BrowserWalletInfo[]>;
  static enable(name: string): Promise<EnabledWallet>;
}
