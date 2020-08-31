# Installation

### NPM
run `npm i https://github.com/Varmtech/video-client.git`

### CDN
add this to your root html file\
`<script src="https://cdn.jsdelivr.net/gh/Varmtech/video-client/index.js"></script>`

# Get started

### NPM
use this to import your video client \` \
 `import VideoClient from "video-client"`
 
 then create new Video Client `new VideoClient()`
 
you are ready to use it.

### CDN
Once you will add appropriate script in your root html file\
you can access VideoClient from wherever you want

create new Video `new VideoClient()`

you are ready to use it.

## Let's Start
All our function you can access from an object that you have created before.

### MediaCapture
is a class from where you can get you video, audio and screen stream
access \` `{ MediaCapture } = videoClient`\
`{getMediaStream, getScreenMedia, stopStream} = MediaCapture`

**remember getMediaStream and getScreenMedia**\
 functions are async functions and returns promise which\
 will give you stream you want.
 
getMediaStream function is accepting argument [mediastreamconstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints)

### Room
You can create your Call Room.
If you want to create or join already exciting room then you can use\`\
`{ join } = videoClient`
join function accepts arguments\`\
- token: type: string, your special token 
- userId: type: string, your special userId
- fullName: type: string, your name
- roomName: type: string, it is room name you want to join
- tracks: type: object,\
 {audioTracks: type: array, videoTracks: type: array}\
 stream tracks which you will get from MediaCapture
 
 join function will return Room object from where you can access\
  various type methods to handle Room actions. above you can see list`
  
  you can replaceVideoTrack, addVideoTrack, removeVideoTrack.
  
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