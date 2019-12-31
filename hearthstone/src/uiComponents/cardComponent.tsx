import * as React from 'react';
import { Image, Card, Button, Row, Col, Modal, Container } from 'react-bootstrap';
import CardModel from '../model/card';
import noImg from '../assets/noImg.jpg';
import changeImg from '../assets/change-img-32x32.png';
import favoriteImg from '../assets/favorite.png';
import notFavorite from '../assets/not-favorite.png';
import manaIcon from '../assets/mana-icon.png';
import { urlIsFound } from '../utils/utils';
import { dispatchSaveCard } from '../redux/actions/cardActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/cardComponent.css';

export interface OwnState {
    goldImg: boolean
    isImgAvailable: boolean
    isOpen: boolean 
}

export interface OwnProps {
    card: CardModel;
}

interface ActionProps {
    dispatchSaveCard: typeof dispatchSaveCard;
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({dispatchSaveCard}, dispatch)
}

const centeredDetailProperty = {offset: 4}

type Props = ActionProps & OwnProps;
export class CardComponent extends React.PureComponent<Props, OwnState> {
    private _isMounted = false;

    constructor(props: Props){
        super(props)
        this.state = {
            goldImg: false,
            isImgAvailable: true,
            isOpen: false
        }
    }

    switchImage = () => {
        this.setState({goldImg: !this.state.goldImg})
    }

    addToFavourites = () => {
        const card = Object.assign({}, this.props.card, {
            favourite: !this.props.card.favourite
        })
        this.props.dispatchSaveCard(card)
    }

    cardDetail = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    componentDidMount = () => {
        this._isMounted = true;
        urlIsFound(this.props.card.img!)
        .then((resp) => {
            if(this._isMounted){
                if(resp){
                    this.setState({isImgAvailable: true});
                } else {
                    this.setState({isImgAvailable: false});
                }
            }
        });
    }

    componentWillUnmount = () => {
        this._isMounted = false
    }

    renderCardPreview = () => {
        return (
                <Card className="no-border text-center">
                <Card.Img variant="top" src={
                    (this.state.isImgAvailable) ? 
                        ((this.props.card.img) ? 
                            (this.state.goldImg ? 
                                this.props.card.imgGold 
                            : this.props.card.img) 
                        : noImg) 
                    : noImg
                    } onClick={this.cardDetail}/>
                <Row>
                    <Col>
                        <Button id="switchImg" 
                            className="no-borders" 
                            onClick={this.switchImage} 
                            disabled={this.props.card.imgGold ? false : true}>
                            <Image src={changeImg}/>
                        </Button>
                    </Col>
                    <Col>
                        <Button id="favBtn" 
                        onClick={this.addToFavourites}><Image src={this.props.card.favourite ? favoriteImg : notFavorite}/></Button>
                    </Col>
                </Row>
            </Card>
        )
    }

    renderCardDetail = () => {
        return (
            <Container className="cardDetailContainer">
                <Row style={{height: "auto"}}>
                    <Col>
                        <Image src={
                        (this.state.isImgAvailable) ? 
                            ((this.props.card.img) ? 
                                (this.state.goldImg ? 
                                    this.props.card.imgGold 
                                : this.props.card.img) 
                            : noImg) 
                        : noImg
                        } height="90%" width="90%"/>
                    </Col>
                    <Col className="cardDetail-font">
                        <Col>
                            {this.props.card.name}
                        </Col>
                        <Row>
                            <Col>
                                Card set: {this.props.card.cardSet}
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                Rarity: {this.props.card.rarity} 
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                Type: {this.props.card.type} 
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                Player class: {this.props.card.playerClass} 
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                Cost: {this.props.card.cost} <Image src={manaIcon}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>{ this.props.card.attack ? `Attack: ${this.props.card.attack}\n` : null}</Col>
                            <Col>{ this.props.card.health ? `Health: ${this.props.card.health}\n`: null}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button id="switchImg" 
                            className="no-borders" 
                            onClick={this.switchImage} 
                            disabled={this.props.card.imgGold ? false : true}>
                            <Image src={changeImg}/>
                        </Button>
                    </Col>
                    <Col>
                        <Button id="favBtn" 
                            onClick={this.addToFavourites}>
                                <Image src={this.props.card.favourite ? favoriteImg : notFavorite}/>
                        </Button>
                    </Col>
                </Row>
                </Container>
        )
    }

    render() {
        return(
            <>
                <Modal show={this.state.isOpen} onHide={this.cardDetail}> 
                    <Modal.Header className="modalHeader" closeButton>
                        <Modal.Title>Card detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modalBody">
                        {this.renderCardDetail()}
                    </Modal.Body>
                </Modal>
                {this.renderCardPreview()}
            </>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardComponent)