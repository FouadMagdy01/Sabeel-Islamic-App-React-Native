import TrackPlayer, {Event, State} from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
  TrackPlayer.addEventListener(Event.RemoteNext, () =>
    TrackPlayer.skipToNext(),
  );
  TrackPlayer.addEventListener(Event.RemotePrevious, () =>
    TrackPlayer.skipToPrevious(),
  );
  TrackPlayer.addEventListener(Event.RemoteSeek, async pos => {
    await TrackPlayer.seekTo(pos.position);
  });
  TrackPlayer.addEventListener(Event.RemoteDuck, async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      return TrackPlayer.pause();
    }
    TrackPlayer.play();
  });
  // ...
};
