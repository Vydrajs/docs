import { VydraBus } from "@vydra-js/bus";
import { Injectable } from "@vydra-js/core";

@Injectable()
export class RootService {
  private bus = new VydraBus("global");
  private _config: any = {};
  
  onSetLangRequested(callback: (lang: string) => void) {
    return this.bus.on("lang-requested", callback);
  }

  setLang(lang: string) {
    this.bus.emit("lang-requested", lang);
  }

  setConfig(config: any) {
    this._config = config;
  }

  getConfig() {
    return this._config;
  }
}
