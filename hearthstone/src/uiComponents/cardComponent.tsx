import * as React from 'react';
import { Image, Card, Button, Row, Col } from 'react-bootstrap';
import CardModel from '../model/card';
const noImg = '../assets/noImg.jpg';

interface OwnProps {
    card: CardModel;
}

export interface OwnState {
    goldImg: boolean
}
export class CardComponent extends React.PureComponent<OwnProps, OwnState> {
    constructor(props: OwnProps){
        super(props)
        this.state = {
            goldImg: false
        }
    }

    switchImage = () => {
        this.setState({goldImg: !this.state.goldImg})
    }

    addToFavourites = () => {
        throw("Not Implemented yet.")
    }

    render() {
        return(
            <Card className="no-border">
                <Card.Img variant="top" src={(!this.state.goldImg ? this.props.card.img : this.props.card.imgGold) || noImg}/>
                <Card.Title>{this.props.card.name}</Card.Title>
                <Card.Text>
                {`Attack: ${this.props.card.attack || "NaN"}\n
                  Health: ${this.props.card.health || "NaN"}\n`}
                </Card.Text>
                <Row>
                    <Col>
                        <Button id="switchImg" variant={!this.props.card.imgGold ? "danger" : "primary"} onClick={this.switchImage} disabled={this.props.card.img ? false : true}>Change image</Button>
                    </Col>
                    <Col>
                        <Button id="favBtn" onClick={this.addToFavourites}>Add to Favourites</Button>
                    </Col>
                </Row>
            </Card>
        );
    }
}