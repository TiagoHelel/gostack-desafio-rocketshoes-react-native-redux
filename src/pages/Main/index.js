import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FlatList} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import * as CartActions from '../../store/modules/cart/actions'

import api from '../../services/api'
import {formatPrice} from '../../util/format'

import {
    Container,
    Product,
    ProductImage,
    ProductTitle,
    ProductPrice,
    AddButtom,
    ProductAmount,
    ProductAmountText,
    AddButtomText,
} from './styles'

class Main extends Component {
    state = {
        products: [],
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = async () => {
        const response = await api.get('/products')
        const data = response.data.map(product => ({
            ...product,
            priceFormatted: formatPrice(product.price),
        }))
        this.setState({products: data})
    }

    renderProduct = ({item}) => {
        const {amount} = this.props
        return (
            <Product key={item.id}>
                <ProductImage
                    source={{
                        uri: item.image,
                    }}
                />
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPrice>{item.priceFormatted}</ProductPrice>
                <AddButtom onPress={() => this.handleAddProduct(item.id)}>
                    <ProductAmount>
                        <Icon name="add-shopping-cart" color="#fff" size={20} />
                        <ProductAmountText>
                            {amount[item.id] || 0}
                        </ProductAmountText>
                    </ProductAmount>
                    <AddButtomText>ADICIONAR</AddButtomText>
                </AddButtom>
            </Product>
        )
    }

    handleAddProduct = id => {
        const {addToCartRequest} = this.props
        addToCartRequest(id)
    }

    render() {
        const {products} = this.state
        return (
            <Container>
                <FlatList
                    vertical
                    data={products}
                    extraData={this.props}
                    keyExtractor={item => String(item.id)}
                    renderItem={this.renderProduct}
                />
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    amount: state.cart.reduce((amount, product) => {
        amount[product.id] = product.amount
        return amount
    }, {}),
})

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
