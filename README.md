# Installation

### NPM

Install the package from the git repository

`npm i https://github.com/Varmtech/video-client.git`

### CDN

Add VideoClient to your root html file from CDN

`<script src="https://cdn.jsdelivr.net/gh/Varmtech/video-client/index.js"></script>`

# Get started

### NPM

Import VideoClient and create a new instance to work with

`import VideoClient from 'video-client'`
 
`const videoClient = new VideoClient()`
 

### CDN

If VideoClient is added over CDN just create a new instance to work with

`const videoClient = new VideoClient()`

### MediaCapture

MediaCapture is a helper utiliy to easily access Camera, Screen Share and Mic streams to be added to the room

`const { MediaCapture } = videoClient`

`{ getMediaStream, getScreenMedia, stopStream } = MediaCapture`
 
#### Get camera stream and extract audio, video tracks

`const cameraStream = await getMediaStream()`

`const audioTrack = cameraStream.getAudioTracks()[0]`
`const videoTrack = cameraStream.getVideoTracks()[0]`
 
`getMediaStream` function accepts [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints), if not set the default ones will be used

### Creating or Joining a Video Room

If the room with the given name doesn't exist a new one will be created and automatically joined

`const videoRoom = videoClient.join(token, userId, fullName, roomName, tracks)`

- token: type: string, authentication token 
- userId: type: string, user id joining the room
- fullName: type: string, full name of the user
- roomName: type: string, room name to join or create
- tracks: type: object, { audioTrack, videoTrack }
 
 `join` throws a VideoRoomError in case of a failure or returns `VideoRoom` object containing the list of participants

#### Available room methods
  
### replaceVideoTrack
  you can replace an existing track with another if some track already exists

### addVideoTrack
  
  you can add Video Track anytime you want, but you cannot have multiple active video tracks at same time
  so if you will add a track when you already have it you will get an error
  
### removeVideoTrack
  can remove videoTrack is it exists
  
### sendInfo
  if you are in room you can send update message about some status you have to room members.
  
## Events
  you can listen various type events on room object like`
  - infoReceived: if someone sends a message to room with sendInfo you will get it here.
  - participantJoined: someone joined to room
  - participantDisconnected: someone leaved room
