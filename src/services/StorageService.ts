export class StorageService {
  private static readonly GOOGLE_SHEETS_LINK_KEY = "googleSheetsLink";

  static setGoogleSheetsLink(link: string): void {
    localStorage.setItem(this.GOOGLE_SHEETS_LINK_KEY, link);
  }

  static getGoogleSheetsLink(): string | null {
    return localStorage.getItem(this.GOOGLE_SHEETS_LINK_KEY);
  }
}
