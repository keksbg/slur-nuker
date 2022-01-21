const { React } = require('powercord/webpack');
const { TextInput } = require('powercord/components/settings');

module.exports = class Settings extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return <div>
      <TextInput
        defaultValue={ this.props.getSetting('badWords', []).join(', ') }
        onChange={u => this.props.updateSetting('badWords', u.split(',').map(regex => regex.trim()))}
        note={
          <p>
            You can input regexes here, comma-separated (i.e. "bad[^\s]*, other").
          </p>
        }
      >
        Regexes
      </TextInput>
      <div>
        <img
          src='https://cdn.discordapp.com/emojis/809916505390710844.png?size=1024&quality=lossless'
          alt='vicky & leah are cute'
        />
      </div>
    </div>;
  }
};
