import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'
import './style.css'

export const CustomPlayer = (props: any) => {

  return (
    <AudioPlayer
      autoPlay={false}
      style={{
        width: '100%'
      }}
      src={props.src}
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
