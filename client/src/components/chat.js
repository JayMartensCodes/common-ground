import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useSocket from 'use-socket.io-client';
const io = require('socket.io')(3000);


function Chat() {
  return (

    <div style={{ textAlign: 'center', margin: '30vh auto', width: '70%' }}>
      <Form onSubmit={event => handleSubmit(event)}>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Chat;