import {Button, Dropdown, DropdownButton, Form, Modal} from "react-bootstrap";
import './welcome.style.css';
import React, {useState} from "react";
import SendImageVideo from "./send-image-video.component";
import massage from "./massage";
import SendVoice from "./send-voice.component";

function PoppingScreen(props) {
    const [show, setShow] = useState(false);
    const [type, setType] = useState(null);

    const [mediaPrev, setMediaPrev] = useState(null);


    function changeMediaPrev(mediaType) {

        console.log("changeMediaPrev", mediaType)
        //setMediaPrev(mediaType);
        setMediaPrev(mediaType)
        console.log(mediaPrev);
    }

    const handleClose = () => {

        setShow(false);
        setMediaPrev(null)
    };

    const handleShow = () => setShow(true);

    function handleImgShow() {

        setShow(true);
        setType("image");
    }

    function handleVideoShow() {
        setShow(true);
        setType("video");
    }

    function handleVoiceShow() {
        setShow(true);
        setType("voice");
    }


    function mediaChanged() {
        debugger
        props.setMsg(new massage(type, true, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), mediaPrev, type))

    }

    function handleSend(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!mediaPrev) {
            return;
        }
        props.handleSubmit()
        handleClose();
    }

    return (
        <>

            <DropdownButton
                key={'up'}
                id={`dropdown-button-drop-up`}
                drop={'up'}
                variant="secondary"
                title={<img src={require('../assets/paper-clipIcon.png')} width={"20px"} height={"20px"}/>}
                style={{position: "absolute", minWidth:0}}
                align={{lg: 'end'}}

            >

                <Dropdown.Item eventKey="1" onClick={() => {
                    handleImgShow()
                }}><img src={require('../assets/pictureImg.png')} width={"20px"} height={"20px"}/></Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => {
                    handleVideoShow()
                }}><img src={require('../assets/videoIcon.png')}
                        width={"20px"}
                        height={"20px"}/></Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={() => handleVoiceShow()}><img
                    src={require('../assets/micIcon.png')}
                    width={"20px"}
                    height={"20px"}/></Dropdown.Item>


            </DropdownButton>


            {/*<Dropdown>*/}
            {/*    <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
            {/*        <img src={require('./paper-clipIcon.png')} width={"20px"} height={"20px"}/>*/}
            {/*    </Dropdown.Toggle>*/}

            {/*    <Dropdown.Menu flip={true}>*/}
            {/*        <Dropdown.Item href="#/action-1"><img onClick={() => {*/}
            {/*            handleImgShow()*/}
            {/*        }} src={require('./pictureImg.png')}*/}
            {/*                                              width={"20px"} height={"20px"}/></Dropdown.Item>*/}
            {/*        <Dropdown.Item href="#/action-2"><img onClick={() => {*/}
            {/*            handleVideoShow()*/}
            {/*        }} src={require('./videoIcon.png')}*/}
            {/*                                              width={"20px"}*/}
            {/*                                              height={"20px"}/></Dropdown.Item>*/}
            {/*        <Dropdown.Item href="#/action-3"><img onClick={() => handleVoiceShow()}*/}
            {/*                                              src={require('./micIcon.png')}*/}
            {/*                                              width={"20px"}*/}
            {/*                                              height={"20px"}/></Dropdown.Item>*/}
            {/*    </Dropdown.Menu>*/}
            {/*</Dropdown>*/}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop={"static"}
                keyboard={false}
                centered={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Send {type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type !== 'voice' &&
                        <SendImageVideo type={type} mediaPrev={mediaPrev} setMediaPrev={changeMediaPrev}
                                        mediaChanged={mediaChanged}/>}
                    {type === 'voice' &&
                        <SendVoice type={type} mediaPrev={mediaPrev} setMediaPrev={setMediaPrev}
                                   mediaChanged={mediaChanged}/>}
                </Modal.Body>
                <Modal.Footer>
                    <Form onSubmit={handleSend}>
                        <Button variant="secondary" onClick={handleClose} style={{margin: '2px'}}>
                            Close
                        </Button>
                        <Button required={mediaPrev} type="submit" variant="success">
                            Send
                        </Button>
                    </Form>


                    {/*<Form.control  controlId="send" as='button' onClick={handleSend()} variant="success">Send</Form.control>*/}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PoppingScreen;