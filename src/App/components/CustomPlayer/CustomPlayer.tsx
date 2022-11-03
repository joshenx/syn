import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'
import './style.css'

export const CustomPlayer = () => {

  return (
    <AudioPlayer
      style={{
        width: '100%'
      }}
      src="https://upload.wikimedia.org/wikipedia/commons/3/30/Tchaikovsky_-_Concerto_in_D_Major_for_Violin_and_Orchestra%2C_Op._35_-_I._Allegro_moderato.ogg"
      customProgressBarSection={
        [
          RHAP_UI.PROGRESS_BAR,
        ]
      }
      customControlsSection={
        [
          RHAP_UI.CURRENT_TIME,
          RHAP_UI.ADDITIONAL_CONTROLS,
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME_CONTROLS,

        ]
      }
      customAdditionalControls={[]}
    />);
}
