import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Modal, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native';

export default class ResultScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pickerDisplayed: false,
            checked: 0,
            filters: ['Default', 'Name A-Z', 'Name Z-A', 'Price ASC', 'Price DESC'],
            isLoading: true,
            data: [],
            totalCount: 0,
            totalPageCount: 0,
            page: 1,
            filter: '',
            refreshing: false
        }
        this.togglePicker = this.togglePicker.bind(this)
        this.togglePicker2 = this.togglePicker2.bind(this)
    }

    componentDidMount() {
        this.fetchResult()
    }

    fetchResult = () => {
        let { page, filter } = this.state;
        let courseType = this.props.navigation.state.params.courseType;
        let searchText = this.props.navigation.state.params.itemName
        let url = 'https://demomobile.docebosaas.com/learn/v1/catalog' + courseType + searchText + '&page=' + page + filter;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: [...this.state.data, ...responseJson.data.items],
                    isLoading: false,
                    refreshing: false,
                    totalCount: responseJson.data.total_count,
                    totalPageCount: responseJson.data.total_page_count
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        },
            () => {
                this.fetchResult()
            }
        )
    }

    togglePicker() {
        this.setState({
            pickerDisplayed: !this.state.pickerDisplayed
        })
    }

    togglePicker2(index) {
        this.togglePicker();
        this.setState({ checked: index })

        if (index == 0) { this.setState({ filter: '', page: 1, data: [] }, () => this.fetchResult()); }
        else if (index == 1) { this.setState({ filter: '&sort_dir=asc&sort_attr=item_name', page: 1, data: [] }, () => this.fetchResult()); }
        else if (index == 2) { this.setState({ filter: '&sort_dir=desc&sort_attr=item_name', page: 1, data: [] }, () => this.fetchResult()); }
        else if (index == 3) { this.setState({ filter: '&sort_dir=asc&sort_attr=item_price', page: 1, data: [] }, () => this.fetchResult()); }
        else if (index == 4) { this.setState({ filter: '&sort_dir=desc&sort_attr=item_price', page: 1, data: [] }, () => this.fetchResult()); }
    }

    renderItem = ({ item }) => {
        const regex = /(<([^>]+)>)/ig;
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
                {item.item_thumbnail
                    ?
                    <Image style={{ width: 100, height: 100, margin: 5, borderColor: 'black', borderRadius: 10 }}
                        source={{ uri: 'https:' + item.item_thumbnail }} />
                    :
                    <Image style={{ width: 100, height: 100, margin: 5, borderColor: 'black', borderRadius: 10 }}
                        source={require('../utils/noimage.png')} />
                }
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: this.props.navigation.state.params.darkMode ? 'white' : 'black' }}>
                        {item.item_name}
                    </Text>
                    <Text style={{ color: this.props.navigation.state.params.darkMode ? 'white' : 'black' }}>
                        {item.course_type} | {item.item_price}
                    </Text>
                    <Text style={{ color: this.props.navigation.state.params.darkMode ? 'white' : 'black' }}>
                        {item.item_description.replace(regex, '')}
                    </Text>
                </View>
            </View>
        )
    }

    renderSeparator = () => {
        return (
            <View
                style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
            </View>
        )
    }

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'Results';
        return {
            headerTitle,
        }
    }

    handleLoadMoreData = () => {
        if (this.state.totalPageCount > this.state.page) {
            this.setState({
                page: this.state.page + 1
            },
                () => this.fetchResult()
            )
        }
    }

    render() {
        return (
            this.state.isLoading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size='large' color='#330066' animating /></View>
                :
                <View style={[styles.container, { backgroundColor: this.props.navigation.state.params.darkMode ? '#222831' : '#bae8e8' }]}>
                    <View style={styles.container}>
                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.text, { color: this.props.navigation.state.params.darkMode ? 'white' : 'black' }]}> {this.state.totalCount} Items</Text>
                            <TouchableOpacity onPress={() => this.togglePicker()}>
                                <Text style={[styles.text, { color: this.props.navigation.state.params.darkMode ? 'white' : 'black' }]}>{this.state.filters[this.state.checked]} Filter</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={this.state.data}
                            initialNumToRender={10}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.renderSeparator}
                            onEndReached={this.handleLoadMoreData}
                            onEndReachedThreshold={0.7}
                            extraData={this.state}
                            key={this.state.filter}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                        />

                        <Modal visible={this.state.pickerDisplayed} animationType={'slide'} transparent={true}>
                            <View style={{
                                margin: 0, padding: 15, bottom: 0, left: 0, right: 0, position: 'absolute', backgroundColor: this.props.navigation.state.params.darkMode ? 'black' : '#00adb5'
                            }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={[styles.text, { color: this.props.navigation.state.params.darkMode ? 'white' : 'black' }]}>Filters:</Text>
                                    <TouchableHighlight onPress={() => this.togglePicker()}>
                                        <Text style={[styles.text, { color: this.props.navigation.state.params.darkMode ? 'white' : 'black' }]}>Dismiss</Text>
                                    </TouchableHighlight>
                                </View>
                                {this.state.filters.map((filters, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <View>
                                                {this.state.checked == index ?
                                                    <TouchableOpacity style={styles.btn} key={index}>
                                                        <Image style={styles.img} source={require('../utils/radiobutton-checked.png')} />
                                                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: this.props.navigation.state.params.darkMode ? 'white' : 'black' }}>{filters}</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity onPress={() => { this.togglePicker2(index) }} style={styles.btn} key={index}>
                                                        <Image style={styles.img} source={require('../utils/radiobutton-unchecked.png')} />
                                                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: this.props.navigation.state.params.darkMode ? 'white' : 'black' }}>{filters}</Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </React.Fragment>
                                    )
                                })}
                            </View>
                        </Modal>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        height: 20,
        width: 20,
        margin: 10
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20
    }
})