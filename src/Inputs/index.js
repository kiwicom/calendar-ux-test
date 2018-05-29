import React, { Component } from "react";
import { Container, InputContainer } from "./styles"

class Inputs extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Container>
                <InputContainer>
                    <p>Departure</p>
                    <input />
                </InputContainer>
                <InputContainer>
                    <p>Return</p>
                    <input />
                </InputContainer>
            </Container>
        )
    }
}

export default Inputs;