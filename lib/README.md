# Installation

### NPM

Install the package from the git repository

    npm i https://github.com/Varmtech/video-client.git

### CDN

Add VideoClient to your root html file from CDN

    <script src="https://cdn.jsdelivr.net/gh/Varmtech/video-client@1.0.1/index.js"></script>

# Get started

### NPM

Import VideoClient and create a new instance to work with

    import VideoClient from 'video-client'
 
    const videoClient = new VideoClient()
 

### CDN

If VideoClient is added over CDN just create a new instance to work with

    const videoClient = new VideoClient()

### MediaCapture

MediaCapture is a helper utility to easily access Camera, Screen Share and Mic streams to be added to the room

    const { MediaCapture } = videoClient

    { getMediaStream, getScreenMedia, stopStream } = MediaCapture
 
#### Getting camera stream and extracting audio, video tracks

    const cameraStream = await getMediaStream()

    const audioTrack = cameraStream.getAudioTracks()[0]
    const videoTrack = cameraStream.getVideoTracks()[0]
 
`getMediaStream` function accepts [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints), if not set the default ones will be used

### Creating or Joining a Video Room

If the room with the given name doesn't exist a new one will be created and automatically joined

    const videoRoom = videoClient.join(token, userId, fullName, roomName, tracks, isPresenter)

- token: type: string, authentication token 
- userId: type: string, user id joining the room
- fullName: type: string, full name of the user
- roomName: type: string, room name to join or create
- tracks: type: object, { audioTrack, videoTrack }
- isPresenter: type: boolean, user role joining the room
 
 `join` throws a VideoRoomError in case of a failure or returns `VideoRoom` object containing the list of participants

## Available room methods
  
### replaceVideoTrack

It is possible to replace the video track on the go, for example change the camera stream with the screen one

    videoRoom.replaceVideoTrack(newVideoTrack)
  

### addVideoTrack

If there is no video track added to the room, it can be added later.
If the track already added it will throw an error.

    videoRoom.addVideoTrack(videoTrack)
  
### removeVideoTrack

Previously passed video track can be removed from the room.

    videoRoom.removeVideoTrack(videoTrack)
  
### sendInfo

It is possible to send an update message about some status the room members should be aware of

    videoRoom.sendInfo(userId, roomName, isPresenter, infoData)
    
- userId: type: string, user id 
- roomName: type: string, room name the user is joined
- isPresenter: type: boolean, whether the user is presenter or not
- infoData: type: object,sny object to be sent

### getParticipants

Returns an array of joined participants of the room
  
    videoRoom.getParticipants()
    
### toggleAudio
It is possible to enable or disable audio by passing audioTrack to this function.

    videoRoom.toggleAudio(audioTrack)
## Available participant methods
### connectToUser
It is possible to direct call one of room participants.\

    `participant.connectToUser()`
    
It is need to be called on participant who you to direct call
### endCallWithUser
You can end it anytime you want by using this`

    particpant.endCallWithUser()
    
It is need to be called on participant who have direct call with you

### toggleAudioTracksMix
Also you can mix your voice with participant who have direct call with you and after that room members will be able to listen that participant voice too.

    participant.toggleAudioTracksMix()
    
It is need to be called on participant who have direct call with you.
It also toggles it back.
## Events
Events can be listened by attaching listeners to `VideoRoom`

### infoReceived
This will be fired when someone in the room sends a an update over `sendInfo`

    videoRoom.on('infoRecieved', (infoData) => {})
    
### participantJoined

This will be fired when someone has joined to room
    
    videoRoom.on('participantJoined', (participant) => {})
    
### participantJoined
This will be fired when someone has left room

    videoRoom.on('participantDisconnected', (participant) => {})
    
### stream
This will be fired when one of participants added stream

    particpant.on('stream', (stream) => {})
    
### directCallEnded
This will be fired when direct call ends

    participant.on('directCallEnded', () => {})
