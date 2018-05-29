import React, { Component } from "react";
import {
    Button,
    Typography
} from "@kiwicom/orbit-components";

import {
    Container
} from "./styles";

class Footer extends Component {
    render() {
        return (
            <Container>
                <Typography size="small" type="attention" variant="bold">
                    Pick a date of your return
                </Typography>
                <Button title="Search" onClick={() => {}} />
            </Container>
        )
    }
}

export default Footer;