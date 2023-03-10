import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';

type RecordingState = 'NONE' | 'RECORDING' | 'RECORDED'

@Component({
  selector: 'app-audio-recorder',
  templateUrl: './audio-recorder.component.html',
  styleUrls: ['./audio-recorder.component.scss']
})
export class AudioRecorderComponent {
  isRecording = false;
  audio: any;
  audioBlobUrl: any;
  state: RecordingState = 'NONE';

  constructor(
    private audioRecordingService: AudioRecordingService,
    private ref: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) { 
    this.audioRecordingService.getMediaStream().subscribe((data) => {
      this.audio.srcObject = data;
      this.ref.detectChanges();
    });
    this.audioRecordingService.getBlob().subscribe((data) => {
      this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data);
      this.audio.srcObject = null;
      this.ref.detectChanges();
    });
  }

  startRecording() {
    this.audioRecordingService.startRecording();
    this.state = 'RECORDING';
  }

  stopRecording() {
    this.audioRecordingService.stopRecording();
    this.state = 'RECORDED';
  }

  downloadRecording() {
    this.audioRecordingService.downloadRecording();
  }

  clearRecording() {
    this.audioRecordingService.clearRecording();
    this.audio.srcObject = null;
    this.audioBlobUrl = null;
    this.state = 'NONE';
  }


}
