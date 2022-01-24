const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModule } = require('powercord/webpack');
const Settings = require('./settings.jsx');

module.exports = class SlurNuker extends Plugin {
  async startPlugin() {
    const {default: MessageRender} = await getModule(['getElementFromMessageId']);
    inject('replace-bad', MessageRender, 'type', (args) => {
      const [{message}] = args;
      if (!message || !message.content) return args;
      for (const bad of this.settings.get('badWords', [])) {
        if (bad == undefined || bad == '') continue;
        let regex = new RegExp(bad, 'gim');
        message.content = message.content.replace(regex, '[slur]');
      }
      return args;
    }, true);

    powercord.api.settings.registerSettings('slur-nuker', {
      category: this.entityID,
      label: 'Slur Nuker',
      render: Settings
    });
  }
  async pluginWillUnload() {
    uninject('replace-bad');
    powercord.api.settings.unregisterSettings('slur-nuker');
  }
};
