let stream;
let screenStream;
let isScreenStream;
let myVideoClient;
let videoRoom;
let isVideoOff = false;
let joinButton;
let muteButton;
let videoToggleButton;
const buttonContainer = document.getElementById("button-container")
const video = document.getElementById("video1")
window.onload = function () {
    myVideoClient = new window.VideoClient
    console.log(myVideoClient, 'myVideoClient')
}

async function getMyMedia() {
    if (stream && !isVideoOff && !isScreenStream) {
        return
    }
    if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop())
    }
    const { MediaCapture } = myVideoClient
    const isStreamExisted = !!stream
    let oldAudioTrack
    if (stream) {
        oldAudioTrack = stream.getAudioTracks()[0]
    }
    stream = await MediaCapture.getMediaStream({audio: true, video: true})
    if (oldAudioTrack) {
        stream.removeTrack(stream.getAudioTracks()[0])
        stream.addTrack(oldAudioTrack)
    }

    if (isStreamExisted && !isScreenStream) {
        const videoTrack = stream.getVideoTracks()[0]
        videoRoom.replaceVideoTrack(videoTrack)
    }
    video.srcObject = stream
    isScreenStream = false
    if (!joinButton) {
        joinButton = document.createElement("button")
        joinButton.type = "button"
        joinButton.onclick = joinRoom
        joinButton.type = "button"
        joinButton.innerHTML = "Join Room"
        buttonContainer.appendChild(joinButton)
    }
}

async function getScreenMedia() {
    // if (videoToggleButton) {
    //     buttonContainer.removeChild(videoToggleButton)
    // }
    // if (muteButton) {
    //     buttonContainer.removeChild(muteButton)
    // }
    // if (joinButton) {
    //     buttonContainer.removeChild(joinButton)
    //     joinButton = undefined
    // }
    if (isScreenStream) {
        video.srcObject = stream
        screenStream.removeTrack(screenStream.getAudioTracks()[0])
        screenStream.getTracks().forEach(track => track.stop())
        isScreenStream = false
        return
    }
    const { MediaCapture } = myVideoClient
    screenStream = await MediaCapture.getScreenMedia()
    video.srcObject = screenStream
    if (stream) {
        screenStream.addTrack(stream.getAudioTracks()[0])
    }

    const screenVideoTrack = screenStream.getVideoTracks()[0]

    screenVideoTrack.onended = () => {
        video.srcObject = stream
        screenStream.getTracks().forEach(track => track.stop())
    }

    isScreenStream = true
    if (!joinButton) {
        joinButton = document.createElement("button")
        joinButton.type = "button"
        joinButton.onclick = joinRoom
        joinButton.type = "button"
        joinButton.innerHTML = "Join Room"
        buttonContainer.appendChild(joinButton)
    }
}

function toggleVoice() {
    const audioTrack = stream.getAudioTracks()[0]
    videoRoom.toggleAudio(audioTrack)
}

async function toggleVideo() {
    let videoTrack
    if (isScreenStream) {
        video.srcObject = stream
        isScreenStream = false
        videoTrack = screenStream.getVideoTracks()[0]
        videoTrack.stop()
        isVideoOff = false
        return
    } else {
        videoTrack = stream.getVideoTracks()[0]
    }
    if (isVideoOff) {
        const { MediaCapture } = myVideoClient
        let oldAudioTrack
        if (stream) {
            oldAudioTrack = stream.getAudioTracks()[0]
        }
        stream = await MediaCapture.getMediaStream({audio: true, video: true})
        if (oldAudioTrack) {
            stream.removeTrack(stream.getAudioTracks()[0])
            stream.addTrack(oldAudioTrack)
        }
        const newVideoTrack = stream.getVideoTracks()[0]
        await videoRoom.addVideoTrack(newVideoTrack)

        video.srcObject = stream
    } else {
        await videoRoom.removeVideoTrack(videoTrack)
    }
    videoTrack.enabled = !videoTrack.enabled
    isVideoOff = !isVideoOff
}

async function joinRoom() {
    if (videoRoom) {
        return
    }
    let audioTrack;
    if (stream) {
        audioTrack = stream.getAudioTracks()[0]
    }
    let videoTrack;
    if (isScreenStream) {
        videoTrack = screenStream.getVideoTracks()[0]
    } else {
        videoTrack = stream.getVideoTracks()[0]
    }

    console.log(audioTrack, videoTrack, 'audioTrack, videoTrack')
    try {
        videoRoom = await myVideoClient.join("1", "11", "111", "1111", {audioTrack, videoTrack}, true)
    } catch (e) {
        console.log(e, 'e')
    }
    muteButton = document.createElement("button")
    muteButton.type = "button"
    muteButton.onclick = toggleVoice
    muteButton.type = "button"
    muteButton.innerHTML = "Toggle Mute"
    buttonContainer.appendChild(muteButton)
    videoToggleButton = document.createElement("button")
    videoToggleButton.type = "button"
    videoToggleButton.onclick = toggleVideo
    videoToggleButton.type = "button"
    videoToggleButton.innerHTML = "Toggle Video"
    buttonContainer.appendChild(videoToggleButton)
}