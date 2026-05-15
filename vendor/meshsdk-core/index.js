function getCardano() {
  if (typeof window === 'undefined') return undefined;
  return window.cardano;
}

export class BrowserWallet {
  static async getAvailableWallets() {
    const cardano = getCardano();
    if (!cardano) return [];
    return Object.entries(cardano)
      .filter(([, wallet]) => wallet && typeof wallet.enable === 'function')
      .map(([name, wallet]) => ({ name, icon: wallet.icon, version: wallet.apiVersion || wallet.version }));
  }

  static async enable(name) {
    const wallet = getCardano()?.[name];
    if (!wallet || typeof wallet.enable !== 'function') {
      throw new Error(`Cardano wallet "${name}" is not available.`);
    }
    return wallet.enable();
  }
}
