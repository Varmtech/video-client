# Installation

### NPM

Install the package from the git repository

    npm i https://github.com/Varmtech/video-client.git

### CDN

Add VideoClient to your root html file from CDN

    <script src="https://cdn.jsdelivr.net/gh/Varmtech/video-client/index.js"></script>

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

    const videoRoom = videoClient.join(token, userId, fullName, roomName, tracks)

- token: type: string, authentication token 
- userId: type: string, user id joining the room
- fullName: type: string, full name of the user
- roomName: type: string, room name to join or create
- tracks: type: object, { audioTrack, videoTrack }
 
 `join` throws a VideoRoomError in case of a failure or returns `VideoRoom` object containing the list of participants

#### Available room methods
  
### replaceVideoTrack
    VideoRoom.replaceVideoTrack(videoTrack)
  videoTrack can be replaced if it exists otherwise you will get error. 

### addVideoTrack
    VideoRoom.addVideoTrack(videoTrack)
  videoTrack can be added if there is no videoTrack in a stream.\
  if we try to add videoTrack when there is active videoTrack\
  in our stream we will get error.
  
### removeVideoTrack
    VideoRoom.addVideoTrack(videoTrack)
 videoTrack can be removed the passed videoTrack exists on our stream.
  
### sendInfo
if you are in room you can send update message about some status you have to room members.

    VideoRoom.sendInfo(userId, roomName, isPresenter, infoData)
    
- userId: type: string, user id 
- roomName: type: string, room name user in
- isPresenter: type: boolean, is user have presenter flag
- infoData: type: object, you can send whatever you want

### getParticipants
    VideoRoom.getParticipants()
this will return `VideoRoom` participants array
  
## Events
Events can be listened by attaching listeners to `VideoRoom`

### infoReceived
this will be fired when someone in the room use `sendInfo\`

    VideoRoom.on("infoRecieved", (infoData) => {})
  - participantJoined: someone joined to room
  - participantDisconnected: someone leaved room
  
### participantJoined
This will be fired when someone joined to room
    
    VideoRoom.on("participantJoined", (participant) => {})
### participantJoined
This will be fired when someone leaved room

    VideoRoom.on("participantDisconnected", (participant) => {})