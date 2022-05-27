class MediaPlayer extends HTMLAudioElement {
    private currentTrackIndex = 0;
    audio: HTMLAudioElement;
    playList: string[];

    constructor(audio: HTMLAudioElement, playList: string[]) {
        super();
        this.audio = audio;
        this.playList = playList;
    }
    
};

export { MediaPlayer };