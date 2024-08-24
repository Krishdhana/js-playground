enum COOKIE_KEYS {
  SCRIPT = "script",
}

export class CookieUtils {
  static getCookie(name: string) {
    const item = localStorage.getItem(name);
    try {
      return JSON.parse(item || "");
    } catch (e) {
      return item;
    }
  }

  static setCookie(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  static getScript() {
    return this.getCookie(COOKIE_KEYS.SCRIPT);
  }

  static setScript(script: string) {
    this.setCookie(COOKIE_KEYS.SCRIPT, script);
  }
}
