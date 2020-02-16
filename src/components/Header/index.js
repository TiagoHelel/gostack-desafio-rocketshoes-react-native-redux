import React from 'react'
import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import {Wrapper, Container, Logo, BasketContainer, ItemCount} from './styles'

function Header({navigation, cartSize}) {
    return (
        <Wrapper>
            <Container>
                <BasketContainer onPress={() => navigation.navigate('Main')}>
                    <Logo />
                </BasketContainer>
                <BasketContainer onPress={() => navigation.navigate('Cart')}>
                    <Icon name="shopping-basket" color="#FFF" size={24} />
                    <ItemCount>{cartSize || 0}</ItemCount>
                </BasketContainer>
            </Container>
        </Wrapper>
    )
}

export default connect(state => ({
    cartSize: state.cart.length,
}))(Header)
